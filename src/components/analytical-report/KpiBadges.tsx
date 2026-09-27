import React from 'react';
import { ReconciliationSummary } from '../../types/reconciliation';
import { CheckCircle2, Target, UserX, HelpCircle, Fuel } from 'lucide-react';

interface KpiBadgesProps {
  activeSummary: ReconciliationSummary;
  gpsWinRate: number;
  compLossRate: number;
  unvRate: number;
  totalGpsDeliveredMT: number;
  netGpsVarianceMT: number;
  deliveryAccuracyPct: number;
}

export const KpiBadges: React.FC<KpiBadgesProps> = ({
  activeSummary,
  gpsWinRate,
  compLossRate,
  unvRate,
  totalGpsDeliveredMT,
  netGpsVarianceMT,
  deliveryAccuracyPct
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
      {/* Total Demand Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>Total Demand</span>
          <Fuel className="w-3.5 h-3.5 text-blue-400" />
        </div>
        <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
          {activeSummary.totalEnquiryQty.toLocaleString()}{' '}
          <span className="text-xs text-slate-400 font-sans font-normal">MT</span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between font-mono">
          <span>{activeSummary.totalEnquiries} Enquiries</span>
          <span className="text-blue-400 font-bold">100% Volume</span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
          <div className="h-full bg-blue-500 w-full rounded-full" />
        </div>
      </div>

      {/* GPS Captured Card */}
      <div className="bg-slate-900 border border-emerald-900/50 rounded-xl p-4 shadow-sm relative overflow-hidden">
        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
          <span>GPS Captured (Won)</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1">
          {activeSummary.gpsMatchedQty.toLocaleString()}{' '}
          <span className="text-xs text-emerald-500 font-sans font-normal">MT</span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between font-mono">
          <span>{activeSummary.gpsMatchedCount} Vessels</span>
          <span className="text-emerald-300 font-extrabold">{gpsWinRate}% Won</span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${Math.min(100, gpsWinRate)}%` }}
          />
        </div>
      </div>

      {/* Actual GPS Delivered (FLOW) Card */}
      <div className="bg-slate-900 border border-teal-900/50 rounded-xl p-4 shadow-sm relative overflow-hidden">
        <div className="text-[10px] font-bold text-teal-400 uppercase tracking-wider flex items-center justify-between">
          <span>Actual GPS Supplied</span>
          <Target className="w-3.5 h-3.5 text-teal-400" />
        </div>
        <div className="text-xl sm:text-2xl font-black text-teal-300 font-mono mt-1">
          {totalGpsDeliveredMT.toLocaleString()}{' '}
          <span className="text-xs text-teal-500 font-sans font-normal">MT</span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between font-mono">
          <span>Variance: {netGpsVarianceMT >= 0 ? `+${netGpsVarianceMT}` : netGpsVarianceMT} MT</span>
          <span className="text-teal-400 font-bold">{deliveryAccuracyPct}% Acc.</span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
          <div
            className="h-full bg-teal-400 rounded-full transition-all duration-700"
            style={{ width: `${Math.min(100, deliveryAccuracyPct)}%` }}
          />
        </div>
      </div>

      {/* Competitor Lost Card */}
      <div className="bg-slate-900 border border-amber-900/50 rounded-xl p-4 shadow-sm relative overflow-hidden">
        <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
          <span>Competitor Taken</span>
          <UserX className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-1">
          {activeSummary.competitorMatchedQty.toLocaleString()}{' '}
          <span className="text-xs text-amber-500 font-sans font-normal">MT</span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between font-mono">
          <span>{activeSummary.competitorMatchedCount} Vessels</span>
          <span className="text-amber-300 font-extrabold">{compLossRate}% Lost</span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-700"
            style={{ width: `${Math.min(100, compLossRate)}%` }}
          />
        </div>
      </div>

      {/* Unverified Opportunity Card */}
      <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-4 shadow-sm relative overflow-hidden col-span-2 lg:col-span-1">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>Unverified Demand</span>
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
        </div>
        <div className="text-xl sm:text-2xl font-black text-slate-300 font-mono mt-1">
          {activeSummary.unverifiedQty.toLocaleString()}{' '}
          <span className="text-xs text-slate-500 font-sans font-normal">MT</span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between font-mono">
          <span>{activeSummary.unverifiedCount} Enquiries</span>
          <span className="text-slate-300 font-extrabold">{unvRate}% Open</span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
          <div
            className="h-full bg-slate-500 rounded-full transition-all duration-700"
            style={{ width: `${Math.min(100, unvRate)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
