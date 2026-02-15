import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { 
  Mic, 
  RotateCcw, 
  ArrowRight, 
  Loader2,
  Shield,
  Languages,
  ChevronRight
} from 'lucide-react';
import { VOICE_LANGUAGES } from '../i18n';
import { analyzeSymptoms } from '../utils/mockData';
import { toast } from 'sonner';
import { motion } from 'motion/react';

const LANGUAGE_OPTIONS = [
  { code: 'hi-IN', name: 'Hindi', native: 'हिंदी' },
  { code: 'bn-IN', name: 'Bengali', native: 'Bengali' },
  { code: 'mr-IN', name: 'Marathi', native: 'Marathi' },
  { code: 'te-IN', name: 'Telugu', native: 'Telugu' },
  { code: 'ta-IN', name: 'Tamil', native: 'Tamil' },
  { code: 'gu-IN', name: 'Gujarati', native: 'Gujarati' },
  { code: 'ur-IN', name: 'Urdu', native: 'Urdu' },
  { code: 'kn-IN', name: 'Kannada', native: 'Kannada' },
  { code: 'or-IN', name: 'Odia', native: 'Odia' },
  { code: 'ml-IN', name: 'Malayalam', native: 'Malayalam' },
];

export function VoiceInput() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(true); // Start in listening mode
  const [transcription, setTranscription] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('hi-IN');
  const [processing, setProcessing] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscription(prev => prev + finalTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        // Auto-restart if still in recording mode
        if (isRecording && recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch (e) {
            // Ignore if already started
          }
        }
      };

      // Auto-start recording
      startRecording();
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current) {
      toast.error('Voice recording is not supported in this browser');
      return;
    }

    setTranscription('');
    recognitionRef.current.lang = selectedLanguage;
    try {
      recognitionRef.current.start();
      setIsRecording(true);
    } catch (e) {
      // Already started
    }
  };

  const handleReset = () => {
    setTranscription('');
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setTimeout(() => startRecording(), 100);
    }
  };

  const handleLanguageChange = (code) => {
    setSelectedLanguage(code);
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      recognitionRef.current.lang = code;
      setTimeout(() => {
        try {
          recognitionRef.current.start();
        } catch (e) {
          // Ignore
        }
      }, 100);
    }
  };

  const handleSubmit = async () => {
    if (!transcription.trim()) {
      toast.error('No transcription available. Please speak your symptoms.');
      return;
    }

    setProcessing(true);
    
    // Stop recording
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = analyzeSymptoms(transcription);
    
    setProcessing(false);
    
    navigate('/results', {
      state: { result, symptoms: transcription }
    });
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gradient-to-b from-cyan-50/50 to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-2xl mx-auto px-4 py-8">
        
        {/* Animated Mic Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            {/* Pulse rings */}
            {isRecording && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full bg-teal-400/20"
                  animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: 80, height: 80, left: -12, top: -12 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-teal-400/20"
                  animate={{ scale: [1, 2.2], opacity: [0.3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  style={{ width: 80, height: 80, left: -12, top: -12 }}
                />
              </>
            )}
            <div className="w-14 h-14 rounded-full bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
              <Mic className="w-7 h-7 text-white" />
            </div>
          </motion.div>
        </div>
        
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            {t('voice.title')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {t('voice.subtitle')}
          </p>
        </div>
        
        {/* Live Transcription Box */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 mb-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('voice.transcriptionTitle')}</span>
            </div>
            <span className="px-2.5 py-1 bg-teal-500 text-white text-xs font-semibold rounded-md">
              {t('voice.liveBadge')}
            </span>
          </div>
          
          {/* Transcription content */}
          <div className="min-h-[120px] mb-4">
            {transcription ? (
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {transcription}
              </p>
            ) : (
              <p className="text-slate-400 dark:text-slate-500 italic">
                {t('voice.transcriptionPlaceholder')}
              </p>
            )}
          </div>
          
          {/* Typing indicator */}
          {isRecording && (
            <div className="flex items-center gap-1">
              <motion.div
                className="w-2 h-2 bg-teal-500 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 bg-teal-500 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 bg-teal-500 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          )}
        </div>
        
        {/* Recording Language Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">{t('voice.recordingLanguage')}</span>
            </div>
            <button className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">
              More Languages...
            </button>
          </div>
          
          {/* Language Pills */}
          <div className="flex flex-wrap gap-2">
            {LANGUAGE_OPTIONS.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all
                  ${selectedLanguage === lang.code
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600'
                  }
                `}
              >
                {selectedLanguage === lang.code && (
                  <span className="inline-flex items-center gap-1">
                    {lang.name}
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  </span>
                )}
                {selectedLanguage !== lang.code && lang.name}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          {/* Reset Recording */}
          <button
            onClick={handleReset}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            {t('voice.resetRecording')}
          </button>
          
          {/* Confirm & Analyze */}
          <motion.button
            onClick={handleSubmit}
            disabled={processing || !transcription.trim()}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex-[2] flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white bg-teal-500 hover:bg-teal-600 shadow-lg shadow-teal-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('voice.processing')}
              </>
            ) : (
              <>
                <span className="w-5 h-5 rounded-full border-2 border-white/50 flex items-center justify-center">
                  <span className="w-2 h-2 bg-white rounded-full" />
                </span>
                {t('voice.confirmAnalyze')}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
        
        {/* Privacy Note */}
        <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{t('voice.privacyNote')}:</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('voice.privacyDesc')}
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
