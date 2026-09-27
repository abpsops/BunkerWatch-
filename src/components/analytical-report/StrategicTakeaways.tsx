import React from 'react';
import { ReconciliationSummary, CompetitorBreakdown } from '../../types/reconciliation';
import { Zap, CheckCircle2, UserX, Compass } from 'lucide-react';

interface StrategicTakeawaysProps {
  summary: ReconciliationSummary;
  gpsWinRate: number;
  compLossRate: number;
  deliveryAccuracyPct: number;
  vlsfoShare: number;
  mgoShare: number;
  gpsVlsfoWinRate: number;
  gpsMgoWinRate: number;
  topCompetitor: CompetitorBreakdown | null;
}

export const StrategicTakeaways: React.FC<StrategicTakeawaysProps> = ({
  summary,
  gpsWinRate,
  compLossRate,
  deliveryAccuracyPct,
  vlsfoShare,
  mgoShare,
  gpsVlsfoWinRate,
  gpsMgoWinRate,
  topCompetitor
}) => {
  return (
    <div className="bg-slate-900 border border-blue-900/40 rounded-xl p-5 shadow-sm text-xs space-y-3">
      <div className="flex items-center space-x-2 text-blue-400 font-bold uppercase tracking-wider text-xs">
        <Zap className="w-4 h-4" />
        <span>Strategic Executive Takeaways &amp; Operational Insights</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
          <span className="font-bold text-white flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>GPS Performance Rating</span>
          </span>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            GPS successfully captured <strong className="text-emerald-400">{summary.gpsMatchedQty.toLocaleString()} MT</strong>{' '}
            ({gpsWinRate}% of total requested volume) with a delivery fulfillment accuracy of{' '}
            <strong className="text-teal-300">{deliveryAccuracyPct}%</strong> across {summary.gpsMatchedCount} stems.
          </p>
        </div>

        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
          <span className="font-bold text-white flex items-center space-x-1.5">
            <UserX className="w-3.5 h-3.5 text-amber-400" />
            <span>Competitor Infiltration</span>
          </span>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Competitors captured <strong className="text-amber-400">{summary.competitorMatchedQty.toLocaleString()} MT</strong>{' '}
            ({compLossRate}% of market volume). Key competitor threat is{' '}
            <strong className="text-white">{topCompetitor ? topCompetitor.competitor : 'N/A'}</strong> holding the largest
            share of lost stems.
          </p>
        </div>

        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
          <span className="font-bold text-white flex items-center space-x-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fuel Demand &amp; Capture Dynamics</span>
          </span>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Demand was split <strong className="text-blue-400">{vlsfoShare}% VLSFO</strong> and{' '}
            <strong className="text-cyan-400">{mgoShare}% MGO</strong>. GPS secured{' '}
            <strong className="text-emerald-400">{gpsVlsfoWinRate}%</strong> of VLSFO demand and{' '}
            <strong className="text-cyan-300">{gpsMgoWinRate}%</strong> of MGO demand.
          </p>
        </div>
      </div>
    </div>
  );
};
