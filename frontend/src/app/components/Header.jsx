import { AlertTriangle, Globe, ArrowLeft, Sun, Moon, Activity, Clock, Settings, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { SUPPORTED_LANGUAGES } from '../i18n';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

export function Header({ urgencyScore, emergencyDetected }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const canGoBack = location.pathname !== '/' && location.pathname !== '/triage';

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === i18n.language);

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            {canGoBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="mr-1"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => navigate('/')}
              role="button"
              tabIndex={0}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-800 dark:text-white">
                Arovia Health Desk
              </span>
            </div>
          </div>

          {/* Center: Emergency 108 Button */}
          <div className="hidden sm:flex items-center">
            <a href="tel:108">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-full px-6 py-2 shadow-md shadow-red-500/20 flex items-center gap-2"
                >
                  <span className="text-white text-lg">📞</span>
                  {t('header.emergency108')}
                </Button>
              </motion.div>
            </a>
          </div>

          {/* Right: Utility Cluster */}
          <div className="flex items-center gap-1">
            {/* Urgency indicator (when active) */}
            {emergencyDetected && (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="mr-2"
              >
                <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-full border border-red-200 dark:border-red-800">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span className="font-semibold text-xs">{t('header.emergency')}</span>
                </div>
              </motion.div>
            )}

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 text-slate-600 dark:text-slate-300">
                  <Globe className="w-4 h-4" />
                  <span className="hidden md:inline text-sm">
                    {currentLang?.name || 'English'} ({currentLang?.region || 'IN'})
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={i18n.language === lang.code ? 'bg-cyan-50 dark:bg-cyan-900/30 font-semibold text-cyan-700 dark:text-cyan-400' : ''}
                  >
                    {lang.nativeName} ({lang.name})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* History */}
            <Button
              variant="ghost"
              size="sm"
              className="w-9 h-9 p-0 text-slate-500 dark:text-slate-400"
              onClick={() => navigate('/history')}
              title="Report History"
            >
              <Clock className="w-4 h-4" />
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0 text-slate-500 dark:text-slate-400"
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-yellow-500" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* User Avatar */}
            <Button
              variant="ghost"
              size="sm"
              className="w-9 h-9 p-0 ml-1"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </Button>

            {/* Mobile Emergency Button */}
            <a href="tel:108" className="sm:hidden ml-1">
              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-full px-3"
              >
                📞 108
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
