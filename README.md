# Yield Tracker

A simple yield-tracking app for commercial cannabis cultivation. The goal is to bring yield records, strain information, and cultivation data points together so teams can follow crop progress and compare results over time.

## Goals

- Pull yield data from a cultivation or reporting source once an integration is configured.
- Associate each yield record with its strain and cultivation run.
- Record useful data points throughout a run and review them alongside the final yield.
- Make it easier to compare progress and outcomes across strains and runs.

## Tracking model

A useful record can include:

| Record | Example details |
| --- | --- |
| Strain | Strain name and, if available, an internal identifier |
| Cultivation run | Run or batch identifier, facility or room, and relevant dates |
| Data point | Measurement name, value, unit, and date recorded |
| Yield | Harvest amount, unit, harvest date, and source record |

Keep units and measurement dates with each value so that data from different runs can be interpreted and compared consistently. The exact fields should be adapted to the cultivation team's existing records and data source.

## Intended workflow

1. Connect or import a supported yield-data source.
2. Match incoming records to strains and cultivation runs.
3. Add or import dated data points as a run progresses.
4. Review yield and data-point history by strain or run.

## Project status

This repository is currently a starting point: the application has not been implemented, and no data source, interface, or storage format has been selected. The integration and setup instructions will be added once those choices are made.

## Responsible use

Use the tracker only for lawful, authorized cultivation operations. Follow applicable licensing, recordkeeping, privacy, and data-retention requirements. Confirm imported measurements and units against their source before relying on comparisons or reports.
