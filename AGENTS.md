# Project conventions

- Compose homepage sections as independent components in `src/components/sections`; keep campaign facts in a shared data module so displayed amounts remain testable.
- Generate gift-picker checkout URLs through the shared donation helper using Stripe's `prefilled_amount` in minor units; this preserves the selected amount across checkout (verified against the live payment link).
- Keep donation records service-role-only and expose only the aggregate through `campaign_total_cents()`; visitors need fundraising progress, not individual payment records.