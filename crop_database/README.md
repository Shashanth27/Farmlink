# Crop Knowledge Base — Field Reference

This document describes every field used in `crop_knowledge_base.json`. Each crop entry follows this schema. Fields are grouped by purpose to match the Intermediate Rule Layer in the MandiMitra architecture.


## Identification

**`crop_name`** : Display name of the crop shown in the UI and final advisory output.


## Temperature Fields

**`optimal_temp_range_c`** : `[min, max]` in Celsius. The ideal temperature band for healthy growth and quality. The rule layer compares the weather forecast against this range to judge whether conditions are favorable, marginal, or stressful.

**`critical_temp_max_c`** : The upper heat limit beyond which the crop suffers real physiological damage (blossom drop, bolting, fruit-set failure), not just suboptimal growth. Stricter than the top of `optimal_temp_range_c`.

**`critical_temp_min_c`** : The lower temperature limit where cold stress begins — growth stunting, blossom drop — but before irreversible cellular damage occurs.

**`chilling_injury_threshold_c`** : A distinct, more severe cold threshold than `critical_temp_min_c`. Marks the point of irreversible cellular damage (pitting, browning, failure to ripen, rapid decay). Only defined for crops where the source data documents this specific mechanism (tomato, green chilli, brinjal). `null` where not applicable (onion, potato). This field drives emergency-harvest style alerts.



## Sensitivity Flags

**`frost_sensitive`** : Boolean. Whether the crop is vulnerable to frost/near-freezing temperatures.

**`heat_sensitive`** : Boolean. Whether the crop is vulnerable to excess heat.

**`rain_sensitive`** : Boolean. Whether rainfall (independent of waterlogging) degrades quality or triggers disease.

**`waterlogging_sensitive`** : Boolean. Whether standing water / soil saturation is a distinct risk from rain itself (e.g., root hypoxia, bulb rot).

These flags let the rule layer quickly filter which risks are even relevant to a crop before running numeric threshold checks.

**`rain_risk_mm_threshold`** : Numeric rainfall cutoff (mm) used together with `rain_sensitive`/`waterlogging_sensitive`. Converts a vague "sensitive to rain" flag into an actual comparable number against the weather API's forecasted precipitation.

**`critical_growth_stage_dat`** : `[start, end]` in days-after-transplanting. Present only where a risk is dangerous during one specific developmental window rather than the whole growing season (e.g., onion waterlogging during bulb initiation). Prevents the system from treating off-season rain the same as rain during the vulnerable window.



## Storage & Perishability

**`storage_life_days`** : Maximum days the crop survives under optimal storage conditions. The primary input to the sell-vs-wait decision — short life pushes toward "sell now," long life allows "wait for a better price."

**`storage_temp_range_c`** : `[min, max]` in Celsius. The optimal cold-storage temperature band, separate from the growing-temperature range. Used to validate whether a farmer's storage setup is appropriate.

**`storage_temp_by_use_c`** : Object mapping end-use category (e.g., seed, table_fresh, processing) to its own optimal storage range. Present only for potato, where storage temperature requirements diverge sharply by intended use, and using the wrong one ruins that specific use case even if the crop looks fine.

**`perishability`** : Categorical tag (`low` / `medium` / `high`) derived from `storage_life_days`. A cheap, human-readable signal for prompt context so Gemma doesn't need to infer urgency from raw day counts.



## Harvest Timing

**`harvest_window_days`** : Number of days the crop remains harvestable at peak quality before over-maturity sets in (e.g., woody texture, splitting, bitterness). Prevents "wait" advice that runs past the safe harvest point.

**`field_lifecycle_days`** : `[min, max]`. Total days from planting/transplanting to first harvest. Contextual field — helps validate whether a crop is old enough to be considered for early or emergency harvest.



## Market Fields

**`price_volatility`** : Categorical (`low` / `medium` / `high`). Indicates how much weight the rule layer should give to short-term price movements. High-volatility crops need more cautious interpretation of the 7-day average price trend.

**`sell_or_wait_bias`** : Default heuristic (`sell_fast_if_perishable` / `can_wait_for_better_price`) used when no acute weather risk is active. This is a fallback, not an absolute rule — it should be overridden when a specific risk flag (chilling injury, waterlogging during a critical stage, etc.) fires.

**`grading_note`** : Summary of AGMARK/USDA-style grading rules — size cutoffs, defect tolerances, grade-to-grade price premiums. Not used in the sell/wait calculation directly; gives the LLM grounded context to explain quality/grade implications instead of inventing them.

**`advisory_note`** : Pre-written, human-reviewed explanation of the crop's key vulnerability mechanism in plain language. The most important field for hallucination control — Gemma draws on and rephrases/localizes this vetted text instead of reasoning about crop biology from scratch, which matters since incorrect advice here has real financial consequences for the farmer.


## Field Usage Summary

| Category | Fields | Used for |
|---|---|---|
| Core rule-layer logic (numeric comparisons) | `optimal_temp_range_c`, `critical_temp_max_c`, `critical_temp_min_c`, `chilling_injury_threshold_c`, `rain_risk_mm_threshold`, `critical_growth_stage_dat`, `storage_life_days` | Direct if/else comparisons against live weather and price data |
| Sensitivity filters | `frost_sensitive`, `heat_sensitive`, `rain_sensitive`, `waterlogging_sensitive` | Quick boolean gating before running numeric checks |
| Prompt context for Gemma | `perishability`, `price_volatility`, `sell_or_wait_bias`, `grading_note`, `advisory_note` | Structured facts and vetted narrative fed into the LLM prompt |
| Display / validation | `crop_name`, `storage_temp_range_c`, `storage_temp_by_use_c`, `harvest_window_days`, `field_lifecycle_days` | UI display and secondary sanity checks |
