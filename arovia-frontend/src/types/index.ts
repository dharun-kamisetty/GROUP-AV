// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Medical Types (matching Python Pydantic models)
export interface Symptom {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration?: string;
  associated_symptoms: string[];
}

export interface RedFlag {
  flag_type: 'cardiac' | 'neurological' | 'respiratory' | 'trauma' | 'mental_health' | 'other';
  description: string;
  urgency_level: 'immediate' | 'urgent';
  action_required: string;
}

export interface PotentialRisk {
  condition: string;
  probability: 'low' | 'medium' | 'high';
  specialty_needed: string;
}

export interface TriageResult {
  chief_complaint: string;
  symptoms: Symptom[];
  urgency_score: number; // 1-10
  red_flags: RedFlag[];
  potential_risks: PotentialRisk[];
  recommended_specialty: string;
  triage_category: 'immediate' | 'urgent' | 'standard';
  emergency_detected: boolean;
  action_required: string;
  timestamp: string;
}

export interface VoiceInput {
  audio_file_path: string;
  transcribed_text: string;
  language: string;
  confidence: number; // 0.0-1.0
  processing_time: number;
}

export interface FacilityInfo {
  name: string;
  address: string;
  distance_km: number;
  specialty: string;
  services: string[];
  contact?: string;
  map_link?: string;
}

export interface ReferralNote {
  patient_id?: string;
  triage_result: TriageResult;
  recommended_facilities: FacilityInfo[];
  generated_at: string;
}

// Location Types
export interface UserLocation {
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Voice Recording Types
export interface VoiceRecordingState {
  isRecording: boolean;
  duration: number;
  maxDuration: number;
  audioBlob?: Blob;
  error?: string;
}

// Language Support Types
export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  ttsCode?: string; // For text-to-speech
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', ttsCode: 'en-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', ttsCode: 'hi-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', ttsCode: 'te-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', ttsCode: 'ta-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', ttsCode: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', ttsCode: 'ml-IN' }
];

// Form Types
export interface SymptomFormData {
  text_input: string;
  language: string;
  location: string;
  patient_id?: string;
}

export interface VoiceFormData {
  language: string;
  duration: number;
  location: string;
  patient_id?: string;
}

// Navigation Types
export interface NavigationItem {
  path: string;
  label: string;
  icon: string;
  protected?: boolean;
}

// Theme Types
export interface ThemeMode {
  mode: 'light' | 'dark';
}

// TTS Types
export interface TTSState {
  isSupported: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  error?: string;
}

export interface TTSOptions {
  language?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}
