import React, { useState } from 'react';
import { ReconciledRecord, ReconciliationSummary } from '../types/reconciliation';
import { calculateCompetitorBreakdown, calculatePeriodSummaries } from '../utils/reconciliationEngine';
import { PieChart, BarChart2, TrendingUp, Layers } from 'lucide-react';

interface SimpleChartsProps {
  records: ReconciledRecord[];
  summary: ReconciliationSummary;
}

export const SimpleCharts: React.FC<SimpleChartsProps> = ({ records, summary }) => {
  const [periodTrendMode, setPeriodTrendMode] = useState<'weekly' | 'monthly'>('weekly');

  const competitorBreakdown = calculateCompetitorBreakdown(records);
  const periodSummaries = calculatePeriodSummaries(records, periodTrendMode);

  // Percentages for Chart 1
  const totalQty = summary.totalEnquiryQty || 1;
  const gpsQtyPct = Math.round((summary.gpsMatchedQty / totalQty) * 100);
  const compQtyPct = Math.round((summary.competitorMatchedQty / totalQty) * 100);
  const unvQtyPct = Math.max(0, 100 - gpsQtyPct - compQtyPct);

  // Enquiry Count for Chart 4
  const totalCount = summary.totalEnquiries || 1;
  const gpsCountPct = Math.round((summary.gpsMatchedCount / totalCount) * 100);
  const compCountPct = Math.round((summary.competitorMatchedCount / totalCount) * 100);
  const unvCountPct = Math.max(0, 100 - gpsCountPct - compCountPct);

  // SVG Donut calculation for Chart 1
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const gpsOffset = 0;
  const gpsStroke = (summary.gpsMatchedQty / totalQty) * circumference;

  const compOffset = -gpsStroke;
  const compStroke = (summary.competitorMatchedQty / totalQty) * circumference;

  const unvOffset = -(gpsStroke + compStroke);
  const unvStroke = (summary.unverifiedQty / totalQty) * circumference;

  // Max value for Competitor Bar Chart
  const maxCompQty = competitorBreakdown.length > 0
    ? Math.max(...competitorBreakdown.map(c => c.totalEnquiryQty), 1)
    : 1;

  // Max value for Period Trend Bar Chart
  const maxPeriodQty = periodSummaries.length > 0
    ? Math.max(...periodSummaries.map(p => p.totalEnquiryQty), 1)
    : 1;

  return (
    <div className="space-y-6 mb-6">
      <div className="flex items-center space-x-2">
        <Layers className="w-4 h-4 text-blue-400" />
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          Reconciliation Analytics &amp; Visualizations
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* CHART 1: Total Enquiry Quantity Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-800">
            <PieChart className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Chart 1: Total Enquiry Quantity Distribution
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
            {/* SVG Donut */}
            <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                {/* Background Ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-slate-800"
                  strokeWidth="16"
                  fill="transparent"
                />
                {/* GPS Matched Slice */}
                {summary.gpsMatchedQty > 0 && (
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="#10b981"
                    strokeWidth="16"
                    fill="transparent"
                    strokeDasharray={`${gpsStroke} ${circumference}`}
                    strokeDashoffset={gpsOffset}
                    strokeLinecap="round"
                  />
                )}
                {/* Competitor Matched Slice */}
                {summary.competitorMatchedQty > 0 && (
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="#f59e0b"
                    strokeWidth="16"
                    fill="transparent"
                    strokeDasharray={`${compStroke} ${circumference}`}
                    strokeDashoffset={compOffset}
                    strokeLinecap="round"
                  />
                )}
                {/* Unverified Slice */}
                {summary.unverifiedQty > 0 && (
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="#64748b"
                    strokeWidth="16"
                    fill="transparent"
                    strokeDasharray={`${unvStroke} ${circumference}`}
                    strokeDashoffset={unvOffset}
                    strokeLinecap="round"
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs text-slate-400 font-medium">Total Qty</span>
                <span className="text-sm font-bold text-white font-mono">
                  {summary.totalEnquiryQty.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400">MT</span>
              </div>
            </div>

            {/* Legend & Breakdown */}
            <div className="w-full space-y-3 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-emerald-900/30 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                  <div>
                    <div className="font-bold text-emerald-400">GPS Matched</div>
                    <div className="text-[10px] text-slate-400">FLOW report confirmed</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white font-mono">{summary.gpsMatchedQty.toLocaleString()} MT</div>
                  <div className="text-[11px] text-emerald-400 font-mono font-semibold">{gpsQtyPct}%</div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-amber-900/30 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-sm bg-amber-500" />
                  <div>
                    <div className="font-bold text-amber-400">Competitor Matched</div>
                    <div className="text-[10px] text-slate-400">STS Bunkering confirmed</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white font-mono">{summary.competitorMatchedQty.toLocaleString()} MT</div>
                  <div className="text-[11px] text-amber-400 font-mono font-semibold">{compQtyPct}%</div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-sm bg-slate-500" />
                  <div>
                    <div className="font-bold text-slate-300">Unverified</div>
                    <div className="text-[10px] text-slate-400">No confirmed match</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white font-mono">{summary.unverifiedQty.toLocaleString()} MT</div>
                  <div className="text-[11px] text-slate-400 font-mono font-semibold">{unvQtyPct}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CHART 2: Enquiry Quantity by Competitor */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <BarChart2 className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Chart 2: Enquiry Quantity by Competitor
              </h3>
            </div>
            <span className="text-[10px] text-slate-400">
              {competitorBreakdown.length} Competitors Matched
            </span>
          </div>

          {competitorBreakdown.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 italic">
              No competitor matched enquiries recorded in this dataset.
            </div>
          ) : (
            <div className="space-y-3.5 py-1">
              {competitorBreakdown.map((comp) => {
                const barWidth = Math.max(6, Math.round((comp.totalEnquiryQty / maxCompQty) * 100));
                return (
                  <div key={comp.competitor} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200 truncate max-w-[200px]" title={comp.competitor}>
                        {comp.competitor}
                      </span>
                      <span className="font-mono text-amber-300 font-bold text-xs">
                        {comp.totalEnquiryQty.toLocaleString()} MT
                        <span className="text-slate-500 font-normal ml-1">({comp.vesselCount} vessels)</span>
                      </span>
                    </div>
                    <div className="h-4 bg-slate-950 rounded overflow-hidden flex items-center p-0.5 border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-sm transition-all"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CHART 3: Weekly / Monthly Quantity */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Chart 3: {periodTrendMode === 'weekly' ? 'Weekly' : 'Monthly'} Quantity Breakdown
              </h3>
            </div>
            <div className="inline-flex bg-slate-950 p-0.5 rounded border border-slate-800 text-[10px] font-semibold">
              <button
                onClick={() => setPeriodTrendMode('weekly')}
                className={`px-2 py-0.5 rounded ${
                  periodTrendMode === 'weekly' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setPeriodTrendMode('monthly')}
                className={`px-2 py-0.5 rounded ${
                  periodTrendMode === 'monthly' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="space-y-4 py-1">
            {periodSummaries.map((p) => {
              const gpsBar = Math.round((p.gpsMatchedQty / maxPeriodQty) * 100);
              const compBar = Math.round((p.competitorMatchedQty / maxPeriodQty) * 100);
              const unvBar = Math.round((p.unverifiedQty / maxPeriodQty) * 100);

              return (
                <div key={p.periodKey} className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-white font-mono">{p.periodLabel}</span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      Total: <span className="font-bold text-white">{p.totalEnquiryQty.toLocaleString()} MT</span>
                    </span>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    {/* GPS Bar */}
                    <div className="flex items-center space-x-2">
                      <span className="w-16 text-slate-400 text-[10px] shrink-0">GPS:</span>
                      <div className="flex-1 bg-slate-900 rounded h-2.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded transition-all" style={{ width: `${gpsBar}%` }} />
                      </div>
                      <span className="w-20 text-right font-mono text-emerald-400 shrink-0 text-[10px]">
                        {p.gpsMatchedQty > 0 ? `${p.gpsMatchedQty.toLocaleString()} MT` : '—'}
                      </span>
                    </div>

                    {/* Competitor Bar */}
                    <div className="flex items-center space-x-2">
                      <span className="w-16 text-slate-400 text-[10px] shrink-0">Competitor:</span>
                      <div className="flex-1 bg-slate-900 rounded h-2.5 overflow-hidden">
                        <div className="bg-amber-500 h-full rounded transition-all" style={{ width: `${compBar}%` }} />
                      </div>
                      <span className="w-20 text-right font-mono text-amber-400 shrink-0 text-[10px]">
                        {p.competitorMatchedQty > 0 ? `${p.competitorMatchedQty.toLocaleString()} MT` : '—'}
                      </span>
                    </div>

                    {/* Unverified Bar */}
                    <div className="flex items-center space-x-2">
                      <span className="w-16 text-slate-400 text-[10px] shrink-0">Unverified:</span>
                      <div className="flex-1 bg-slate-900 rounded h-2.5 overflow-hidden">
                        <div className="bg-slate-600 h-full rounded transition-all" style={{ width: `${unvBar}%` }} />
                      </div>
                      <span className="w-20 text-right font-mono text-slate-300 shrink-0 text-[10px]">
                        {p.unverifiedQty > 0 ? `${p.unverifiedQty.toLocaleString()} MT` : '—'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CHART 4: Enquiry Count Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-800">
            <Layers className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Chart 4: Enquiry Count (GPS vs Competitor vs Unverified)
            </h3>
          </div>

          <div className="space-y-4 py-2">
            {/* Horizontal full width distribution strip */}
            <div className="h-6 bg-slate-950 rounded-lg overflow-hidden flex border border-slate-800">
              {summary.gpsMatchedCount > 0 && (
                <div
                  className="bg-emerald-500 h-full flex items-center justify-center text-[10px] text-white font-bold transition-all"
                  style={{ width: `${gpsCountPct}%` }}
                  title={`GPS Matched: ${summary.gpsMatchedCount} (${gpsCountPct}%)`}
                >
                  {gpsCountPct > 12 && `${summary.gpsMatchedCount} (${gpsCountPct}%)`}
                </div>
              )}
              {summary.competitorMatchedCount > 0 && (
                <div
                  className="bg-amber-500 h-full flex items-center justify-center text-[10px] text-slate-900 font-bold transition-all"
                  style={{ width: `${compCountPct}%` }}
                  title={`Competitor Matched: ${summary.competitorMatchedCount} (${compCountPct}%)`}
                >
                  {compCountPct > 12 && `${summary.competitorMatchedCount} (${compCountPct}%)`}
                </div>
              )}
              {summary.unverifiedCount > 0 && (
                <div
                  className="bg-slate-600 h-full flex items-center justify-center text-[10px] text-white font-bold transition-all"
                  style={{ width: `${unvCountPct}%` }}
                  title={`Unverified: ${summary.unverifiedCount} (${unvCountPct}%)`}
                >
                  {unvCountPct > 12 && `${summary.unverifiedCount} (${unvCountPct}%)`}
                </div>
              )}
            </div>

            {/* Individual count cards */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="bg-slate-950/70 p-3 rounded-lg border border-emerald-900/30">
                <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">GPS Matched</div>
                <div className="text-xl font-extrabold text-white font-mono mt-1">{summary.gpsMatchedCount}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{gpsCountPct}% of enquiries</div>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-lg border border-amber-900/30">
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Competitor</div>
                <div className="text-xl font-extrabold text-white font-mono mt-1">{summary.competitorMatchedCount}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{compCountPct}% of enquiries</div>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unverified</div>
                <div className="text-xl font-extrabold text-white font-mono mt-1">{summary.unverifiedCount}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{unvCountPct}% of enquiries</div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded border border-slate-800/80">
              <span className="font-semibold text-slate-300">Total Enquiry Vessels:</span> {summary.totalEnquiries} enquiries evaluated against Flow/GPS and STS Tracking reports.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
