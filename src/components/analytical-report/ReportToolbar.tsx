import React from 'react';
import {
  Palette,
  FileSpreadsheet,
  Printer,
  CheckCircle2,
  FileText,
  Image,
  Compass,
  Loader2
} from 'lucide-react';

export type FuelFilter = 'ALL' | 'VLSFO' | 'MGO';

interface ReportToolbarProps {
  fuelFilter: FuelFilter;
  onFuelFilterChange: (filter: FuelFilter) => void;
  isDownloadingPdf: boolean;
  isDownloadingPng: boolean;
  downloadStatus: string | null;
  onDismissStatus: () => void;
  onDownloadPdf: () => void;
  onDownloadPng: () => void;
  onDownloadColorExcel: () => void;
  onDownloadColoredHtml: () => void;
  onExportExcel: () => void;
  onPrint: () => void;
}

export const ReportToolbar: React.FC<ReportToolbarProps> = ({
  fuelFilter,
  onFuelFilterChange,
  isDownloadingPdf,
  isDownloadingPng,
  downloadStatus,
  onDismissStatus,
  onDownloadPdf,
  onDownloadPng,
  onDownloadColorExcel,
  onDownloadColoredHtml,
  onExportExcel,
  onPrint
}) => {
  return (
    <>
      {/* Executive Intelligence & Control Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/50 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-sm" />
            <h2 className="text-base sm:text-lg font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
              <span>Analytical Graphical Representation Report</span>
            </h2>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
              Executive Dashboard
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1.5 flex flex-wrap items-center gap-x-2">
            <span>Visual Analysis: Demand Fulfillment</span>
            <span>&bull;</span>
            <span className="text-emerald-400 font-semibold">GPS Market Capture</span>
            <span>&bull;</span>
            <span className="text-amber-400 font-semibold">Competitor Infiltration</span>
            <span>&bull;</span>
            <span className="text-blue-400 font-semibold">VLSFO &amp; MGO Grade Splits</span>
            <span>&bull;</span>
            <span className="text-cyan-400 font-semibold">Delivery Accuracy</span>
          </p>
        </div>

        {/* Filter Controls & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 print:hidden">
          {/* Fuel Focus Pill Switcher */}
          <div className="inline-flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => onFuelFilterChange('ALL')}
              className={`px-2.5 py-1 rounded transition ${
                fuelFilter === 'ALL' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Fuels
            </button>
            <button
              onClick={() => onFuelFilterChange('VLSFO')}
              className={`px-2.5 py-1 rounded transition ${
                fuelFilter === 'VLSFO' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              VLSFO Only
            </button>
            <button
              onClick={() => onFuelFilterChange('MGO')}
              className={`px-2.5 py-1 rounded transition ${
                fuelFilter === 'MGO' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              MGO Only
            </button>
          </div>

          {/* Primary Action: Download Colored PDF */}
          <button
            onClick={onDownloadPdf}
            disabled={isDownloadingPdf}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center space-x-1.5 transition shadow-md disabled:opacity-50"
            title="Download this entire graphical report in full color as a PDF"
          >
            {isDownloadingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Exporting Color PDF...</span>
              </>
            ) : (
              <>
                <Palette className="w-3.5 h-3.5 text-blue-200" />
                <span>Download Colored PDF</span>
              </>
            )}
          </button>

          <button
            onClick={onDownloadColorExcel}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm"
            title="Download Colorized Excel Spreadsheet with colored status badges (.xls)"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-200" />
            <span>Colorized Excel (.xls)</span>
          </button>

          <button
            onClick={onPrint}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center space-x-1.5 transition shadow-sm"
            title="Print or Save as Color PDF via system dialog"
          >
            <Printer className="w-3.5 h-3.5 text-blue-400" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Dynamic Status Toast Notification */}
      {downloadStatus && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{downloadStatus}</span>
          </div>
          <button onClick={onDismissStatus} className="text-xs text-emerald-400 hover:text-white ml-2 underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Colored Download Showcase Ribbon */}
      <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-blue-800/40 rounded-xl p-3.5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs print:hidden">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 flex items-center justify-center text-white shadow-md shrink-0">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center space-x-2">
              <span>Full Color Report Downloads Available</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold">
                PDF &bull; XLS &bull; PNG &bull; HTML
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Download the entire analytical dashboard with all colored charts, donut graphs, fuel splits, and competitor matrices!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onDownloadPdf}
            disabled={isDownloadingPdf}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition disabled:opacity-50"
            title="Download Full Colored PDF Report"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Colored PDF</span>
          </button>

          <button
            onClick={onDownloadColorExcel}
            className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition"
            title="Download Colorized Excel Sheet with colored badges (.xls)"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Colorized Excel (.xls)</span>
          </button>

          <button
            onClick={onDownloadPng}
            disabled={isDownloadingPng}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs flex items-center space-x-1.5 transition"
            title="Download Full Colored Dashboard as high-resolution PNG image"
          >
            <Image className="w-3.5 h-3.5 text-purple-400" />
            <span>Colored Image (PNG)</span>
          </button>

          <button
            onClick={onDownloadColoredHtml}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs flex items-center space-x-1.5 transition"
            title="Download Standalone Colored HTML Document"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Colored HTML</span>
          </button>

          <button
            onClick={onExportExcel}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium text-xs flex items-center space-x-1.5 transition"
            title="Download Standard XLSX"
          >
            <span>Raw XLSX</span>
          </button>
        </div>
      </div>
    </>
  );
};
