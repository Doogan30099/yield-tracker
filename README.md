# Yield Tracker

A small Python command-line utility for summarizing plant counts from a harvest CSV. The current report groups plant counts by strain and prints the overall total.

## Requirements

- Python 3
- No third-party packages

## Usage

Run the script from the project directory so it can find `harvests.csv`:

```powershell
python Report.py
```

The script prints the total plant count followed by the count for each strain. If a row has a blank `plants` value, it prints a message identifying the strain and skips that row. Strain counts are combined across all matching rows, including rows from different cycles.

## Input file

The report reads `harvests.csv` from the current working directory. It expects a CSV with a header row containing a `strain` column and a `plants` column. The repository's sample file also includes:

| Column | Description |
| --- | --- |
| `harvest_date` | Harvest date |
| `trim_start_date` | Trim start date |
| `cycle_number` | Cultivation cycle identifier |
| `strain` | Strain name used to group plant counts |
| `grade_a_grams` | Grade A yield in grams |
| `extraction_grams` | Extraction yield in grams |
| `plants` | Plant count used in the report |
| `avg_potency_pct` | Average potency percentage |
| `grams_per_plant` | Yield in grams per plant |

Only `strain` and `plants` are currently used by the report. Leave `plants` blank when the count is not available; values in that column must otherwise be whole numbers.

## Current scope

This project currently reports plant counts only. It does not yet calculate yields, validate or transform the other CSV fields, or provide an interactive interface.
