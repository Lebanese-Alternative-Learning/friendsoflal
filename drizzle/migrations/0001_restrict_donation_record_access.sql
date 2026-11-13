DROP POLICY IF EXISTS "Anyone can read donation records" ON public.donations;
REVOKE ALL PRIVILEGES ON TABLE public.donations FROM anon, authenticated;
GRANT ALL ON TABLE public.donations TO service_role;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.donations IS 'Private donation records. Public campaign totals are exposed only through campaign_total_cents().';