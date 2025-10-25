import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  TriageResult, 
  VoiceInput, 
  ReferralNote, 
  UserLocation, 
  VoiceRecordingState, 
  TTSState 
} from '@/types';

// Main App Store
interface AppStore {
  // Current results
  triageResult: TriageResult | null;
  voiceResult: VoiceInput | null;
  referralNote: ReferralNote | null;
  
  // User data
  userLocation: UserLocation | null;
  selectedLanguage: string;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setTriageResult: (result: TriageResult | null) => void;
  setVoiceResult: (result: VoiceInput | null) => void;
  setReferralNote: (note: ReferralNote | null) => void;
  setUserLocation: (location: UserLocation | null) => void;
  setSelectedLanguage: (language: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearAll: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // Initial state
      triageResult: null,
      voiceResult: null,
      referralNote: null,
      userLocation: null,
      selectedLanguage: 'en',
      isLoading: false,
      error: null,

      // Actions
      setTriageResult: (result) => set({ triageResult: result }),
      setVoiceResult: (result) => set({ voiceResult: result }),
      setReferralNote: (note) => set({ referralNote: note }),
      setUserLocation: (location) => set({ userLocation: location }),
      setSelectedLanguage: (language) => set({ selectedLanguage: language }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearAll: () => set({
        triageResult: null,
        voiceResult: null,
        referralNote: null,
        error: null,
        isLoading: false
      })
    }),
    {
      name: 'arovia-app-store',
      partialize: (state) => ({
        selectedLanguage: state.selectedLanguage,
        userLocation: state.userLocation
      })
    }
  )
);

// Theme Store (persisted)
interface ThemeStore {
  mode: 'light' | 'dark';
  toggleMode: () => void;
  setMode: (mode: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: 'light',
      toggleMode: () => set((state) => ({ 
        mode: state.mode === 'light' ? 'dark' : 'light' 
      })),
      setMode: (mode) => set({ mode })
    }),
    {
      name: 'arovia-theme-store'
    }
  )
);

// Voice Recording Store
interface VoiceRecordingStore extends VoiceRecordingState {
  startRecording: (maxDuration?: number) => void;
  stopRecording: () => void;
  resetRecording: () => void;
  setError: (error: string | null) => void;
}

export const useVoiceRecordingStore = create<VoiceRecordingStore>((set, get) => ({
  isRecording: false,
  duration: 0,
  maxDuration: 30,
  audioBlob: undefined,
  error: undefined,

  startRecording: (maxDuration = 30) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      set({ error: 'Audio recording is not supported in this browser' });
      return;
    }

    set({ 
      isRecording: true, 
      duration: 0, 
      maxDuration,
      error: undefined 
    });

    // Start duration counter
    const interval = setInterval(() => {
      const state = get();
      if (!state.isRecording) {
        clearInterval(interval);
        return;
      }
      
      const newDuration = state.duration + 1;
      set({ duration: newDuration });
      
      // Auto-stop at max duration
      if (newDuration >= maxDuration) {
        clearInterval(interval);
        get().stopRecording();
      }
    }, 1000);
  },

  stopRecording: () => {
    set({ isRecording: false });
  },

  resetRecording: () => {
    set({
      isRecording: false,
      duration: 0,
      audioBlob: undefined,
      error: undefined
    });
  },

  setError: (error) => set({ error })
}));

// Text-to-Speech Store
interface TTSStore extends TTSState {
  speak: (text: string, options?: { language?: string; rate?: number }) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setLanguage: (language: string) => void;
}

export const useTTSStore = create<TTSStore>((set, get) => ({
  isSupported: 'speechSynthesis' in window,
  isSpeaking: false,
  isPaused: false,
  error: undefined,

  speak: (text: string, options = {}) => {
    const { isSupported } = get();
    if (!isSupported) {
      set({ error: 'Text-to-speech is not supported in this browser' });
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language
    if (options.language) {
      utterance.lang = options.language;
    }
    
    // Set rate
    utterance.rate = options.rate || 1;

    utterance.onstart = () => set({ isSpeaking: true, isPaused: false });
    utterance.onend = () => set({ isSpeaking: false, isPaused: false });
    utterance.onpause = () => set({ isPaused: true });
    utterance.onresume = () => set({ isPaused: false });
    utterance.onerror = (event) => {
      set({ 
        isSpeaking: false, 
        isPaused: false,
        error: `Speech synthesis error: ${event.error}` 
      });
    };

    window.speechSynthesis.speak(utterance);
  },

  pause: () => {
    if (get().isSpeaking) {
      window.speechSynthesis.pause();
    }
  },

  resume: () => {
    if (get().isPaused) {
      window.speechSynthesis.resume();
    }
  },

  stop: () => {
    window.speechSynthesis.cancel();
    set({ isSpeaking: false, isPaused: false });
  },

  setLanguage: (language: string) => {
    // This would be used for default language setting
    // Implementation depends on your language preference system
  }
}));
