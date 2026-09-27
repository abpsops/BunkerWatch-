import React, { useState, useMemo } from 'react';
import { ReconciledRecord, ReconciliationSummary } from './types/reconciliation';
import { performReconciliation, calculateSummary } from './utils/reconciliationEngine';
import {
  exportReconciliationToExcel,
  exportReconciliationToCSV,
  downloadColoredPdfReport,
  exportColorizedExcel
} from './utils/exportUtils';
import { useToast } from './hooks/useToast';
import { useCompetitorMappings } from './hooks/useCompetitorMappings';
import { useReportUploads } from './hooks/useReportUploads';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { SummaryCards } from './components/SummaryCards';
import { MainReconciliationTable } from './components/MainReconciliationTable';
import { CompetitorInfoSection } from './components/CompetitorInfoSection';
import { PeriodAnalysisSection } from './components/PeriodAnalysisSection';
import { SimpleCharts } from './components/SimpleCharts';
import { AnalyticalReport } from './components/analytical-report';
import { CompetitorMappingModal } from './components/CompetitorMappingModal';
import { ColumnMappingModal } from './components/ColumnMappingModal';
import { InspectModal } from './components/InspectModal';
import { CheckCircle2, AlertTriangle, BarChart3, FileSpreadsheet, Award, Calendar, Layers } from 'lucide-react';

type ActiveView = 'analytics' | 'table' | 'competitors' | 'periods' | 'all';

