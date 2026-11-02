# Project conventions

- Compose homepage sections as independent components in `src/components/sections`; keep campaign facts in a shared data module so displayed amounts remain testable.
- Generate gift-picker checkout URLs through the shared donation helper using Stripe's `prefilled_amount` in minor units; this preserves the selected amount across checkout (verified against the live payment link).