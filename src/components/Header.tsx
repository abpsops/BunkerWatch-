import React from 'react';
import { Ship, RefreshCw, FileSpreadsheet, Download, Sliders, Trash2, BarChart3, Palette } from 'lucide-react';

interface HeaderProps {
  onOpenMapping: () => void;
  onExportExcel: () => void;
  onExportCSV: () => void;
  onDownloadColorPdf?: () => void;
  onDownloadColorExcel?: () => void;
  onClearAll: () => void;
  hasData: boolean;
  mappingsCount: number;
  activeView?: 'analytics' | 'table' | 'competitors' | 'periods' | 'all';
  onSelectView?: (view: 'analytics' | 'table' | 'competitors' | 'periods' | 'all') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMapping,
  onExportExcel,
  onExportCSV,
  onDownloadColorPdf,
  onDownloadColorExcel,
  onClearAll,
  hasData,
  mappingsCount,
  activeView = 'analytics',
  onSelectView
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-inner font-bold">
              <Ship className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white uppercase">
                  Bunker Watch
                </h1>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Bunker Operations
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Flow / GPS Report &bull; STS Bunkering Tracking &bull; Enquiry Data
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {hasData && onSelectView && (
              <button
                onClick={() => onSelectView('analytics')}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition shadow-sm ${
                  activeView === 'analytics'
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/40'
                    : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900/60'
                }`}
                title="View Analytical Graphical Representation Report"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Graphical Report</span>
              </button>
            )}

            <button
              onClick={onOpenMapping}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
              title="Map Barge Names to Competitor Companies"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              <span>Competitor Mapping</span>
              {mappingsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-blue-500/30 text-blue-300 text-[10px] font-mono">
                  {mappingsCount}
                </span>
              )}
            </button>

            {hasData && (
              <>
                <div className="h-5 w-px bg-slate-700 mx-1 hidden sm:block" />

                {onDownloadColorPdf && (
                  <button
                    onClick={onDownloadColorPdf}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-sm transition"
                    title="Download Graphical Analytical Report in full color (PDF)"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span>Colored PDF</span>
                  </button>
                )}

                {onDownloadColorExcel && (
                  <button
                    onClick={onDownloadColorExcel}
                    className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-emerald-800 hover:bg-emerald-700 text-emerald-100 border border-emerald-600/50 text-xs font-semibold transition"
                    title="Download Colorized Excel Sheet with colored badges (.xls)"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Color Excel</span>
                  </button>
                )}

                <button
                  onClick={onExportExcel}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition"
                  title="Export results to standard Excel (.xlsx)"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>XLSX</span>
                </button>

                <button
                  onClick={onExportCSV}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
                  title="Export results to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>

                <button
                  onClick={onClearAll}
                  className="inline-flex items-center space-x-1 px-2 py-1.5 rounded-md text-rose-400 hover:bg-rose-950/40 text-xs transition"
                  title="Clear All Uploaded Reports"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