const VIEW_TABS: { id: ActiveView; label: string; icon: React.ElementType; iconClassName: string }[] = [
  { id: 'analytics', label: 'Graphical Analytical Report', icon: BarChart3, iconClassName: 'text-emerald-400' },
  { id: 'table', label: 'Reconciliation Table', icon: FileSpreadsheet, iconClassName: 'text-blue-400' },
  { id: 'competitors', label: 'Competitor Intelligence', icon: Award, iconClassName: 'text-amber-400' },
  { id: 'periods', label: 'Period Analysis', icon: Calendar, iconClassName: 'text-cyan-400' },
  { id: 'all', label: 'All Sections', icon: Layers, iconClassName: 'text-purple-400' }
];

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('analytics');

  const { toastMessage, showToast } = useToast();
  const { mappings, saveMappings, resetMappings } = useCompetitorMappings(showToast);
  const {
    gpsRecords,
    trackingRecords,
    enquiryRecords,
    rawGps,
    rawTracking,
    rawEnquiry,
    isParsing,
    columnConfigType,
    setColumnConfigType,
    handleUploadGps,
    handleUploadTracking,
    handleUploadEnquiry,
    handleSwitchSheet,
    applyEnquiryConfig,
    applyGpsConfig,
    applyTrackingConfig,
    loadSample,
    clearAll
  } = useReportUploads(showToast);

  // UI modal state
  const [isMappingOpen, setIsMappingOpen] = useState(false);
  const [inspectType, setInspectType] = useState<'gps' | 'tracking' | 'enquiry' | null>(null);

  const handleLoadSample = () => {
    loadSample();
    resetMappings();
  };

  // Core 3-Way Reconciliation Execution
  const reconciledRecords: ReconciledRecord[] = useMemo(() => {
    return performReconciliation(enquiryRecords, gpsRecords, trackingRecords, mappings);
  }, [enquiryRecords, gpsRecords, trackingRecords, mappings]);

  // Core 8 KPI Summary
  const summary: ReconciliationSummary = useMemo(() => {
    return calculateSummary(reconciledRecords);
  }, [reconciledRecords]);

  // Exporters
  const handleExportExcel = () => {
    if (reconciledRecords.length === 0) {
      showToast('No reconciliation records to export.', 'warning');
      return;
    }
    exportReconciliationToExcel(reconciledRecords, summary);
    showToast('Exported 3-Way Reconciliation to Excel (.xlsx)');
  };

  const handleExportCSV = () => {
    if (reconciledRecords.length === 0) {
      showToast('No reconciliation records to export.', 'warning');
      return;
    }
    exportReconciliationToCSV(reconciledRecords);
    showToast('Exported 3-Way Reconciliation to CSV');
  };

  const handleDownloadColorPdf = async () => {
    if (reconciledRecords.length === 0) {
      showToast('No reconciliation records to export.', 'warning');
      return;
    }
    showToast('Rendering high-resolution colored PDF report...');
    if (activeView !== 'analytics' && activeView !== 'all') {
      setActiveView('analytics');
      await new Promise(r => setTimeout(r, 350));
    }
    const success = await downloadColoredPdfReport('analytical-report-view');
    if (success) {
      showToast('Colored PDF report downloaded successfully!');
    }
  };

  const handleDownloadColorExcel = () => {
    if (reconciledRecords.length === 0) {
      showToast('No reconciliation records to export.', 'warning');
      return;
    }
    exportColorizedExcel(reconciledRecords, summary);
    showToast('Downloaded Colorized Excel Spreadsheet (.xls) in full colors!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce duration-300">
          <div
            className={`px-4 py-2.5 rounded-lg shadow-xl border text-xs font-semibold flex items-center space-x-2 ${
              toastMessage.type === 'success'
                ? 'bg-emerald-900 border-emerald-600 text-emerald-100'
                : 'bg-amber-900 border-amber-600 text-amber-100'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-300" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Top Header */}
      <Header
        onLoadSample={handleLoadSample}
        onOpenMapping={() => setIsMappingOpen(true)}
        onExportExcel={handleExportExcel}
        onExportCSV={handleExportCSV}
        onDownloadColorPdf={handleDownloadColorPdf}
        onDownloadColorExcel={handleDownloadColorExcel}
        onClearAll={clearAll}
        hasData={enquiryRecords.length > 0}
        mappingsCount={mappings.length}
        activeView={activeView}
        onSelectView={(v) => setActiveView(v)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Upload Dropzones */}
        <UploadSection
          gpsRecords={gpsRecords}
          trackingRecords={trackingRecords}
          enquiryRecords={enquiryRecords}
          rawGps={rawGps}
          rawTracking={rawTracking}
          rawEnquiry={rawEnquiry}
          onUploadGps={handleUploadGps}
          onUploadTracking={handleUploadTracking}
          onUploadEnquiry={handleUploadEnquiry}
          onInspect={(type) => setInspectType(type)}
          onConfigureColumns={(type) => setColumnConfigType(type)}
          isParsing={isParsing}
        />

        {enquiryRecords.length === 0 ? (
          /* Empty State when no enquiries are loaded */
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-10 text-center space-y-4">
            <div className="max-w-md mx-auto space-y-2">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">
                No Enquiry Data Uploaded
              </h2>
              <p className="text-xs text-slate-400">
                Upload your 3 reports above (Flow/GPS, STS Tracking, and Enquiry Data) or click "Load Sample Data" to begin the 3-Way Reconciliation.
              </p>
            </div>
            <button
              onClick={handleLoadSample}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-md"
            >
              Load Sample Bunker Dataset
            </button>
          </div>
        ) : (
          /* Reconciled Results Sections */
          <>
            {/* Top 8 KPI Summary Cards */}
            <SummaryCards summary={summary} />

            {/* View Switcher Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between bg-slate-900/80 p-1.5 rounded-xl border border-slate-800/90 shadow-sm mb-6 gap-2">
              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                {VIEW_TABS.map(({ id, label, icon: Icon, iconClassName }) => (
                  <button
                    key={id}
                    onClick={() => setActiveView(id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
                      activeView === id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${iconClassName}`} />
                    <span>{label}</span>
                    {id === 'table' && (
                      <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">
                        {reconciledRecords.length}
                      </span>
                    )}
                    {id === 'analytics' && (
                      <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-semibold">
                        Visual
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="text-[11px] text-slate-400 px-2 font-mono hidden md:block">
                Reconciled: <span className="text-white font-bold">{summary.totalEnquiryQty.toLocaleString()} MT</span> &bull; Win Rate: <span className="text-emerald-400 font-bold">{Math.round((summary.gpsMatchedQty / (summary.totalEnquiryQty || 1)) * 100)}%</span>
              </div>
            </div>

            {/* View 1: Primary Analytical Graphical Representation Report */}
            {activeView === 'analytics' && (
              <>
                <AnalyticalReport
                  records={reconciledRecords}
                  summary={summary}
                  onExportExcel={handleExportExcel}
                  onExportCSV={handleExportCSV}
                />
                {/* Compact table view preview underneath */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                      <FileSpreadsheet className="w-4 h-4 text-blue-400" />
                      <span>Reconciled Vessel Records Data Feed</span>
                    </h3>
                    <button
                      onClick={() => setActiveView('table')}
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center space-x-1"
                    >
                      <span>Open Full Table with Row Select &rarr;</span>
                    </button>
                  </div>
                  <MainReconciliationTable records={reconciledRecords} />
                </div>
              </>
            )}

            {/* View 2: Full Reconciliation Table */}
            {activeView === 'table' && (
              <MainReconciliationTable records={reconciledRecords} />
            )}

            {/* View 3: Competitor Intelligence */}
            {activeView === 'competitors' && (
              <CompetitorInfoSection records={reconciledRecords} />
            )}

            {/* View 4: Period Analysis */}
            {activeView === 'periods' && (
              <PeriodAnalysisSection records={reconciledRecords} />
            )}

            {/* View 5: All Sections Consolidated */}
            {activeView === 'all' && (
              <>
                <AnalyticalReport
                  records={reconciledRecords}
                  summary={summary}
                  onExportExcel={handleExportExcel}
                  onExportCSV={handleExportCSV}
                />
                <MainReconciliationTable records={reconciledRecords} />
                <CompetitorInfoSection records={reconciledRecords} />
                <PeriodAnalysisSection records={reconciledRecords} />
                <SimpleCharts records={reconciledRecords} summary={summary} />
              </>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          3-WAY RECONCILIATION &bull; Bunker Operations Reconciliation Module &bull; Vessel Name Matching &bull; Total Enquiry Qty = GPS Matched + Competitor Matched + Unverified
        </div>
      </footer>

      {/* Competitor Mapping Modal (Barge -> Competitor) */}
      <CompetitorMappingModal
        isOpen={isMappingOpen}
        onClose={() => setIsMappingOpen(false)}
        mappings={mappings}
        onSaveMappings={saveMappings}
        trackingRecords={trackingRecords}
      />

      {/* Column Mapping & Live Preview Modal */}
      <ColumnMappingModal
        isOpen={columnConfigType !== null}
        onClose={() => setColumnConfigType(null)}
        reportType={columnConfigType}
        rawReport={
          columnConfigType === 'enquiry'
            ? rawEnquiry
            : columnConfigType === 'gps'
            ? rawGps
            : rawTracking
        }
        onApplyEnquiry={applyEnquiryConfig}
        onApplyGps={applyGpsConfig}
        onApplyTracking={applyTrackingConfig}
        onSwitchSheet={handleSwitchSheet}
      />

      {/* Inspect Modal */}
      <InspectModal
        isOpen={inspectType !== null}
        onClose={() => setInspectType(null)}
        type={inspectType}
        gpsRecords={gpsRecords}
        trackingRecords={trackingRecords}
        enquiryRecords={enquiryRecords}
      />
    </div>
  );
}
