import axios, { AxiosResponse, AxiosError } from 'axios';
import { 
  ApiResponse, 
  TriageResult, 
  VoiceInput, 
  ReferralNote, 
  FacilityInfo, 
  SymptomFormData, 
  VoiceFormData 
} from '@/types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding auth tokens (if needed in future)
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('arovia-auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'An unexpected error occurred';
    
    console.error('API Error:', {
      status: error.response?.status,
      message: errorMessage,
      url: error.config?.url
    });

    return Promise.reject(new Error(errorMessage));
  }
);

// API Service Functions
export const apiService = {
  // Text-based triage analysis
  analyzeSymptoms: async (data: SymptomFormData): Promise<ApiResponse<TriageResult>> => {
    const response = await api.post<ApiResponse<TriageResult>>('/triage/analyze', data);
    return response.data;
  },

  // Voice input processing
  processVoiceInput: async (audioBlob: Blob, language: string): Promise<ApiResponse<VoiceInput>> => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'voice-input.wav');
    formData.append('language', language);

    const response = await api.post<ApiResponse<VoiceInput>>('/voice/process', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Voice to triage (complete pipeline)
  voiceToTriage: async (data: VoiceFormData & { audioBlob: Blob }): Promise<ApiResponse<{
    voice_result: VoiceInput;
    triage_result: TriageResult;
  }>> => {
    const formData = new FormData();
    formData.append('audio', data.audioBlob, 'voice-input.wav');
    formData.append('language', data.language);
    formData.append('location', data.location);
    if (data.patient_id) {
      formData.append('patient_id', data.patient_id);
    }

    const response = await api.post<ApiResponse<{
      voice_result: VoiceInput;
      triage_result: TriageResult;
    }>>('/triage/voice-to-triage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Find nearby facilities
  findFacilities: async (params: {
    triage_result: TriageResult;
    location: string;
    radius_km?: number;
    coordinates?: { latitude: number; longitude: number };
  }): Promise<ApiResponse<FacilityInfo[]>> => {
    const response = await api.post<ApiResponse<FacilityInfo[]>>('/facilities/find', params);
    return response.data;
  },

  // Generate complete referral note
  generateReferralNote: async (params: {
    triage_result: TriageResult;
    location: string;
    patient_id?: string;
    coordinates?: { latitude: number; longitude: number };
  }): Promise<ApiResponse<ReferralNote>> => {
    const response = await api.post<ApiResponse<ReferralNote>>('/referral/generate', params);
    return response.data;
  },

  // Complete triage with facilities
  completeTriageWithFacilities: async (params: {
    text: string;
    location: string;
    patient_id?: string;
    coordinates?: { latitude: number; longitude: number };
  }): Promise<ApiResponse<ReferralNote>> => {
    const response = await api.post<ApiResponse<ReferralNote>>('/triage/complete', params);
    return response.data;
  },

  // Get supported languages
  getSupportedLanguages: async (): Promise<ApiResponse<Record<string, string>>> => {
    const response = await api.get<ApiResponse<Record<string, string>>>('/voice/languages');
    return response.data;
  },

  // Get model information
  getModelInfo: async (): Promise<ApiResponse<{
    whisper: { model: string; supported_languages: number };
    groq: any;
  }>> => {
    const response = await api.get<ApiResponse<any>>('/info/models');
    return response.data;
  },

  // Health check
  healthCheck: async (): Promise<ApiResponse<{ status: string; timestamp: string }>> => {
    const response = await api.get<ApiResponse<any>>('/health');
    return response.data;
  }
};

// Geolocation utilities
export const locationService = {
  // Get current position using browser geolocation API
  getCurrentPosition: (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          let message = 'Location access failed';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              message = 'Location request timed out';
              break;
          }
          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  },

  // Reverse geocoding (convert coordinates to address)
  reverseGeocode: async (latitude: number, longitude: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://api.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error('Failed to get address from coordinates');
      }
      
      const data = await response.json();
      return data.display_name || `${latitude}, ${longitude}`;
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return `${latitude}, ${longitude}`;
    }
  },

  // Forward geocoding (convert address to coordinates) 
  geocode: async (address: string): Promise<{ latitude: number; longitude: number } | null> => {
    try {
      const response = await fetch(
        `https://api.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      
      if (!response.ok) {
        throw new Error('Failed to geocode address');
      }
      
      const data = await response.json();
      if (data && data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon)
        };
      }
      
      return null;
    } catch (error) {
      console.error('Geocoding failed:', error);
      return null;
    }
  }
};

export default api;
