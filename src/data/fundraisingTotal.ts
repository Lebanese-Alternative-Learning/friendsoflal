import { supabase } from "@/integrations/supabase/client";
import { educationGuardian } from "@/data/educationGuardian";

/**
 * Live campaign total in dollars, read from the backend.
 * Returns null when the backend cannot be reached, so callers can fall back
 * to the baseline figure held in the campaign data module.
 */
export async function fetchCampaignTotalDollars(): Promise<number | null> {
  const { data, error } = await supabase.rpc("campaign_total_cents");
  if (error) return null;

  const cents = Number(data);
  if (!Number.isFinite(cents)) return null;

  return cents / 100;
}
