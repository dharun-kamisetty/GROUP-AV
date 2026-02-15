const STORAGE_KEY = 'medical_triage_history';
const MAX_HISTORY = 10;

export function saveTriageToHistory(symptoms, result, location) {
  const history = getTriageHistory();
  
  const newTriage = {
    id: Date.now().toString(),
    symptoms,
    result,
    timestamp: new Date(),
    location
  };
  
  history.unshift(newTriage);
  
  // Keep only the last MAX_HISTORY items
  const trimmedHistory = history.slice(0, MAX_HISTORY);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
  
  return newTriage;
}

export function getTriageHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const history = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    return history.map((item) => ({
      ...item,
      timestamp: new Date(item.timestamp)
    }));
  } catch (error) {
    console.error('Error reading triage history:', error);
    return [];
  }
}

export function clearTriageHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getTriageById(id) {
  const history = getTriageHistory();
  return history.find(item => item.id === id);
}

export function deleteTriageFromHistory(id) {
  const history = getTriageHistory();
  const filtered = history.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
