import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import {
  Globe,
  Palette,
  Accessibility,
  Wifi,
  Check,
  Volume2,
  ChevronRight,
  Shield
} from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
];

const SETTINGS_TABS = [
  { id: 'language', label: 'Language & Regional', icon: Globe },
  { id: 'appearance', label: 'Appearance & Themes', icon: Palette },
  { id: 'accessibility', label: 'Accessibility Controls', icon: Accessibility },
  { id: 'system', label: 'System & Offline', icon: Wifi },
];

function LanguageCard({ language, isSelected, onClick, showIndicator = true }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200
        ${isSelected 
          ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' 
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-300 dark:hover:border-teal-600'
        }
      `}
    >
      {/* Selected indicator */}
      {isSelected && showIndicator && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
      
      {/* Native name (large) */}
      <span className={`text-lg font-semibold mb-1 ${
        isSelected ? 'text-teal-600 dark:text-teal-400' : 'text-slate-800 dark:text-slate-200'
      }`}>
        {language.native}
      </span>
      
      {/* English name (small) */}
      <span className="text-xs text-slate-500 dark:text-slate-400">
        {language.name}
      </span>
    </motion.button>
  );
}

function LanguageSection({ title, subtitle, icon: Icon, languages, selectedCode, onSelect, indicatorLabel }) {
  return (
    <div className="mb-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />}
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>
        </div>
        
        {/* Current selection indicator */}
        <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <span className="text-sm text-slate-600 dark:text-slate-300">{indicatorLabel}</span>
        </div>
      </div>
      
      {/* Language grid */}
      <div className="grid grid-cols-3 gap-3">
        {languages.map((lang) => (
          <LanguageCard
            key={lang.code}
            language={lang}
            isSelected={selectedCode === lang.code}
            onClick={() => onSelect(lang.code)}
          />
        ))}
      </div>
    </div>
  );
}

export function Settings() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('language');
  const [appLanguage, setAppLanguage] = useState(i18n.language || 'en');
  const [voiceLanguage, setVoiceLanguage] = useState(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('voiceLanguage') || 'hi' : 'hi';
  });
  const [hasChanges, setHasChanges] = useState(false);

  // Load stored preferences on mount
  useEffect(() => {
    const storedAppLang = localStorage.getItem('appLanguage');
    if (storedAppLang) {
      setAppLanguage(storedAppLang);
    }
  }, []);

  const handleAppLanguageChange = (code) => {
    setAppLanguage(code);
    // Apply language change immediately
    i18n.changeLanguage(code);
    setHasChanges(true);
  };

  const handleVoiceLanguageChange = (code) => {
    setVoiceLanguage(code);
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    // Apply app language change
    i18n.changeLanguage(appLanguage);
    
    // Store voice language preference
    localStorage.setItem('voiceLanguage', voiceLanguage);
    localStorage.setItem('appLanguage', appLanguage);
    
    setHasChanges(false);
  };

  const handleResetDefaults = () => {
    setAppLanguage('en');
    setVoiceLanguage('en');
    setHasChanges(true);
  };

  const getLanguageName = (code) => {
    return LANGUAGES.find(l => l.code === code)?.name || code;
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            {/* Settings header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">⚙️</span>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t('settings.title')}</h1>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 ml-7">
                {t('settings.subtitle')}
              </p>
            </div>
            
            {/* Navigation tabs */}
            <nav className="space-y-1">
              {SETTINGS_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ x: isActive ? 0 : 4 }}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200
                      ${isActive 
                        ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </motion.button>
                );
              })}
            </nav>
            
            {/* A11Y Compliant badge */}
            <div className="mt-auto pt-8">
              <div className="flex items-start gap-2 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                <Shield className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-teal-700 dark:text-teal-400">{t('settings.a11yCompliant')}</p>
                  <p className="text-xs text-teal-600 dark:text-teal-500 mt-1">
                    {t('settings.a11yDesc')}
                  </p>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Main content */}
          <main className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            {activeTab === 'language' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Page header */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                    Language Preferences
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400">
                    Select your preferred languages for the interface and voice diagnostic features.
                  </p>
                </div>
                
                {/* App Interface Language */}
                <LanguageSection
                  title={t('settings.appInterfaceLanguage')}
                  subtitle={t('settings.appInterfaceDesc')}
                  icon={Globe}
                  languages={LANGUAGES}
                  selectedCode={appLanguage}
                  onSelect={handleAppLanguageChange}
                  indicatorLabel={getLanguageName(appLanguage)}
                />
                
                {/* Voice Input Language */}
                <LanguageSection
                  title={t('settings.voiceInputLanguage')}
                  subtitle={t('settings.voiceInputDesc')}
                  icon={Volume2}
                  languages={LANGUAGES}
                  selectedCode={voiceLanguage}
                  onSelect={handleVoiceLanguageChange}
                  indicatorLabel={getLanguageName(voiceLanguage)}
                />
                
                {/* Action buttons */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={handleResetDefaults}
                    className="px-6 py-2.5 rounded-xl font-medium text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {t('settings.resetDefaults')}
                  </button>
                  <motion.button
                    onClick={handleSaveChanges}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      px-6 py-2.5 rounded-xl font-medium transition-all
                      ${hasChanges
                        ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-500/25'
                        : 'bg-teal-500 text-white opacity-80'
                      }
                    `}
                  >
                    {t('settings.saveChanges')}
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'appearance' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                    Appearance & Themes
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400">
                    Customize the look and feel of your app experience.
                  </p>
                </div>
                
                <div className="flex items-center justify-center h-64 text-slate-400 dark:text-slate-600">
                  <div className="text-center">
                    <Palette className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Theme settings coming soon</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'accessibility' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                    Accessibility Controls
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400">
                    Configure accessibility settings for enhanced usability.
                  </p>
                </div>
                
                <div className="flex items-center justify-center h-64 text-slate-400 dark:text-slate-600">
                  <div className="text-center">
                    <Accessibility className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Accessibility settings coming soon</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'system' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                    System & Offline
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400">
                    Manage offline mode and system preferences.
                  </p>
                </div>
                
                <div className="flex items-center justify-center h-64 text-slate-400 dark:text-slate-600">
                  <div className="text-center">
                    <Wifi className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>System settings coming soon</p>
                  </div>
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Settings;
