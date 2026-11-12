// Stripe webhook: records each gift the moment Stripe confirms it, so the
// campaign total on the site updates on its own instead of being typed by hand.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? ''
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ''
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

// Reject replays older than five minutes, the same window Stripe itself uses.
const SIGNATURE_TOLERANCE_SECONDS = 300

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function constantTimeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

// Stripe signs each delivery as HMAC-SHA256("<timestamp>.<raw body>").
async function isValidSignature(payload: string, header: string, secret: string): Promise<boolean> {
  let timestamp = ''
  const signatures: string[] = []

  for (const part of header.split(',')) {
    const trimmed = part.trim()
    if (trimmed.startsWith('t=')) timestamp = trimmed.slice(2)
    else if (trimmed.startsWith('v1=')) signatures.push(trimmed.slice(3))
  }

  if (!timestamp || signatures.length === 0) return false

  const age = Math.floor(Date.now() / 1000) - Number(timestamp)
  if (!Number.isFinite(age) || Math.abs(age) > SIGNATURE_TOLERANCE_SECONDS) return false

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const mac = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(`${timestamp}.${payload}`),
  )
  const expected = toHex(mac)

  return signatures.some((signature) => constantTimeEquals(signature, expected))
}

type StripeObject = {
  id?: unknown
  amount_received?: unknown
  amount_total?: unknown
  currency?: unknown
  payment_status?: unknown
  payment_intent?: unknown
}

type StripeEvent = {
  id?: string
  type?: string
  data?: { object?: StripeObject }
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null
}

function asPositiveCents(value: unknown): number | null {
  if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0) return null
  return value
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  if (!WEBHOOK_SECRET) return json({ error: 'Webhook secret is not configured' }, 500)
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return json({ error: 'Backend credentials are not available to this function' }, 500)
  }

  const payload = await req.text()
  const signature = req.headers.get('stripe-signature') ?? ''

  if (!(await isValidSignature(payload, signature, WEBHOOK_SECRET))) {
    return json({ error: 'Invalid signature' }, 400)
  }

  let event: StripeEvent
  try {
    event = JSON.parse(payload) as StripeEvent
  } catch {
    return json({ error: 'Payload is not valid JSON' }, 400)
  }

  const type = event.type ?? ''
  const object = event.data?.object ?? {}

  let sourceRef: string | null = null
  let amountCents: number | null = null
  let currency = 'usd'
  let label: string | null = null

  if (type === 'payment_intent.succeeded') {
    sourceRef = asString(object.id)
    amountCents = asPositiveCents(object.amount_received)
    currency = asString(object.currency) ?? 'usd'
    label = 'Gift via Stripe'
  } else if (type === 'checkout.session.completed') {
    // Only count sessions Stripe reports as actually paid.
    if (object.payment_status !== 'paid') return json({ received: true, ignored: type })
    sourceRef = asString(object.payment_intent)
    amountCents = asPositiveCents(object.amount_total)
    currency = asString(object.currency) ?? 'usd'
    label = 'Gift via Stripe checkout'
  } else {
    // Anything else (refunds, disputes, test noise) is acknowledged and dropped.
    return json({ received: true, ignored: type })
  }

  if (!sourceRef || amountCents === null) {
    return json({ received: true, skipped: true, type })
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })

  const { error } = await admin
    .from('donations')
    .upsert(
      {
        source_ref: sourceRef,
        amount_cents: amountCents,
        currency,
        source: 'stripe',
        label,
      },
      { onConflict: 'source_ref', ignoreDuplicates: true },
    )

  if (error) {
    console.error('Recording donation failed:', error.message)
    return json({ error: 'Could not record the donation' }, 500)
  }

  return json({ received: true, recorded: sourceRef, amount_cents: amountCents })
})
