import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Mic, MapPin, AlertCircle, Globe, Activity, Shield, Clock, Search, ChevronRight, Languages, Stethoscope, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export function LandingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const steps = [
    {
      number: '1',
      title: t('landing.step1Title'),
      description: t('landing.step1Desc'),
    },
    {
      number: '2',
      title: t('landing.step2Title'),
      description: t('landing.step2Desc'),
    },
    {
      number: '3',
      title: t('landing.step3Title'),
      description: t('landing.step3Desc'),
    },
  ];

  const features = [
    {
      icon: Languages,
      title: t('landing.features.multilingual'),
      description: t('landing.features.multilingualDesc'),
    },
    {
      icon: Stethoscope,
      title: t('landing.features.clinical'),
      description: t('landing.features.clinicalDesc'),
    },
    {
      icon: Search,
      title: t('landing.features.locator'),
      description: t('landing.features.locatorDesc'),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cyan-50/50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                {t('landing.trustBadge')}
              </div>

              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                {t('landing.title')}<br />
                <span className="text-cyan-600 dark:text-cyan-400">{t('landing.titleHighlight')}</span>
              </h1>
              
              {/* Tagline Text */}
              <p className="text-2xl sm:text-3xl text-slate-700 dark:text-slate-300 font-medium mb-6" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                {t('landing.tagline')}
              </p>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
                {t('landing.description')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-6 rounded-xl text-base shadow-lg shadow-cyan-500/20"
                    onClick={() => navigate('/triage')}
                  >
                    {t('landing.startTriage')}
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-semibold px-8 py-6 rounded-xl text-base border-slate-300 dark:border-slate-700"
                    onClick={() => navigate('/facilities')}
                  >
                    {t('landing.findHospitals')}
                  </Button>
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>{t('landing.securePrivate')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  <span>{t('landing.languagesSupported')}</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-3xl overflow-hidden aspect-[4/3] flex items-center justify-center">
                {/* Placeholder for hero image */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                    <Activity className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                {/* Voice Transcription Card Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
                      <Mic className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{t('landing.voiceTranscriptionActive')}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs italic">"{t('landing.voiceSample')}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              {t('landing.howItWorks')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {t('landing.howItWorksDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-cyan-200 dark:bg-cyan-800" />
                )}
                
                {/* Number Circle */}
                <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-600 text-white font-bold text-lg mb-4 z-10">
                  {step.number}
                </div>
                
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for India's Healthcare Section */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {t('landing.builtForIndia')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {t('landing.builtForIndiaDesc')}
              </p>
            </div>
            <button className="text-cyan-600 dark:text-cyan-400 font-medium text-sm hover:underline underline-offset-2 flex items-center gap-1">
              {t('landing.viewSettings')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-4">
                      <feature.icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Cards Section */}
      <section className="py-8 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hospital Finder Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              className="cursor-pointer"
              onClick={() => navigate('/facilities')}
            >
              <div className="bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 h-full flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-red-700 dark:text-red-400 text-lg mb-1">
                    {t('landing.hospitalFinder')}
                  </h3>
                  <p className="text-red-600/80 dark:text-red-400/70 text-sm mb-3">
                    {t('landing.hospitalFinderDesc')}
                  </p>
                  <button className="text-red-600 dark:text-red-400 font-semibold text-sm uppercase tracking-wide flex items-center gap-1 hover:underline">
                    {t('landing.browseMap')}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/50 dark:bg-white/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </motion.div>

            {/* Report History Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              className="cursor-pointer"
              onClick={() => navigate('/history')}
            >
              <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-full flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                    {t('landing.reportHistory')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                    {t('landing.reportHistoryDesc')}
                  </p>
                  <button className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm uppercase tracking-wide flex items-center gap-1 hover:underline">
                    {t('landing.viewHistory')}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Critical Emergency Banner */}
      <section className="py-8 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-800 dark:bg-slate-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="font-bold text-red-400 uppercase tracking-wide text-sm mb-1">
                    {t('landing.criticalEmergency')}
                  </h3>
                  <p className="text-slate-300 text-sm">
                    {t('landing.criticalEmergencyDesc')}
                  </p>
                </div>
              </div>
              <a href="tel:108">
                <Button className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-5 rounded-xl whitespace-nowrap shadow-lg shadow-red-500/20">
                  <Phone className="w-4 h-4 mr-2" />
                  {t('landing.call108Now')}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Disclaimer Banner */}
      <section className="bg-slate-900 dark:bg-black py-4">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-center text-slate-400 text-xs uppercase tracking-wider">
            <AlertCircle className="w-3 h-3 inline mr-2" />
            {t('landing.bottomDisclaimer')}
          </p>
        </div>
      </section>
    </div>
  );
}
