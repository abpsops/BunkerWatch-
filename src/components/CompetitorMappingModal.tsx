import React, { useState } from 'react';
import { CompetitorMapping, StsTrackingRecord } from '../types/reconciliation';
import { X, Plus, Trash2, Sliders, Check, HelpCircle } from 'lucide-react';

interface CompetitorMappingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mappings: CompetitorMapping[];
  onSaveMappings: (mappings: CompetitorMapping[]) => void;
  trackingRecords: StsTrackingRecord[];
}

export const CompetitorMappingModal: React.FC<CompetitorMappingModalProps> = ({
  isOpen,
  onClose,
  mappings,
  onSaveMappings,
  trackingRecords
}) => {
  const [localMappings, setLocalMappings] = useState<CompetitorMapping[]>(mappings);
  const [newBarge, setNewBarge] = useState('');
  const [newCompetitor, setNewCompetitor] = useState('');

  if (!isOpen) return null;

  // Find unique barges in tracking report that don't have competitor or are unmapped
  const trackingBarges = Array.from(new Set(trackingRecords.map(r => r.barge).filter(Boolean)));
  const mappedBarges = new Set(localMappings.map(m => m.bargeName.trim().toUpperCase()));
  const unmappedTrackingBarges = trackingBarges.filter(b => !mappedBarges.has(b.trim().toUpperCase()));

  const handleAdd = () => {
    if (!newBarge.trim() || !newCompetitor.trim()) return;

    const updated = [
      ...localMappings.filter(m => m.bargeName.trim().toUpperCase() !== newBarge.trim().toUpperCase()),
      { bargeName: newBarge.trim().toUpperCase(), competitorName: newCompetitor.trim() }
    ];

    setLocalMappings(updated);
    setNewBarge('');
    setNewCompetitor('');
  };

  const handleDelete = (index: number) => {
    const updated = localMappings.filter((_, idx) => idx !== index);
    setLocalMappings(updated);
  };

  const handleSaveAndApply = () => {
    onSaveMappings(localMappings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wide">
                Competitor Mapping
              </h2>
              <p className="text-xs text-slate-400">
                Map barge names to competitor companies (Barge &rarr; Competitor)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Info callout */}
          <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 flex items-start space-x-2 text-slate-300">
            <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              If the Tracking Report has a barge name but no company name (or needs reclassification), map the barge to the competitor company here. The mapping automatically applies to the reconciliation.
            </div>
          </div>

          {/* Quick Suggestion Pills */}
          {unmappedTrackingBarges.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Barges detected in Tracking Report:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {unmappedTrackingBarges.map((barge) => (
                  <button
                    key={barge}
                    type="button"
                    onClick={() => setNewBarge(barge)}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] border border-slate-700 transition"
                    title="Click to fill barge field"
                  >
                    + {barge}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add Mapping Form */}
          <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 space-y-2.5">
            <div className="font-bold text-white text-xs">Add New Mapping</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Barge Name</label>
                <input
                  type="text"
                  placeholder="Barge name"
                  value={newBarge}
                  onChange={(e) => setNewBarge(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Competitor Company</label>
                <input
                  type="text"
                  placeholder="Competitor name"
                  value={newCompetitor}
                  onChange={(e) => setNewCompetitor(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!newBarge.trim() || !newCompetitor.trim()}
              className="w-full mt-2 py-1.5 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Mapping</span>
            </button>
          </div>

          {/* Current Mappings List */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <span>Active Mappings ({localMappings.length})</span>
            </div>

            {localMappings.length === 0 ? (
              <div className="py-6 text-center text-slate-500 italic border border-dashed border-slate-800 rounded-lg">
                No competitor mappings configured yet.
              </div>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {localMappings.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                        {m.bargeName}
                      </span>
                      <span className="text-slate-500">&rarr;</span>
                      <span className="font-bold text-amber-300">
                        {m.competitorName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(idx)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded transition"
                      title="Remove mapping"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-medium transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveAndApply}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save &amp; Apply to Reconciliation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
