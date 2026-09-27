import React from 'react';
import { ReconciliationSummary } from '../types/reconciliation';
import { Ship, CheckCircle2, UserX, HelpCircle, ArrowRight, Fuel } from 'lucide-react';

interface SummaryCardsProps {
  summary: ReconciliationSummary;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const gpsQtyPct = summary.totalEnquiryQty > 0
    ? Math.round((summary.gpsMatchedQty / summary.totalEnquiryQty) * 100)
    : 0;
  const compQtyPct = summary.totalEnquiryQty > 0
    ? Math.round((summary.competitorMatchedQty / summary.totalEnquiryQty) * 100)
    : 0;
  const unverifiedQtyPct = summary.totalEnquiryQty > 0
    ? Math.round((summary.unverifiedQty / summary.totalEnquiryQty) * 100)
    : 0;

  return (
    <div className="space-y-4 mb-6">
      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. TOTAL ENQUIRIES */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Ship className="w-16 h-16 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                TOTAL ENQUIRIES
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                {summary.totalEnquiries} records
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {summary.totalEnquiryQty.toLocaleString()} <span className="text-sm font-semibold text-slate-400">MT</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Total Requested Quantity
              </div>
            </div>
          </div>

          {/* Separate VLSFO and MGO breakdown */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center space-x-1 text-blue-300">
              <span className="text-slate-400 font-sans font-medium">VLSFO:</span>
              <span className="font-bold">{summary.totalVlsfoQty.toLocaleString()} MT</span>
            </div>
            <div className="flex items-center space-x-1 text-cyan-300">
              <span className="text-slate-400 font-sans font-medium">MGO:</span>
              <span className="font-bold">{summary.totalMgoQty.toLocaleString()} MT</span>
            </div>
          </div>
        </div>

        {/* 2. GPS MATCHED */}
        <div className="bg-slate-900 border border-emerald-800/40 rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <CheckCircle2 className="w-16 h-16 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                GPS MATCHED
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                {summary.gpsMatchedCount} matched
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight">
                {summary.gpsMatchedQty.toLocaleString()} <span className="text-sm font-semibold text-emerald-500/80">MT</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5 flex items-center justify-between">
                <span>FLOW / GPS Nearest Match</span>
                <span className="font-mono text-emerald-300 font-semibold">{gpsQtyPct}% of Total</span>
              </div>
            </div>
          </div>

          {/* Separate VLSFO and MGO breakdown */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center space-x-1 text-emerald-300">
              <span className="text-slate-400 font-sans font-medium">VLSFO:</span>
              <span className="font-bold">{summary.gpsMatchedVlsfoQty.toLocaleString()} MT</span>
            </div>
            <div className="flex items-center space-x-1 text-cyan-300">
              <span className="text-slate-400 font-sans font-medium">MGO:</span>
              <span className="font-bold">{summary.gpsMatchedMgoQty.toLocaleString()} MT</span>
            </div>
          </div>
        </div>

        {/* 3. COMPETITOR MATCHED */}
        <div className="bg-slate-900 border border-amber-800/40 rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <UserX className="w-16 h-16 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                COMPETITOR MATCHED
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {summary.competitorMatchedCount} matched
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight">
                {summary.competitorMatchedQty.toLocaleString()} <span className="text-sm font-semibold text-amber-500/80">MT</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5 flex items-center justify-between">
                <span>STS Bunkering Verified</span>
                <span className="font-mono text-amber-300 font-semibold">{compQtyPct}% of Total</span>
              </div>
            </div>
          </div>

          {/* Separate VLSFO and MGO breakdown */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center space-x-1 text-amber-300">
              <span className="text-slate-400 font-sans font-medium">VLSFO:</span>
              <span className="font-bold">{summary.competitorMatchedVlsfoQty.toLocaleString()} MT</span>
            </div>
            <div className="flex items-center space-x-1 text-cyan-300">
              <span className="text-slate-400 font-sans font-medium">MGO:</span>
              <span className="font-bold">{summary.competitorMatchedMgoQty.toLocaleString()} MT</span>
            </div>
          </div>
        </div>

        {/* 4. UNVERIFIED */}
        <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <HelpCircle className="w-16 h-16 text-slate-400" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                UNVERIFIED
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-700/40 text-slate-300 border border-slate-600/40">
                {summary.unverifiedCount} unverified
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-200 tracking-tight">
                {summary.unverifiedQty.toLocaleString()} <span className="text-sm font-semibold text-slate-400">MT</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5 flex items-center justify-between">
                <span>No Confirmed Supply Match</span>
                <span className="font-mono text-slate-300 font-semibold">{unverifiedQtyPct}% of Total</span>
              </div>
            </div>
          </div>

          {/* Separate VLSFO and MGO breakdown */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center space-x-1 text-slate-300">
              <span className="text-slate-400 font-sans font-medium">VLSFO:</span>
              <span className="font-bold">{summary.unverifiedVlsfoQty.toLocaleString()} MT</span>
            </div>
            <div className="flex items-center space-x-1 text-cyan-300">
              <span className="text-slate-400 font-sans font-medium">MGO:</span>
              <span className="font-bold">{summary.unverifiedMgoQty.toLocaleString()} MT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fuel Specification Breakdown Strip */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <Fuel className="w-4 h-4 text-blue-400" />
          <span className="font-bold text-white uppercase text-[11px] tracking-wide">
            Enquiry Fuel Totals (Separate Specifications):
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <div className="px-2.5 py-1 rounded bg-blue-950/60 border border-blue-800/50 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-slate-300 font-sans font-medium">Total VLSFO:</span>
            <span className="font-bold text-white">{summary.totalVlsfoQty.toLocaleString()} MT</span>
          </div>

          <div className="px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/50 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-slate-300 font-sans font-medium">Total LSMGO / MGO:</span>
            <span className="font-bold text-white">{summary.totalMgoQty.toLocaleString()} MT</span>
          </div>

          {summary.totalHsfoQty > 0 && (
            <div className="px-2.5 py-1 rounded bg-purple-950/60 border border-purple-800/50 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-slate-300 font-sans font-medium">Total HSFO:</span>
              <span className="font-bold text-white">{summary.totalHsfoQty.toLocaleString()} MT</span>
            </div>
          )}

          <div className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 flex items-center space-x-1.5">
            <span className="text-slate-400 font-sans font-medium">Grand Total:</span>
            <span className="font-bold text-emerald-400">{summary.totalEnquiryQty.toLocaleString()} MT</span>
          </div>
        </div>
      </div>

      {/* Reconciliation Equation Strip */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-lg px-4 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
        <div className="flex items-center space-x-2 font-medium">
          <span className="text-slate-400">Reconciliation Flow:</span>
          <span className="text-white font-bold">{summary.totalEnquiryQty.toLocaleString()} MT</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 inline" />
          <span className="text-emerald-400 font-semibold">{summary.gpsMatchedQty.toLocaleString()} MT (GPS)</span>
          <span>+</span>
          <span className="text-amber-400 font-semibold">{summary.competitorMatchedQty.toLocaleString()} MT (Competitor)</span>
          <span>+</span>
          <span className="text-slate-300 font-semibold">{summary.unverifiedQty.toLocaleString()} MT (Unverified)</span>
        </div>

        {/* Visual Progress Ratio Bar */}
        <div className="w-full sm:w-64 h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full transition-all"
            style={{ width: `${gpsQtyPct}%` }}
            title={`GPS: ${gpsQtyPct}%`}
          />
          <div
            className="bg-amber-500 h-full transition-all"
            style={{ width: `${compQtyPct}%` }}
            title={`Competitor: ${compQtyPct}%`}
          />
          <div
            className="bg-slate-600 h-full transition-all"
            style={{ width: `${unverifiedQtyPct}%` }}
            title={`Unverified: ${unverifiedQtyPct}%`}
          />
        </div>
      </div>
    </div>
  );
};
