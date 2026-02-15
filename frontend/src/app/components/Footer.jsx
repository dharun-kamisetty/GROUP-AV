import { useTranslation } from 'react-i18next';
import { Activity, HelpCircle, Bell } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span>{t('footer.copyright', { year: currentYear })}</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">|</span>
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {t('footer.medicalDisclaimer')}
            </a>
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {t('footer.privacyPolicy')}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t('footer.systemOnline')}
            </div>
            <button className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              <HelpCircle className="w-4 h-4" />
              {t('footer.help')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
