import React, { useRef } from 'react';
import { Upload, CheckCircle2, AlertCircle, FileSpreadsheet, Eye, Info, Sliders } from 'lucide-react';
import { EnquiryRecord, GpsRecord, StsTrackingRecord, RawReportState } from '../types/reconciliation';

interface UploadSectionProps {
  gpsRecords: GpsRecord[];
  trackingRecords: StsTrackingRecord[];
  enquiryRecords: EnquiryRecord[];
  rawGps: RawReportState | null;
  rawTracking: RawReportState | null;
  rawEnquiry: RawReportState | null;
  onUploadGps: (file: File) => void;
  onUploadTracking: (file: File) => void;
  onUploadEnquiry: (file: File) => void;
  onInspect: (type: 'gps' | 'tracking' | 'enquiry') => void;
  onConfigureColumns: (type: 'gps' | 'tracking' | 'enquiry') => void;
  isParsing: boolean;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  gpsRecords,
  trackingRecords,
  enquiryRecords,
  rawGps,
  rawTracking,
  rawEnquiry,
  onUploadGps,
  onUploadTracking,
  onUploadEnquiry,
  onInspect,
  onConfigureColumns,
  isParsing
}) => {
  const gpsInputRef = useRef<HTMLInputElement>(null);
  const trackingInputRef = useRef<HTMLInputElement>(null);
  const enquiryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, handler: (file: File) => void) => {
    if (e.target.files && e.target.files[0]) {
      handler(e.target.files[0]);
      e.target.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent, handler: (file: File) => void) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handler(e.dataTransfer.files[0]);
    }
  };

  const gpsQtyCount = gpsRecords.filter(r => r.quantity && r.quantity > 0).length;
  const enquiryTotalMT = enquiryRecords.reduce((acc, r) => acc + r.totalEnquiryQty, 0);
  const enquiryVlsfoMT = enquiryRecords.reduce((acc, r) => acc + (r.vlsfoQty || 0), 0);
  const enquiryMgoMT = enquiryRecords.reduce((acc, r) => acc + (r.mgoQty || 0), 0);

  return (
    <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-4 sm:p-5 shadow-sm mb-6">
      {/* Legend / Notice */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800 text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="font-semibold text-slate-200">Reconciliation Data Sources:</span>
          <span className="hidden sm:inline text-slate-400">
            Flow Report = GPS Report &bull; Tracking Report = STS Bunkering &bull; Enquiry Report = Enquiry Data
          </span>
        </div>
        <div className="text-[11px] text-slate-400">
          Accepted formats: <span className="font-mono text-slate-300">.XLSX, .XLS, .CSV</span>
        </div>
      </div>

      {/* 3 Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. FLOW / GPS REPORT */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, onUploadGps)}
          className={`relative rounded-lg p-4 border transition ${
            gpsRecords.length > 0
              ? 'border-emerald-600/50 bg-emerald-950/20'
              : 'border-slate-700/80 bg-slate-800/40 hover:border-blue-500/60'
          }`}
        >
          <input
            type="file"
            ref={gpsInputRef}
            onChange={(e) => handleFileChange(e, onUploadGps)}
            accept=".xlsx,.xls,.csv"
            className="hidden"
          />

          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold flex items-center justify-center">
                1
              </span>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">FLOW REPORT</h3>
                <span className="text-[11px] text-emerald-400 font-medium">GPS REPORT</span>
              </div>
            </div>
            {gpsRecords.length > 0 ? (
              <span className="flex items-center text-xs text-emerald-400 font-semibold space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Loaded</span>
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">Required</span>
            )}
          </div>

          <p className="text-xs text-slate-400 mt-2 line-clamp-2">
            Extracts Vessel Name, Barge &amp; actual supply records with verified quantities.
          </p>

          <div className="mt-4 pt-3 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-2">
            {gpsRecords.length > 0 ? (
              <div className="text-xs text-slate-300">
                <span className="font-bold text-emerald-300">{gpsRecords.length}</span> vessels
                <span className="text-slate-400 text-[11px] ml-1">({gpsQtyCount} with MT)</span>
              </div>
            ) : (
              <span className="text-xs text-slate-400 italic">No file selected</span>
            )}

            <div className="flex items-center space-x-1.5 ml-auto">
              {rawGps && (
                <button
                  type="button"
                  onClick={() => onConfigureColumns('gps')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1 border border-slate-700 transition"
                  title="Configure Columns &amp; View Live Preview"
                >
                  <Sliders className="w-3 h-3 text-blue-400" />
                  <span>Columns</span>
                </button>
              )}
              {gpsRecords.length > 0 && (
                <button
                  type="button"
                  onClick={() => onInspect('gps')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1 border border-slate-700 transition"
                  title="Inspect parsed records"
                >
                  <Eye className="w-3 h-3 text-slate-300" />
                  <span>Inspect</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => gpsInputRef.current?.click()}
                disabled={isParsing}
                className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center space-x-1 shadow-sm transition disabled:opacity-50"
              >
                <Upload className="w-3 h-3" />
                <span>{gpsRecords.length > 0 ? 'Replace' : 'Upload'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. TRACKING REPORT / STS BUNKERING */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, onUploadTracking)}
          className={`relative rounded-lg p-4 border transition ${
            trackingRecords.length > 0
              ? 'border-amber-600/50 bg-amber-950/20'
              : 'border-slate-700/80 bg-slate-800/40 hover:border-blue-500/60'
          }`}
        >
          <input
            type="file"
            ref={trackingInputRef}
            onChange={(e) => handleFileChange(e, onUploadTracking)}
            accept=".xlsx,.xls,.csv"
            className="hidden"
          />

          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">
                2
              </span>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">TRACKING REPORT</h3>
                <span className="text-[11px] text-amber-400 font-medium">STS BUNKERING</span>
              </div>
            </div>
            {trackingRecords.length > 0 ? (
              <span className="flex items-center text-xs text-amber-400 font-semibold space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Loaded</span>
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">Required</span>
            )}
          </div>

          <p className="text-xs text-slate-400 mt-2 line-clamp-2">
            Extracts Vessel Name, Barge Name, Competitor Company &amp; Tracking Quantity.
          </p>

          <div className="mt-4 pt-3 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-2">
            {trackingRecords.length > 0 ? (
              <div className="text-xs text-slate-300">
                <span className="font-bold text-amber-300">{trackingRecords.length}</span> operations
              </div>
            ) : (
              <span className="text-xs text-slate-400 italic">No file selected</span>
            )}

            <div className="flex items-center space-x-1.5 ml-auto">
              {rawTracking && (
                <button
                  type="button"
                  onClick={() => onConfigureColumns('tracking')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1 border border-slate-700 transition"
                  title="Configure Columns &amp; View Live Preview"
                >
                  <Sliders className="w-3 h-3 text-amber-400" />
                  <span>Columns</span>
                </button>
              )}
              {trackingRecords.length > 0 && (
                <button
                  type="button"
                  onClick={() => onInspect('tracking')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1 border border-slate-700 transition"
                  title="Inspect parsed records"
                >
                  <Eye className="w-3 h-3 text-slate-300" />
                  <span>Inspect</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => trackingInputRef.current?.click()}
                disabled={isParsing}
                className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center space-x-1 shadow-sm transition disabled:opacity-50"
              >
                <Upload className="w-3 h-3" />
                <span>{trackingRecords.length > 0 ? 'Replace' : 'Upload'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. ENQUIRY REPORT / ENQUIRY DATA */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, onUploadEnquiry)}
          className={`relative rounded-lg p-4 border transition ${
            enquiryRecords.length > 0
              ? 'border-blue-600/50 bg-blue-950/20'
              : 'border-slate-700/80 bg-slate-800/40 hover:border-blue-500/60'
          }`}
        >
          <input
            type="file"
            ref={enquiryInputRef}
            onChange={(e) => handleFileChange(e, onUploadEnquiry)}
            accept=".xlsx,.xls,.csv"
            className="hidden"
          />

          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold flex items-center justify-center">
                3
              </span>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">ENQUIRY REPORT</h3>
                <span className="text-[11px] text-blue-400 font-medium">ENQUIRY DATA</span>
              </div>
            </div>
            {enquiryRecords.length > 0 ? (
              <span className="flex items-center text-xs text-blue-400 font-semibold space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Loaded</span>
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">Required</span>
            )}
          </div>

          <p className="text-xs text-slate-400 mt-2 line-clamp-2">
            Extracts Date, Vessel &amp; all 3 Fuel Grades + Quantities under the blue enquiry table.
          </p>

          <div className="mt-4 pt-3 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-2">
            {enquiryRecords.length > 0 ? (
              <div className="text-xs text-slate-300">
                <span className="font-bold text-blue-300">{enquiryRecords.length}</span> enquiries
                <span className="text-slate-400 text-[11px] ml-1">({enquiryTotalMT.toLocaleString()} MT)</span>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center space-x-1.5">
                  <span className="text-blue-300">VLSFO: {enquiryVlsfoMT.toLocaleString()}</span>
                  <span>&bull;</span>
                  <span className="text-cyan-300">MGO: {enquiryMgoMT.toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <span className="text-xs text-slate-400 italic">No file selected</span>
            )}

            <div className="flex items-center space-x-1.5 ml-auto">
              {rawEnquiry && (
                <button
                  type="button"
                  onClick={() => onConfigureColumns('enquiry')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1 border border-slate-700 transition"
                  title="Configure Columns &amp; View Live Preview"
                >
                  <Sliders className="w-3 h-3 text-blue-400" />
                  <span>Columns</span>
                </button>
              )}
              {enquiryRecords.length > 0 && (
                <button
                  type="button"
                  onClick={() => onInspect('enquiry')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1 border border-slate-700 transition"
                  title="Inspect parsed records"
                >
                  <Eye className="w-3 h-3 text-slate-300" />
                  <span>Inspect</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => enquiryInputRef.current?.click()}
                disabled={isParsing}
                className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center space-x-1 shadow-sm transition disabled:opacity-50"
              >
                <Upload className="w-3 h-3" />
                <span>{enquiryRecords.length > 0 ? 'Replace' : 'Upload'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
