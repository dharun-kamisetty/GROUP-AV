import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all locales
import { en } from './locales/en';
import { hi } from './locales/hi';
import { bn } from './locales/bn';
import { te } from './locales/te';
import { mr } from './locales/mr';
import { ta } from './locales/ta';
import { gu } from './locales/gu';
import { kn } from './locales/kn';
import { ml } from './locales/ml';
import { pa } from './locales/pa';
import { or } from './locales/or';
import { ur } from './locales/ur';
import { es } from './locales/es';

const bridge = (locale) => {
    const trans = locale.translation || {};
    const l = trans.landing || {};
    const tf = trans.triageForm || {};
    const vi = trans.voiceInput || {};
    const r = trans.results || {};
    const f = trans.facilities || {};
    const d = trans.disclaimer || {};
    const s = trans.settings || {};

    return {
        translation: {
            ...trans,
            appName: trans.appName || trans.title || "Arovia Health Desk",
            header: {
                ...trans.header,
                emergency: trans.header?.emergency || r.emergencyTitle || "EMERGENCY",
                emergency108: trans.header?.emergency108 || r.emergencyCall || "EMERGENCY 108",
                urgency: trans.header?.urgency || r.urgencyScore || "Urgency Score",
                changeLanguage: trans.header?.changeLanguage || "Language"
            },
            landing: {
                ...l,
                trustBadge: l.badge || l.trustBadge || "Trusted by 1M+ Indians",
                title: l.heroTitle || l.title || "Your Health,",
                titleHighlight: l.titleHighlight || "Simplified.",
                tagline: l.heroSubtitle || l.tagline || "Right advice, at the right time.",
                description: l.heroSubtitle || l.description || "AI-powered medical triage supporting 22 Indian languages. Describe your symptoms via text or voice and get an immediate urgency assessment.",
                startTriage: l.startButton || l.startTriage || "Start Free Triage",
                findHospitals: f.heading || l.findHospitals || "Find Hospitals",
                securePrivate: l.securePrivate || "100% Secure & Private",
                languagesSupported: l.languagesSupported || "22 Languages Supported",
                voiceTranscriptionActive: l.voiceTranscriptionActive || "Voice Transcription Active",
                voiceSample: l.voiceSample || "I have a sharp pain in my upper abdomen...",
                voiceAssistant: trans.dashboard?.voice_assistant || l.voiceAssistant || "Voice Assistant",
                howItWorks: l.featuresTitle || l.howItWorks || "How Arovia Works",
                howItWorksDesc: l.featuresSubtitle || l.howItWorksDesc || "Three simple steps to get medical guidance.",
                step1Title: l.step1Title || l.feature3Title || "Speak or Type",
                step1Desc: l.step1Desc || l.feature3Desc || "Tell us what you're feeling in your native language. We support text and voice.",
                step2Title: l.step2Title || l.feature1Title || "AI Analysis",
                step2Desc: l.step2Desc || l.feature1Desc || "Our clinical AI assesses your symptoms against medical protocols for Indian health needs.",
                step3Title: l.step3Title || l.feature5Title || l.feature4Title || "Actionable Guidance",
                step3Desc: l.step3Desc || l.feature5Desc || l.feature4Desc || "Receive an urgency score and find the best nearby facilities for treatment.",
                builtForIndia: l.builtForIndia || l.featuresTitle || "Built for India's Healthcare",
                builtForIndiaDesc: l.builtForIndiaDesc || l.featuresSubtitle || "Advanced technology localized for every citizen.",
                viewSettings: l.viewSettings || trans.nav?.settings || "View Settings & Accessibility",
                hospitalFinder: l.hospitalFinder || f.heading || "Hospital Finder",
                hospitalFinderDesc: l.hospitalFinderDesc || f.subheading || "Locate trauma centers and specialists near you.",
                browseMap: l.browseMap || f.viewOnMap || "Browse Map",
                reportHistory: l.reportHistory || trans.nav?.results || "Report History",
                reportHistoryDesc: l.reportHistoryDesc || "Access your previous triage results and notes.",
                viewHistory: l.viewHistory || "View History",
                criticalEmergency: r.emergencyTitle || l.criticalEmergency || "Critical Emergency?",
                criticalEmergencyDesc: d.textFull || l.criticalEmergencyDesc || "If you are experiencing severe chest pain, heavy bleeding, or difficulty breathing, do not wait for triage results. Call 108 immediately or go to the nearest emergency room.",
                call108Now: r.emergencyCall || l.call108Now || "CALL 108 NOW",
                bottomDisclaimer: d.textShort || l.bottomDisclaimer || "Important: This is a triage tool, not a diagnosis. In emergencies, call 108.",
                features: {
                    ...l.features,
                    multilingual: l.features?.multilingual || l.feature3Title || "Multilingual Support",
                    multilingualDesc: l.features?.multilingualDesc || l.feature3Desc || "Input symptoms in 22+ languages.",
                    clinical: l.features?.clinical || l.feature1Title || "Clinical Precision",
                    clinicalDesc: l.features?.clinicalDesc || l.feature1Desc || "Triage logic tuned to prioritize red flags.",
                    locator: l.features?.locator || l.feature4Title || "Facility Locator",
                    locatorDesc: l.features?.locatorDesc || l.feature4Desc || "Instantly find specialized hospitals."
                }
            },
            footer: {
                ...trans.footer,
                copyright: l.footerCopyright || trans.footer?.copyright || "© {{year}} Arovia Health Desk",
                medicalDisclaimer: trans.footer?.medicalDisclaimer || l.footerPrivacy || "Medical Disclaimer",
                privacyPolicy: trans.footer?.privacyPolicy || l.footerPrivacy || "Privacy Policy",
                systemOnline: trans.footer?.systemOnline || "AI Triage System Online",
                help: trans.footer?.help || "Help"
            },
            facilities: {
                ...f,
                title: f.title || f.heading || "Nearby Healthcare Facilities",
                searchPlaceholder: f.searchPlaceholder || "Search hospitals, clinics...",
                call: f.call || "Call",
                whatsapp: f.whatsapp || "WhatsApp",
                directions: f.directions || f.directionsButton || "Directions",
                go: f.go || "Go",
                distance: "Distance",
                distanceUnit: "km away",
                resultsCount: "{{count}} Results",
                openNow: f.openNow || f.openingHours || "Open Now",
                yourLocation: f.yourLocation || f.locationLabel || "Your Location",
                emergencyAlert: r.emergencyCall || "Emergency detected - Showing emergency facilities first. Call 108 immediately!",
                noFacilities: "No facilities found. Try adjusting your search or filter."
            },
            triage: {
                ...trans.triage,
                title: trans.triage?.title || tf.heading || "Describe your symptoms",
                subtitle: trans.triage?.subtitle || tf.subheading || "Tell us how you're feeling for an accurate assessment.",
                mainConcernLabel: trans.triage?.mainConcernLabel || tf.symptomsLabel || "What is the main concern?",
                mainConcernPlaceholder: trans.triage?.mainConcernPlaceholder || tf.symptomsPlaceholder || "e.g. Sharp stomach pain",
                detailsLabel: trans.triage?.detailsLabel || "Details (Severity, duration, context)",
                detailsPlaceholder: trans.triage?.detailsPlaceholder || tf.symptomsHint || "Describe when it started...",
                submitButton: trans.triage?.submitButton || tf.submitButton || "Analyze Symptoms",
                breadcrumbHome: trans.triage?.breadcrumbHome || "Home",
                breadcrumbSymptom: trans.triage?.breadcrumbSymptom || tf.heading || "Symptom Assessment",
                emergencyWarningTitle: r.emergencyTitle || "Not for Emergencies",
                emergencyWarningDesc: r.criticalEmergencyDesc || d.textShort || "In emergencies, call 108 immediately.",
                switchToVoice: trans.triage?.switchToVoice || vi.heading || "Switch to Voice Input",
                textMode: trans.triage?.textMode || "Text Mode",
                transcriptionPreview: "# TRANSCRIPTION PREVIEW",
                transcriptionLive: "Live",
                transcriptionHint: vi.transcriptionPlaceholder || "Your speech will appear here...",
                locationServicesTitle: f.heading || "Location Services",
                locationServicesDesc: f.subheading || "Share your location to find hospitals.",
                locationDetecting: tf.loadingTitle || "Detecting...",
                locationPlaceholder: f.searchPlaceholder || "Enter city name...",
                locationSave: f.saveButton || "Save",
                locationChange: "Change",
                privacyProtected: "Privacy Protected",
                aiAssisted: "AI-Assisted Analysis",
                infoCompleteTitle: tf.heading || "Be Complete & Specific",
                infoCompleteDesc: tf.symptomsHint || "Include all relevant symptoms.",
                infoMultilingualTitle: l.feature3Title || "Multilingual Support",
                infoMultilingualDesc: l.feature3Desc || "Our AI understands 22+ Indian languages."
            },
            voice: {
                ...trans.voice,
                title: trans.voice?.title || vi.heading || "Listening to you...",
                subtitle: trans.voice?.subtitle || vi.subheading || "Please describe your symptoms in detail.",
                transcriptionTitle: trans.voice?.transcriptionTitle || "# Live Transcription",
                liveBadge: trans.voice?.liveBadge || "LIVE",
                transcriptionPlaceholder: trans.voice?.transcriptionPlaceholder || vi.transcriptionPlaceholder || "Your speech will appear here...",
                recordingLanguage: trans.voice?.recordingLanguage || vi.selectLanguage || "Recording language:",
                resetRecording: trans.voice?.resetRecording || vi.backButton || "Reset Recording",
                confirmAnalyze: trans.voice?.confirmAnalyze || vi.submitButton || "Confirm & Analyze Symptoms",
                processing: trans.voice?.processing || vi.processingButton || "Processing...",
                privacyNote: trans.voice?.privacyNote || trans.landing?.footerPrivacy || "Privacy Note",
                privacyDesc: trans.voice?.privacyDesc || "Your voice data is processed securely and is never stored.",
                moreLanguages: "More Languages..."
            },
            results: {
                ...trans.results,
                title: trans.results?.title || r.heading || "Triage Results",
                urgencyLevel: trans.results?.urgencyLevel || r.urgencyScore || "Urgency Level",
                urgencyScore: "Urgency Score",
                redFlags: trans.results?.redFlags || r.redFlagsTitle || "Red Flags",
                recommendations: trans.results?.recommendations || r.recommendations || "Recommendations",
                downloadNote: trans.results?.downloadNote || r.downloadButton || "Download Referral Note",
                findFacilities: trans.results?.findFacilities || r.nearbyFacilities || "Find Nearby Facilities",
                newTriage: trans.results?.newTriage || r.newAssessment || "New Triage",
                immediate: trans.results?.immediate || "Immediate",
                urgent: trans.results?.urgent || "Urgent",
                standard: trans.results?.standard || "Standard",
                yes: trans.results?.yes || "Yes",
                no: trans.results?.no || "No",
                critical: "Critical",
                high: "High",
                moderate: "Moderate",
                low: "Low",
                call108: trans.results?.emergencyCall || "⚠️ CALL 108 IMMEDIATELY",
                nearestER: trans.results?.emergencyTip3 || "Go to the nearest emergency department",
                noDrive: trans.results?.emergencyTip1 || "Do not drive yourself",
                seek2_4: "Seek medical attention within 2-4 hours",
                visitUrgent: "Visit emergency department or urgent care",
                monitorClose: "Monitor symptoms closely",
                schedule24_48: "Schedule a doctor appointment within 24-48 hours",
                monitorWorsen: "Monitor symptoms and seek care if worsening",
                restHydrate: "Rest and stay hydrated",
                selfCare: "Self-care may be appropriate",
                regularVisit: "Schedule regular doctor visit if symptoms persist",
                recommendedSpecialty: r.recommendedSpecialty || r.specialty || "Recommended Specialty",
                yourSymptoms: tf.symptomsLabel || "Your Symptoms",
                score: r.urgencyScore || "Score"
            },
            disclaimer: {
                ...trans.disclaimer,
                title: trans.disclaimer?.title || "Medical Disclaimer",
                content: trans.disclaimer?.textFull || trans.disclaimer?.content,
                emergency: "If you think you may have a medical emergency, call 108 immediately.",
                agree: trans.disclaimer?.accept || trans.disclaimer?.agree || "I Understand & Continue",
                note1: "This tool uses AI to provide preliminary medical triage",
                note2: "Results are for informational purposes only",
                note3: "Always consult with a healthcare professional",
                note4: "In emergencies, call 108 immediately",
                note5: "Do not delay seeking professional medical care"
            },
            common: {
                ...trans.common,
                loading: trans.results?.loading || "Loading...",
                back: trans.common?.back || "Back",
                error: "Page not found"
            }
        }
    };
};

const resources = {
    en: bridge(en),
    hi: bridge(hi),
    bn: bridge(bn),
    te: bridge(te),
    mr: bridge(mr),
    ta: bridge(ta),
    gu: bridge(gu),
    kn: bridge(kn),
    ml: bridge(ml),
    pa: bridge(pa),
    or: bridge(or),
    ur: bridge(ur),
    es: bridge(es)
};

const storedLanguage = localStorage.getItem('appLanguage');
const bridgedResources = Object.keys(resources).reduce((acc, lang) => {
    acc[lang] = resources[lang]; // resources are already bridged
    return acc;
}, {});

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: bridgedResources,
        lng: storedLanguage || 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },
    });

// Persist language change to localStorage
i18n.on('languageChanged', (lng) => {
    localStorage.setItem('appLanguage', lng);
});

export const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളం' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' }
];

export const VOICE_LANGUAGES = [
    { code: 'en-IN', name: 'English', nativeName: 'English' },
    { code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'bn-IN', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'mr-IN', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളం' },
    { code: 'pa-IN', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'or-IN', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'ur-IN', name: 'Urdu', nativeName: 'اردو' }
];

export default i18n;

