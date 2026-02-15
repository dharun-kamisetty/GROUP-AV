import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Download, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Home,
  Phone
} from 'lucide-react';
import { downloadReferralNote } from '../utils/download';
import { motion } from 'motion/react';

export function Results() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { result, symptoms } = location.state || {};

  if (!result || !symptoms) {
    navigate('/triage');
    return null;
  }

  const getUrgencyColor = (level) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const handleDownload = () => {
    downloadReferralNote(result, symptoms);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/20 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-cyan-400/10 dark:bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/10 dark:bg-teal-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {result.emergencyDetected && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 animate-pulse"></div>
              <Alert className="bg-gradient-to-r from-red-600 to-red-500 border-red-700 border-2 shadow-2xl relative rounded-xl">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <AlertTriangle className="h-8 w-8 text-white" />
                  </motion.div>
                  <AlertDescription className="text-white font-bold text-lg">
                    EMERGENCY DETECTED - Please call 108 immediately or visit the nearest emergency department!
                  </AlertDescription>
                </div>
              </Alert>
            </div>
            <div className="mt-4 flex gap-3">
              <a href="tel:108" className="flex-1">
                <Button variant="destructive" size="lg" className="w-full text-lg bg-red-600 hover:bg-red-700 shadow-lg rounded-xl">
                  <Phone className="w-5 h-5 mr-2" />
                  Call 108 Now
                </Button>
              </a>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/facilities', { state: { result, symptoms } })}
                className="flex-1 border-2 border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Find Emergency Room
              </Button>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-6 bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl border-white/50 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
            <CardHeader>
              <CardTitle className="text-2xl text-center bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent font-bold">
                {t('results.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Urgency Level */}
              <div>
                <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">
                  {t('results.urgencyLevel')}
                </h3>
                <div className="flex items-center gap-4">
                  <Badge
                    className={`px-6 py-3 text-lg font-bold rounded-xl ${getUrgencyColor(result.urgencyLevel)}`}
                  >
                    {result.urgencyLevel}
                  </Badge>
                  <div className="flex-1">
                    <div className="flex gap-1">
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className={`flex-1 h-8 rounded-md ${
                            i < result.urgencyScore
                              ? result.urgencyScore >= 8
                                ? 'bg-gradient-to-t from-red-600 to-red-400'
                                : result.urgencyScore >= 6
                                ? 'bg-gradient-to-t from-orange-600 to-orange-400'
                                : 'bg-gradient-to-t from-yellow-600 to-yellow-400'
                              : 'bg-slate-200 dark:bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Score: {result.urgencyScore}/10
                    </p>
                  </div>
                </div>
              </div>

              {/* Red Flags */}
              {result.redFlags && result.redFlags.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    {t('results.redFlags')}
                  </h3>
                  <ul className="space-y-2">
                    {result.redFlags.map((flag, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-start gap-2 p-3 bg-red-50/80 dark:bg-red-900/15 rounded-xl border border-red-200/50 dark:border-red-800/30"
                      >
                        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-red-800 dark:text-red-400 capitalize">{flag}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">
                  {t('results.recommendations')}
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-2 p-3 bg-cyan-50/80 dark:bg-cyan-900/15 rounded-xl border border-cyan-200/50 dark:border-cyan-800/30"
                    >
                      <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-cyan-800 dark:text-cyan-300">{rec}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Specialty */}
              {result.specialtyRecommended && (
                <div className="p-4 bg-violet-50/80 dark:bg-violet-900/15 rounded-xl border border-violet-200/50 dark:border-violet-800/30">
                  <p className="text-sm text-violet-800 dark:text-violet-300">
                    <strong>Recommended Specialty:</strong> {result.specialtyRecommended}
                  </p>
                </div>
              )}

              {/* Symptoms Summary */}
              <div>
                <h3 className="font-semibold mb-2 text-slate-800 dark:text-slate-200">Your Symptoms:</h3>
                <p className="text-slate-700 dark:text-slate-300 p-4 bg-slate-100/80 dark:bg-slate-900/40 rounded-xl border border-slate-200/50 dark:border-slate-700/40">
                  {symptoms}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="w-full py-6 rounded-xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/40 hover:bg-white/80 dark:hover:bg-slate-700/40 transition-all"
            >
              <Download className="w-5 h-5 mr-2" />
              {t('results.downloadNote')}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => navigate('/facilities', { state: { result, symptoms } })}
              className="w-full py-6 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all text-white"
            >
              <MapPin className="w-5 h-5 mr-2" />
              {t('results.findFacilities')}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => navigate('/triage')}
              variant="outline"
              className="w-full py-6 rounded-xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/40 hover:bg-white/80 dark:hover:bg-slate-700/40 transition-all"
            >
              <Home className="w-5 h-5 mr-2" />
              {t('results.newTriage')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
