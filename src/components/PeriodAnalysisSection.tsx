import React, { useState, useMemo } from 'react';
import { ReconciledRecord, PeriodSummary } from '../types/reconciliation';
import { calculatePeriodSummaries } from '../utils/reconciliationEngine';
import { Calendar, BarChart3 } from 'lucide-react';

interface PeriodAnalysisSectionProps {
  records: ReconciledRecord[];
}

export const PeriodAnalysisSection: React.FC<PeriodAnalysisSectionProps> = ({ records }) => {
  const [periodMode, setPeriodMode] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const summaries: PeriodSummary[] = useMemo(() => {
    return calculatePeriodSummaries(records, periodMode);
  }, [records, periodMode]);

  // Overall sums across all periods
  const totalEnquiryAll = summaries.reduce((acc, s) => acc + s.totalEnquiryQty, 0);
  const totalGpsAll = summaries.reduce((acc, s) => acc + s.gpsMatchedQty, 0);
  const totalCompAll = summaries.reduce((acc, s) => acc + s.competitorMatchedQty, 0);
  const totalUnverifiedAll = summaries.reduce((acc, s) => acc + s.unverifiedQty, 0);

  const totalEnquiryCountAll = summaries.reduce((acc, s) => acc + s.enquiryCount, 0);
  const totalGpsCountAll = summaries.reduce((acc, s) => acc + s.gpsCount, 0);
  const totalCompCountAll = summaries.reduce((acc, s) => acc + s.competitorCount, 0);
  const totalUnverifiedCountAll = summaries.reduce((acc, s) => acc + s.unverifiedCount, 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm overflow-hidden mb-6">
      {/* Header and Toggle */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wide">
              Period Analysis
            </h2>
            <p className="text-xs text-slate-400">
              Aggregated by Enquiry Date across calendar periods
            </p>
          </div>
        </div>

        {/* Daily | Weekly | Monthly switcher */}
        <div className="inline-flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setPeriodMode('daily')}
            className={`px-3 py-1.5 rounded-md transition ${
              periodMode === 'daily'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setPeriodMode('weekly')}
            className={`px-3 py-1.5 rounded-md transition ${
              periodMode === 'weekly'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Weekly (Calendar)
          </button>
          <button
            onClick={() => setPeriodMode('monthly')}
            className={`px-3 py-1.5 rounded-md transition ${
              periodMode === 'monthly'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly (Calendar)
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-6">
        {/* Table 1: Quantity Breakdown */}
        <div>
          <div className="flex items-center space-x-2 mb-2.5">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              1. Period Quantity Breakdown (MT)
            </h3>
          </div>
          <div className="overflow-x-auto border border-slate-800 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-2.5 px-4">Period</th>
                  <th className="py-2.5 px-4 text-right">Total Enquiry Qty (MT)</th>
                  <th className="py-2.5 px-4 text-right text-emerald-400">GPS Matched (MT)</th>
                  <th className="py-2.5 px-4 text-right text-amber-400">Competitor Matched (MT)</th>
                  <th className="py-2.5 px-4 text-right text-slate-400">Unverified (MT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                {summaries.map((s) => (
                  <tr key={s.periodKey} className="hover:bg-slate-800/40 transition">
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-200">
                      {s.periodLabel}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-white">
                      {s.totalEnquiryQty.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-emerald-400">
                      {s.gpsMatchedQty > 0 ? s.gpsMatchedQty.toLocaleString() : '—'}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-amber-400">
                      {s.competitorMatchedQty > 0 ? s.competitorMatchedQty.toLocaleString() : '—'}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-400">
                      {s.unverifiedQty > 0 ? s.unverifiedQty.toLocaleString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-950/80 border-t border-slate-700/80 font-bold text-xs">
                <tr>
                  <td className="py-3 px-4 text-white uppercase font-bold tracking-wider">
                    Total
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-white">
                    {totalEnquiryAll.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-emerald-400">
                    {totalGpsAll.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-amber-400">
                    {totalCompAll.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-300">
                    {totalUnverifiedAll.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Table 2: Enquiry Count Breakdown */}
        <div>
          <div className="flex items-center space-x-2 mb-2.5">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              2. Period Enquiry Count
            </h3>
          </div>
          <div className="overflow-x-auto border border-slate-800 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-2.5 px-4">Period</th>
                  <th className="py-2.5 px-4 text-right">Enquiries</th>
                  <th className="py-2.5 px-4 text-right text-emerald-400">GPS Matched</th>
                  <th className="py-2.5 px-4 text-right text-amber-400">Competitor Matched</th>
                  <th className="py-2.5 px-4 text-right text-slate-400">Unverified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                {summaries.map((s) => (
                  <tr key={s.periodKey} className="hover:bg-slate-800/40 transition">
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-200">
                      {s.periodLabel}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-white">
                      {s.enquiryCount}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-emerald-400">
                      {s.gpsCount > 0 ? s.gpsCount : '0'}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-amber-400">
                      {s.competitorCount > 0 ? s.competitorCount : '0'}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-400">
                      {s.unverifiedCount > 0 ? s.unverifiedCount : '0'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-950/80 border-t border-slate-700/80 font-bold text-xs">
                <tr>
                  <td className="py-3 px-4 text-white uppercase font-bold tracking-wider">
                    Total
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-white">
                    {totalEnquiryCountAll}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-emerald-400">
                    {totalGpsCountAll}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-amber-400">
                    {totalCompCountAll}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-300">
                    {totalUnverifiedCountAll}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
