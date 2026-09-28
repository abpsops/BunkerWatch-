# Bunker Watch

Bunker Watch is a bunker fuel reconciliation and analytics tool. It ingests three
report types — **Enquiry Data** (requested demand), **FLOW/GPS reports**
(your own supplied volumes), and **STS Bunkering Tracking reports**
(barge-level operations, used to detect competitor-served vessels) — matches
them by vessel name and quantity, and produces an executive analytics
dashboard, a filterable reconciliation table, competitor market-share
breakdowns, and period-over-period trend charts.

Everything runs client-side: reports are parsed in the browser (Excel/CSV
via [`xlsx`](https://www.npmjs.com/package/xlsx)), reconciled locally, and
never leave the machine. There is no backend and no API key required.

## Features

- Upload or drag-and-drop `.xlsx`/`.csv` reports for all three report types,
  with auto-detected column mapping and a manual mapping modal as a fallback
  when auto-detection can't confidently find the right columns
- Configurable barge -> competitor mapping (persisted to `localStorage`)
- Automated three-report reconciliation: every enquiry is classified as
  `GPS MATCHED`, `COMPETITOR MATCHED`, or `UNVERIFIED`
- An analytics dashboard (KPI badges, volume allocation donut, VLSFO/MGO
  fuel-grade breakdown, competitor ranking, delivery-variance, and a
  daily/weekly/monthly trend chart) exportable as a colored PDF, PNG,
  colorized Excel, or standalone HTML
- A sortable, filterable, multi-select reconciliation table
- Sample dataset built in, so you can explore the tool without uploading
  anything

## Run locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:3000`).

Other scripts:

```bash
npm run build      # production build to dist/
npm run preview    # preview the production build locally
npm run typecheck  # tsc --noEmit
```

## Project structure

```
src/
  App.tsx                    # top-level layout, view switcher, wiring
  hooks/
    useReportUploads.ts      # upload/parse pipeline shared by all 3 report types
    useCompetitorMappings.ts
    useToast.ts
  components/
    analytical-report/       # the executive dashboard, split by visual section
    ...                      # upload dropzones, tables, modals
  utils/
    parsers.ts               # Excel/CSV -> typed records, per report type
    normalizer.ts            # vessel-name / fuel-grade normalization
    reconciliationEngine.ts  # the 3-way matching + summary/competitor/period math
    exportUtils.ts           # PDF / PNG / colorized Excel / HTML export
  data/sampleData.ts         # built-in sample dataset
  types/reconciliation.ts    # shared domain types
```

The analytics dashboard (`src/components/analytical-report/`) is split into
one file per visual section (KPI badges, donut chart, fuel breakdown,
competitor ranking, delivery variance, period timeline, toolbar, strategic
takeaways). Each section owns its own local UI state (e.g. the donut chart's
hover state, the timeline's daily/weekly/monthly toggle); `index.tsx` owns
only the derived numbers that more than one section needs.

`ColumnMappingModal.tsx` and `MainReconciliationTable.tsx` are left as single
files intentionally — unlike the dashboard, their internal state (row
selection, sort/filter, live preview) is tightly interdependent, so splitting
them would mean threading a lot of shared state across files for little
benefit.

## Notes / possible next steps

- The production bundle is a single ~1.4 MB chunk (mostly `xlsx`, `jspdf`,
  and `html2canvas`). Lazy-loading the export utilities (`import()` on
  demand, only when a user clicks a download button) would shrink the
  initial load if that ever matters.
- No test suite yet. `reconciliationEngine.ts` and `parsers.ts` are the
  highest-value places to start, since they contain the actual matching and
  parsing logic.
