-- Records each gift received, plus the pre-existing baseline so the campaign total starts where it already stands.
CREATE TABLE public.donations (
  id bigint generated always as identity primary key,
  source_ref text not null unique,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'usd',
  source text not null default 'stripe',
  label text,
  received_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

GRANT SELECT ON public.donations TO anon;
GRANT ALL ON public.donations TO service_role;

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read donation records"
  ON public.donations FOR SELECT
  TO anon, authenticated
  USING (true);

-- Running total in cents, readable by the public site.
CREATE OR REPLACE FUNCTION public.campaign_total_cents()
RETURNS bigint
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(sum(amount_cents), 0)::bigint from public.donations;
$$;

GRANT EXECUTE ON FUNCTION public.campaign_total_cents() TO anon, authenticated;

-- Baseline: gifts already received before automated tracking began.
INSERT INTO public.donations (source_ref, amount_cents, currency, source, label)
VALUES ('manual-baseline-20261112', 879700, 'usd', 'manual', 'Gifts received before automated tracking');