import { useState } from 'react';
import { CompetitorMapping } from '../types/reconciliation';
import { INITIAL_COMPETITOR_MAPPINGS } from '../data/sampleData';

const STORAGE_KEY = 'bunker_reconciliation_mappings';

function loadStoredMappings(): CompetitorMapping[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // fall through to defaults
  }
  return INITIAL_COMPETITOR_MAPPINGS;
}

/**
 * Competitor (barge -> competitor) mappings, persisted to localStorage.
 */
export function useCompetitorMappings(showToast: (text: string) => void) {
  const [mappings, setMappings] = useState<CompetitorMapping[]>(loadStoredMappings);

  const saveMappings = (newMappings: CompetitorMapping[]) => {
    setMappings(newMappings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMappings));
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
    showToast(`Updated ${newMappings.length} competitor barge mappings.`);
  };

  const resetMappings = () => setMappings(INITIAL_COMPETITOR_MAPPINGS);

  return { mappings, saveMappings, resetMappings };
}
