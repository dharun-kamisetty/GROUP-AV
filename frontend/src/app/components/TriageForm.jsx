import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router';
import { 
  AlertTriangle, 
  FileText, 
  Mic, 
  MapPin, 
  Loader2, 
  ArrowRight,
  Shield,
  Sparkles,
  Languages,
  ChevronRight
} from 'lucide-react';
import { analyzeSymptoms, getUserLocation } from '../utils/mockData';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function TriageForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mainConcern, setMainConcern] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [inputMode, setInputMode] = useState('text'); // 'text' or 'voice'
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [locationInput, setLocationInput] = useState('');

  useEffect(() => {
    // Try to get location on mount
    handleEnableLocation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const symptoms = `${mainConcern}. ${details}`.trim();
    
    if (!mainConcern.trim()) {
      toast.error('Please describe your main concern');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = analyzeSymptoms(symptoms);
    
    setLoading(false);
    
    // Navigate to results with state
    navigate('/results', {
      state: { result, symptoms }
    });
  };

  const handleEnableLocation = async () => {
    try {
      const location = await getUserLocation();
      setLocationEnabled(true);
      setLocationName('Indore, MP (Detected)');
      setLocationInput('Indore, MP');
      console.log('User location:', location);
    } catch (error) {
      setLocationEnabled(true);
      setLocationName('Location unavailable');
      setLocationInput('');
    }
  };

  const handleLocationChange = () => {
    setIsEditingLocation(true);
  };

  const handleLocationSave = () => {
    if (locationInput.trim()) {
      setLocationName(locationInput.trim());
      setLocationEnabled(true);
    }
    setIsEditingLocation(false);
  };

  const handleLocationKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLocationSave();
    } else if (e.key === 'Escape') {
      setIsEditingLocation(false);
      setLocationInput(locationName.replace(' (Detected)', ''));
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-slate-50 dark:bg-slate-950">
      <div className="max-w-2xl mx-auto px-4 py-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">
            {t('triage.breadcrumbHome')}
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-slate-800 dark:text-slate-200 font-medium">{t('triage.breadcrumbSymptom')}</span>
        </nav>
        
        {/* Emergency Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-800/30 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-red-700 dark:text-red-400 mb-1">{t('triage.emergencyWarningTitle')}</h3>
              <p className="text-sm text-red-600 dark:text-red-400/80">
                {t('triage.emergencyWarningDesc')}
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            {t('triage.title')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {t('triage.subtitle')}
          </p>
        </div>
        
        {/* Input Mode Toggle */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setInputMode('text')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              inputMode === 'text'
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            {t('triage.textMode')}
          </button>
          <button
            onClick={() => navigate('/voice')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 border border-teal-300 dark:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all"
          >
            <Mic className="w-4 h-4" />
            {t('triage.switchToVoice')}
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Concern Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t('triage.mainConcernLabel')}
            </label>
            <input
              type="text"
              value={mainConcern}
              onChange={(e) => setMainConcern(e.target.value)}
              placeholder={t('triage.mainConcernPlaceholder')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
              disabled={loading}
            />
          </div>
          
          {/* Details Textarea */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t('triage.detailsLabel')}
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={t('triage.detailsPlaceholder')}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all resize-none"
              disabled={loading}
            />
          </div>
          
          {/* Transcription Preview Box */}
          <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800/40 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 tracking-wide">{t('triage.transcriptionPreview')}</span>
              </div>
              <span className="px-2 py-0.5 bg-teal-500 text-white text-xs font-medium rounded-md">{t('triage.transcriptionLive')}</span>
            </div>
            <p className="text-sm text-cyan-700 dark:text-cyan-400/80">
              {t('triage.transcriptionHint')}
            </p>
          </div>
          
          {/* Location Services Card */}
          <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">{t('triage.locationServicesTitle')}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('triage.locationServicesDesc')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {isEditingLocation ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      onKeyDown={handleLocationKeyDown}
                      placeholder={t('triage.locationPlaceholder')}
                      className="w-40 px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleLocationSave}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors"
                    >
                      {t('triage.locationSave')}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                      <MapPin className="w-3 h-3" />
                      <span>{locationName || t('triage.locationDetecting')}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleLocationChange}
                      className="text-xs text-teal-600 dark:text-teal-400 hover:underline"
                    >
                      {t('triage.locationChange')}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={loading || !mainConcern.trim()}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold text-lg shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('common.loading')}
              </>
            ) : (
              <>
                {t('triage.submitButton')}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
          
          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Shield className="w-4 h-4" />
              <span>{t('triage.privacyProtected')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Sparkles className="w-4 h-4" />
              <span>{t('triage.aiAssisted')}</span>
            </div>
          </div>
        </form>
        
        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {/* What happens next */}
          <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔬</span>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">{t('triage.infoCompleteTitle')}</h4>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('triage.infoCompleteDesc')}
            </p>
          </div>
          
          {/* Multilingual Support */}
          <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Languages className="w-5 h-5 text-amber-500" />
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">{t('triage.infoMultilingualTitle')}</h4>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('triage.infoMultilingualDesc')}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
