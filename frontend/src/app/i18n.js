import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Comprehensive translations for all pages
const resources = {
  en: {
    translation: {
      appName: "Arovia Health Desk",
      // Header
      header: {
        emergency: "EMERGENCY",
        emergency108: "EMERGENCY 108",
        urgency: "Urgency Score",
        changeLanguage: "Language"
      },
      // Landing Page
      landing: {
        trustBadge: "Trusted by 1M+ Indians",
        title: "Your Health,",
        titleHighlight: "Simplified.",
        tagline: "Right advice, at the right time.",
        description: "AI-powered medical triage supporting 22 Indian languages. Describe your symptoms via text or voice and get an immediate urgency assessment.",
        startTriage: "Start Free Triage",
        findHospitals: "Find Hospitals",
        securePrivate: "100% Secure & Private",
        languagesSupported: "22 Languages Supported",
        voiceTranscriptionActive: "Voice Transcription Active",
        voiceSample: "I have a sharp pain in my upper abdomen...",
        voiceAssistant: "Voice Assistant",
        stats: {
          languages: "Languages",
          availability: "Availability",
          users: "Users Served"
        },
        howItWorks: "How Arovia Works",
        howItWorksDesc: "Three simple steps to get medical guidance.",
        step1Title: "Speak or Type",
        step1Desc: "Tell us what you're feeling in your native language. We support text and voice.",
        step2Title: "AI Analysis",
        step2Desc: "Our clinical AI assesses your symptoms against medical protocols for Indian health needs.",
        step3Title: "Actionable Guidance",
        step3Desc: "Receive an urgency score and find the best nearby facilities for treatment.",
        features: {
          multilingual: "Multilingual Support",
          multilingualDesc: "Input symptoms in Hindi, Bengali, Tamil, Telugu, and 18 other Indian languages with real-time transcription.",
          clinical: "Clinical Precision",
          clinicalDesc: "Triage logic tuned to prioritize red flags and emergency symptoms for immediate life-saving actions.",
          locator: "Facility Locator",
          locatorDesc: "Instantly find specialized hospitals with click-to-call, WhatsApp contact, and direct map navigation."
        },
        builtForIndia: "Built for India's Healthcare",
        builtForIndiaDesc: "Advanced technology localized for every citizen.",
        viewSettings: "View Settings & Accessibility",
        hospitalFinder: "Hospital Finder",
        hospitalFinderDesc: "Locate trauma centers and specialists near you.",
        browseMap: "Browse Map",
        reportHistory: "Report History",
        reportHistoryDesc: "Access your previous triage results and notes.",
        viewHistory: "View History",
        criticalEmergency: "Critical Emergency?",
        criticalEmergencyDesc: "If you are experiencing severe chest pain, heavy bleeding, or difficulty breathing, do not wait for triage results. Call 108 immediately or go to the nearest emergency room.",
        call108Now: "CALL 108 NOW",
        bottomDisclaimer: "Important: This is a triage tool, not a diagnosis. In emergencies, call 108."
      },
      // Triage Form
      triage: {
        breadcrumbHome: "Home",
        breadcrumbSymptom: "Symptom Assessment",
        emergencyWarningTitle: "Not for Emergencies",
        emergencyWarningDesc: "If you are experiencing severe chest pain, difficulty breathing, or heavy bleeding, use the Emergency 108 button immediately.",
        title: "Describe your symptoms",
        subtitle: "Tell us how you're feeling. Be as detailed as possible for a more accurate triage.",
        textMode: "Text Mode",
        switchToVoice: "Switch to Voice Input",
        mainConcernLabel: "What is the main concern?",
        mainConcernPlaceholder: "e.g. Sharp stomach pain, High fever",
        detailsLabel: "Details (Severity, duration, context)",
        detailsPlaceholder: "Describe when it started and if anything makes it better or worse...",
        transcriptionPreview: "# TRANSCRIPTION PREVIEW",
        transcriptionLive: "Live",
        transcriptionHint: "The system will transcribe your voice input here in real-time if you switch to Voice Mode...",
        locationServicesTitle: "Location Services",
        locationServicesDesc: "Share your location to find the nearest specialized hospitals after your triage.",
        locationDetecting: "Detecting...",
        locationPlaceholder: "Enter city name...",
        locationSave: "Save",
        locationChange: "Change",
        submitButton: "Analyze Symptoms",
        privacyProtected: "Privacy Protected",
        aiAssisted: "AI-Assisted Analysis",
        infoCompleteTitle: "Be Complete & Specific",
        infoCompleteDesc: "Include all relevant symptoms, their duration, and any medications you're currently taking for the most accurate assessment.",
        infoMultilingualTitle: "Multilingual Support",
        infoMultilingualDesc: "Feel free to describe your symptoms in your native language. Our AI understands 22+ Indian languages."
      },
      // Voice Input
      voice: {
        title: "Listening to you...",
        subtitle: "Please describe your symptoms in detail. Mention when they started and how severe they are.",
        transcriptionTitle: "# Live Transcription",
        liveBadge: "LIVE",
        transcriptionPlaceholder: "Your speech will appear here...",
        recordingLanguage: "Recording language:",
        resetRecording: "Reset Recording",
        confirmAnalyze: "Confirm & Analyze Symptoms",
        privacyNote: "Privacy Note",
        privacyDesc: "Your voice data is processed securely and is never stored or shared with third parties. Only the resulting text is used for the triage.",
        selectLanguage: "Select Language",
        startRecording: "Start Recording",
        stopRecording: "Stop Recording",
        processing: "Processing...",
        useTranscription: "Use This Text"
      },
      // Results
      results: {
        title: "Triage Results",
        urgencyLevel: "Urgency Level",
        redFlags: "Red Flags",
        recommendations: "Recommendations",
        downloadNote: "Download Referral Note",
        findFacilities: "Find Nearby Facilities",
        newTriage: "New Triage",
        possibleCauses: "Possible Causes",
        homeRemedies: "Home Remedies",
        importantNotes: "Important Notes"
      },
      // Facilities
      facilities: {
        title: "Nearby Healthcare Facilities",
        searchPlaceholder: "Search hospitals, clinics...",
        filterAll: "All",
        filterTrauma: "Trauma",
        filterCardiology: "Cardiology",
        filterPediatrics: "Pediatrics",
        filterOncology: "Oncology",
        filterEmergency: "Emergency",
        filterNeurology: "Neurology",
        distance: "Distance",
        rating: "Rating",
        openNow: "Open Now",
        emergency24: "24/7 Emergency",
        call: "Call",
        whatsapp: "WhatsApp",
        directions: "Directions",
        viewDetails: "View Details",
        yourLocation: "Your Location"
      },
      // Settings
      settings: {
        title: "Settings",
        subtitle: "Configure your app experience",
        languageRegional: "Language & Regional",
        appearanceThemes: "Appearance & Themes",
        accessibilityControls: "Accessibility Controls",
        systemOffline: "System & Offline",
        appInterfaceLanguage: "App Interface Language",
        appInterfaceDesc: "Select the language for menus and text",
        voiceInputLanguage: "Voice Input Language",
        voiceInputDesc: "Choose the language for speech recognition",
        currentSelection: "Current: {{language}}",
        a11yCompliant: "A11Y COMPLIANT",
        a11yDesc: "Arovia Health Desk adheres to WCAG 2.1 standards for medical accessibility in India.",
        resetDefaults: "Reset Defaults",
        saveChanges: "Save All Changes"
      },
      // Footer
      footer: {
        copyright: "© {{year}} Arovia Health Desk",
        medicalDisclaimer: "Medical Disclaimer",
        privacyPolicy: "Privacy Policy",
        systemOnline: "AI Triage System Online",
        help: "Help"
      },
      // Disclaimer
      disclaimer: {
        title: "Medical Disclaimer",
        content: "This is an AI-powered medical triage tool for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
        emergency: "In case of emergency, immediately call 108 or visit the nearest emergency room.",
        agree: "I Understand"
      },
      // Common
      common: {
        loading: "Loading...",
        error: "An error occurred",
        retry: "Retry",
        close: "Close",
        back: "Back"
      }
    }
  },
  hi: {
    translation: {
      appName: "एरोविया हेल्थ डेस्क",
      header: {
        emergency: "आपातकालीन",
        emergency108: "आपातकालीन 108",
        urgency: "तत्कालता स्कोर",
        changeLanguage: "भाषा"
      },
      landing: {
        trustBadge: "10 लाख+ भारतीयों द्वारा विश्वसनीय",
        title: "आपका स्वास्थ्य,",
        titleHighlight: "सरल।",
        tagline: "सच्ची सलाह, सही समय पर।",
        description: "22 भारतीय भाषाओं का समर्थन करने वाला AI-संचालित मेडिकल ट्राइएज। टेक्स्ट या वॉयस के माध्यम से अपने लक्षणों का वर्णन करें और तत्काल तत्कालता मूल्यांकन प्राप्त करें।",
        startTriage: "मुफ्त ट्राइएज शुरू करें",
        findHospitals: "अस्पताल खोजें",
        securePrivate: "100% सुरक्षित और निजी",
        languagesSupported: "22 भाषाएं समर्थित",
        voiceTranscriptionActive: "वॉयस ट्रांसक्रिप्शन सक्रिय",
        voiceSample: "मुझे पेट के ऊपरी हिस्से में तेज दर्द है...",
        voiceAssistant: "वॉयस असिस्टेंट",
        stats: {
          languages: "भाषाएं",
          availability: "उपलब्धता",
          users: "सेवित उपयोगकर्ता"
        },
        howItWorks: "एरोविया कैसे काम करता है",
        howItWorksDesc: "चिकित्सा मार्गदर्शन प्राप्त करने के तीन सरल कदम।",
        step1Title: "बोलें या टाइप करें",
        step1Desc: "अपनी मातृभाषा में बताएं कि आप कैसा महसूस कर रहे हैं। हम टेक्स्ट और वॉयस का समर्थन करते हैं।",
        step2Title: "AI विश्लेषण",
        step2Desc: "हमारा क्लिनिकल AI भारतीय स्वास्थ्य आवश्यकताओं के लिए चिकित्सा प्रोटोकॉल के विरुद्ध आपके लक्षणों का आकलन करता है।",
        step3Title: "कार्रवाई योग्य मार्गदर्शन",
        step3Desc: "तत्कालता स्कोर प्राप्त करें और उपचार के लिए सर्वोत्तम निकटस्थ सुविधाएं खोजें।",
        features: {
          multilingual: "बहुभाषी समर्थन",
          multilingualDesc: "हिंदी, बंगाली, तमिल, तेलुगु और 18 अन्य भारतीय भाषाओं में रीयल-टाइम ट्रांसक्रिप्शन के साथ लक्षण इनपुट करें।",
          clinical: "क्लिनिकल सटीकता",
          clinicalDesc: "तत्काल जीवन-रक्षक कार्यों के लिए रेड फ्लैग और आपातकालीन लक्षणों को प्राथमिकता देने के लिए ट्राइएज लॉजिक।",
          locator: "सुविधा खोजक",
          locatorDesc: "क्लिक-टू-कॉल, व्हाट्सएप संपर्क और सीधे मैप नेविगेशन के साथ विशेष अस्पतालों को तुरंत खोजें।"
        },
        builtForIndia: "भारत के स्वास्थ्य सेवा के लिए बनाया गया",
        builtForIndiaDesc: "हर नागरिक के लिए स्थानीयकृत उन्नत तकनीक।",
        viewSettings: "सेटिंग्स और एक्सेसिबिलिटी देखें",
        hospitalFinder: "अस्पताल खोजक",
        hospitalFinderDesc: "अपने पास ट्रॉमा सेंटर और विशेषज्ञों का पता लगाएं।",
        browseMap: "मैप ब्राउज़ करें",
        reportHistory: "रिपोर्ट इतिहास",
        reportHistoryDesc: "अपने पिछले ट्राइएज परिणाम और नोट्स देखें।",
        viewHistory: "इतिहास देखें",
        criticalEmergency: "गंभीर आपातकाल?",
        criticalEmergencyDesc: "यदि आप गंभीर सीने में दर्द, भारी रक्तस्राव, या सांस लेने में कठिनाई का अनुभव कर रहे हैं, तो ट्राइएज परिणामों की प्रतीक्षा न करें। तुरंत 108 पर कॉल करें या निकटतम आपातकालीन कक्ष में जाएं।",
        call108Now: "अभी 108 पर कॉल करें",
        bottomDisclaimer: "महत्वपूर्ण: यह एक ट्राइएज टूल है, निदान नहीं। आपातकाल में 108 पर कॉल करें।"
      },
      triage: {
        breadcrumbHome: "होम",
        breadcrumbSymptom: "लक्षण मूल्यांकन",
        emergencyWarningTitle: "आपातकाल के लिए नहीं",
        emergencyWarningDesc: "यदि आप गंभीर सीने में दर्द, सांस लेने में कठिनाई, या भारी रक्तस्राव का अनुभव कर रहे हैं, तो तुरंत आपातकालीन 108 बटन का उपयोग करें।",
        title: "अपने लक्षणों का वर्णन करें",
        subtitle: "हमें बताएं कि आप कैसा महसूस कर रहे हैं। अधिक सटीक ट्राइएज के लिए यथासंभव विस्तृत रहें।",
        textMode: "टेक्स्ट मोड",
        switchToVoice: "वॉयस इनपुट पर स्विच करें",
        mainConcernLabel: "मुख्य समस्या क्या है?",
        mainConcernPlaceholder: "जैसे: तेज पेट दर्द, तेज बुखार",
        detailsLabel: "विवरण (गंभीरता, अवधि, संदर्भ)",
        detailsPlaceholder: "बताएं कि यह कब शुरू हुआ और क्या कुछ इसे बेहतर या बदतर बनाता है...",
        transcriptionPreview: "# ट्रांसक्रिप्शन पूर्वावलोकन",
        transcriptionLive: "लाइव",
        transcriptionHint: "अगर आप वॉयस मोड पर स्विच करते हैं तो सिस्टम आपकी वॉयस इनपुट को यहां रीयल-टाइम में ट्रांसक्राइब करेगा...",
        locationServicesTitle: "स्थान सेवाएं",
        locationServicesDesc: "अपने ट्राइएज के बाद निकटतम विशेष अस्पतालों को खोजने के लिए अपना स्थान साझा करें।",
        locationDetecting: "पता लगा रहे हैं...",
        locationPlaceholder: "शहर का नाम दर्ज करें...",
        locationSave: "सहेजें",
        locationChange: "बदलें",
        submitButton: "लक्षणों का विश्लेषण करें",
        privacyProtected: "गोपनीयता संरक्षित",
        aiAssisted: "AI-सहायता प्राप्त विश्लेषण",
        infoCompleteTitle: "पूर्ण और विशिष्ट रहें",
        infoCompleteDesc: "सबसे सटीक मूल्यांकन के लिए सभी प्रासंगिक लक्षण, उनकी अवधि और आप वर्तमान में जो दवाएं ले रहे हैं उन्हें शामिल करें।",
        infoMultilingualTitle: "बहुभाषी समर्थन",
        infoMultilingualDesc: "अपनी मातृभाषा में अपने लक्षणों का वर्णन करने में संकोच न करें। हमारा AI 22+ भारतीय भाषाओं को समझता है।"
      },
      voice: {
        title: "आपको सुन रहा हूं...",
        subtitle: "कृपया अपने लक्षणों का विस्तार से वर्णन करें। बताएं कि वे कब शुरू हुए और कितने गंभीर हैं।",
        transcriptionTitle: "# लाइव ट्रांसक्रिप्शन",
        liveBadge: "लाइव",
        transcriptionPlaceholder: "आपकी आवाज यहां दिखाई देगी...",
        recordingLanguage: "रिकॉर्डिंग भाषा:",
        resetRecording: "रिकॉर्डिंग रीसेट करें",
        confirmAnalyze: "पुष्टि करें और लक्षणों का विश्लेषण करें",
        privacyNote: "गोपनीयता नोट",
        privacyDesc: "आपका वॉयस डेटा सुरक्षित रूप से संसाधित किया जाता है और कभी भी संग्रहीत या तीसरे पक्षों के साथ साझा नहीं किया जाता है।",
        selectLanguage: "भाषा चुनें",
        startRecording: "रिकॉर्डिंग शुरू करें",
        stopRecording: "रिकॉर्डिंग बंद करें",
        processing: "संसाधित हो रहा है...",
        useTranscription: "इस टेक्स्ट का उपयोग करें"
      },
      results: {
        title: "ट्राइएज परिणाम",
        urgencyLevel: "तत्कालता स्तर",
        redFlags: "रेड फ्लैग",
        recommendations: "सिफारिशें",
        downloadNote: "रेफरल नोट डाउनलोड करें",
        findFacilities: "निकटस्थ सुविधाएं खोजें",
        newTriage: "नया ट्राइएज",
        possibleCauses: "संभावित कारण",
        homeRemedies: "घरेलू उपचार",
        importantNotes: "महत्वपूर्ण नोट्स"
      },
      facilities: {
        title: "निकटस्थ स्वास्थ्य सुविधाएं",
        searchPlaceholder: "अस्पताल, क्लीनिक खोजें...",
        filterAll: "सभी",
        filterTrauma: "ट्रॉमा",
        filterCardiology: "कार्डियोलॉजी",
        filterPediatrics: "बाल रोग",
        filterOncology: "ऑन्कोलॉजी",
        filterEmergency: "आपातकालीन",
        filterNeurology: "न्यूरोलॉजी",
        distance: "दूरी",
        rating: "रेटिंग",
        openNow: "अभी खुला है",
        emergency24: "24/7 आपातकालीन",
        call: "कॉल करें",
        whatsapp: "व्हाट्सएप",
        directions: "दिशा-निर्देश",
        viewDetails: "विवरण देखें",
        yourLocation: "आपका स्थान"
      },
      settings: {
        title: "सेटिंग्स",
        subtitle: "अपना ऐप अनुभव कॉन्फ़िगर करें",
        languageRegional: "भाषा और क्षेत्रीय",
        appearanceThemes: "दिखावट और थीम",
        accessibilityControls: "एक्सेसिबिलिटी नियंत्रण",
        systemOffline: "सिस्टम और ऑफलाइन",
        appInterfaceLanguage: "ऐप इंटरफ़ेस भाषा",
        appInterfaceDesc: "मेन्यू और टेक्स्ट के लिए भाषा चुनें",
        voiceInputLanguage: "वॉयस इनपुट भाषा",
        voiceInputDesc: "स्पीच रिकग्निशन के लिए भाषा चुनें",
        currentSelection: "वर्तमान: {{language}}",
        a11yCompliant: "A11Y अनुरूप",
        a11yDesc: "एरोविया हेल्थ डेस्क भारत में चिकित्सा पहुंच के लिए WCAG 2.1 मानकों का पालन करता है।",
        resetDefaults: "डिफ़ॉल्ट रीसेट करें",
        saveChanges: "सभी परिवर्तन सहेजें"
      },
      footer: {
        copyright: "© {{year}} एरोविया हेल्थ डेस्क",
        medicalDisclaimer: "चिकित्सा अस्वीकरण",
        privacyPolicy: "गोपनीयता नीति",
        systemOnline: "AI ट्राइएज सिस्टम ऑनलाइन",
        help: "सहायता"
      },
      disclaimer: {
        title: "चिकित्सा अस्वीकरण",
        content: "यह केवल सूचनात्मक उद्देश्यों के लिए एक AI-संचालित मेडिकल ट्राइएज टूल है। यह पेशेवर चिकित्सा सलाह, निदान या उपचार का विकल्प नहीं है।",
        emergency: "आपातकाल में, तुरंत 108 पर कॉल करें या निकटतम आपातकालीन कक्ष में जाएं।",
        agree: "मैं समझता/समझती हूं"
      },
      common: {
        loading: "लोड हो रहा है...",
        error: "एक त्रुटि हुई",
        retry: "पुनः प्रयास करें",
        close: "बंद करें",
        back: "वापस"
      }
    }
  },
  bn: {
    translation: {
      appName: "অ্যারোভিয়া হেলথ ডেস্ক",
      header: {
        emergency: "জরুরি",
        emergency108: "জরুরি 108",
        urgency: "জরুরিতা স্কোর",
        changeLanguage: "ভাষা"
      },
      landing: {
        trustBadge: "১০ লাখ+ ভারতীয়দের বিশ্বাস",
        title: "আপনার স্বাস্থ্য,",
        titleHighlight: "সরল।",
        hindiTagline: "सच्ची सलाह, सही समय पर।",
        description: "২২টি ভারতীয় ভাষা সমর্থন করা AI-চালিত মেডিকেল ট্রায়াজ। টেক্সট বা ভয়েসের মাধ্যমে আপনার উপসর্গ বর্ণনা করুন।",
        startTriage: "বিনামূল্যে ট্রায়াজ শুরু করুন",
        voiceAssistant: "ভয়েস সহকারী",
        howItWorks: "অ্যারোভিয়া কীভাবে কাজ করে",
        step1Title: "বলুন বা টাইপ করুন",
        step2Title: "AI বিশ্লেষণ",
        step3Title: "কার্যকর নির্দেশনা"
      },
      triage: {
        breadcrumbHome: "হোম",
        breadcrumbSymptom: "উপসর্গ মূল্যায়ন",
        emergencyWarningTitle: "জরুরি অবস্থার জন্য নয়",
        title: "আপনার উপসর্গ বর্ণনা করুন",
        textMode: "টেক্সট মোড",
        switchToVoice: "ভয়েস ইনপুটে স্যুইচ করুন",
        mainConcernLabel: "প্রধান সমস্যা কী?",
        submitButton: "উপসর্গ বিশ্লেষণ করুন"
      },
      voice: {
        title: "আপনার কথা শুনছি...",
        resetRecording: "রিকর্ডিং রিসেট করুন",
        confirmAnalyze: "নিশ্চিত করুন এবং উপসর্গ বিশ্লেষণ করুন"
      },
      settings: {
        title: "সেটিংস",
        subtitle: "আপনার অ্যাপ অভিজ্ঞতা কনফিগার করুন",
        languageRegional: "ভাষা এবং আঞ্চলিক",
        saveChanges: "সব পরিবর্তন সেভ করুন"
      },
      common: {
        loading: "লোড হচ্ছে...",
        back: "পিছনে"
      }
    }
  },
  te: {
    translation: {
      appName: "అరోవియా హెల్త్ డెస్క్",
      header: {
        emergency: "అత్యవసరం",
        emergency108: "అత్యవసర 108"
      },
      landing: {
        trustBadge: "10 లక్షల+ భారతీయులు నమ్మారు",
        title: "మీ ఆరోగ్యం,",
        titleHighlight: "సరళీకృతం.",
        startTriage: "ఉచిత ట్రయాజ్ ప్రారంభించండి"
      },
      triage: {
        breadcrumbHome: "హోమ్",
        title: "మీ లక్షణాలను వివరించండి",
        textMode: "టెక్స్ట్ మోడ్",
        switchToVoice: "వాయిస్ ఇన్‌పుట్‌కు మారండి",
        submitButton: "లక్షణాలను విశ్లేషించండి"
      },
      voice: {
        title: "మీ మాటలు వింటోన్నాను..."
      },
      settings: {
        title: "సెట్టింగ్‌లు",
        saveChanges: "అన్ని మార్పులను సేవ్ చేయండి"
      }
    }
  },
  mr: {
    translation: {
      appName: "अरोविया हेल्थ डेस्क",
      header: {
        emergency: "आपत्कालीन",
        emergency108: "आपत्कालीन 108"
      },
      landing: {
        trustBadge: "10 लाख+ भारतीयांचा विश्वास",
        title: "तुमचे आरोग्य,",
        titleHighlight: "सोपे.",
        startTriage: "मोफत ट्रायेज सुरू करा"
      },
      triage: {
        breadcrumbHome: "होम",
        title: "तुमच्या लक्षणांचे वर्णन करा",
        textMode: "टेक्स्ट मोड",
        switchToVoice: "व्हॉइस इनपुटवर स्विच करा",
        submitButton: "लक्षणांचे विश्लेषण करा"
      },
      voice: {
        title: "तुमचे ऐकत आहे..."
      },
      settings: {
        title: "सेटिंग्ज",
        saveChanges: "सर्व बदल जतन करा"
      }
    }
  },
  ta: {
    translation: {
      appName: "அரோவியா ஹெல்த் டெஸ்க்",
      header: {
        emergency: "அவசரம்",
        emergency108: "அவசர 108"
      },
      landing: {
        trustBadge: "10 லட்சம்+ இந்தியர்களின் நம்பிக்கை",
        title: "உங்கள் ஆரோக்கியம்,",
        titleHighlight: "எளிமையானது.",
        startTriage: "இலவச ட்ரைஜை தொடங்கு"
      },
      triage: {
        breadcrumbHome: "முகப்பு",
        title: "உங்கள் அறிகுறிகளை விவரிக்கவும்",
        textMode: "உரை பயன்முறை",
        switchToVoice: "குரல் உள்ளீட்டுக்கு மாறவும்",
        submitButton: "அறிகுறிகளை பகுப்பாய்வு செய்"
      },
      voice: {
        title: "உங்களைக் கேட்கிறேன்..."
      },
      settings: {
        title: "அமைப்புகள்",
        saveChanges: "அனைத்து மாற்றங்களையும் சேமி"
      }
    }
  },
  gu: {
    translation: {
      appName: "એરોવિયા હેલ્થ ડેસ્ક",
      landing: {
        startTriage: "મફત ટ્રાયએજ શરૂ કરો"
      },
      triage: {
        breadcrumbHome: "હોમ",
        title: "તમારા લક્ષણોનું વર્ણન કરો",
        submitButton: "લક્ષણોનું વિશ્લેષણ કરો"
      },
      voice: {
        title: "તમને સાંભળી રહ્યો છું..."
      },
      settings: {
        title: "સેટિંગ્સ"
      }
    }
  },
  kn: {
    translation: {
      appName: "ಅರೋವಿಯಾ ಹೆಲ್ತ್ ಡೆಸ್ಕ್",
      landing: {
        startTriage: "ಉಚಿತ ಟ್ರೈಯೇಜ್ ಪ್ರಾರಂಭಿಸಿ"
      },
      triage: {
        breadcrumbHome: "ಮುಖಪುಟ",
        title: "ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ",
        submitButton: "ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ"
      },
      voice: {
        title: "ನಿಮ್ಮ ಮಾತು ಕೇಳುತ್ತಿದ್ದೇನೆ..."
      },
      settings: {
        title: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು"
      }
    }
  },
  ml: {
    translation: {
      appName: "അരോവിയ ഹെൽത്ത് ഡെസ്ക്",
      landing: {
        startTriage: "സൗജന്യ ട്രയാജ് ആരംഭിക്കുക"
      },
      triage: {
        breadcrumbHome: "ഹോം",
        title: "നിങ്ങളുടെ ലക്ഷണങ്ങൾ വിവരിക്കുക",
        submitButton: "ലക്ഷണങ്ങൾ വിശകലനം ചെയ്യുക"
      },
      voice: {
        title: "നിങ്ങളെ കേൾക്കുന്നു..."
      },
      settings: {
        title: "ക്രമീകരണങ്ങൾ"
      }
    }
  },
  pa: {
    translation: {
      appName: "ਐਰੋਵੀਆ ਹੈਲਥ ਡੈਸਕ",
      landing: {
        startTriage: "ਮੁਫ਼ਤ ਟ੍ਰਾਈਏਜ ਸ਼ੁਰੂ ਕਰੋ"
      },
      triage: {
        breadcrumbHome: "ਘਰ",
        title: "ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਵਰਣਨ ਕਰੋ",
        submitButton: "ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ"
      },
      voice: {
        title: "ਤੁਹਾਨੂੰ ਸੁਣ ਰਿਹਾ ਹਾਂ..."
      },
      settings: {
        title: "ਸੈਟਿੰਗਾਂ"
      }
    }
  },
  or: {
    translation: {
      appName: "ଆରୋଭିଆ ହେଲଥ୍ ଡେସ୍କ",
      landing: {
        startTriage: "ମାଗଣା ଟ୍ରାଇଜ୍ ଆରମ୍ଭ କରନ୍ତୁ"
      },
      triage: {
        breadcrumbHome: "ହୋମ୍",
        title: "ଆପଣଙ୍କ ଲକ୍ଷଣ ବର୍ଣ୍ଣନା କରନ୍ତୁ",
        submitButton: "ଲକ୍ଷଣ ବିଶ୍ଳେଷଣ କରନ୍ତୁ"
      },
      voice: {
        title: "ଆପଣଙ୍କୁ ଶୁଣୁଛି..."
      },
      settings: {
        title: "ସେଟିଂସ୍"
      }
    }
  },
  ur: {
    translation: {
      appName: "اروویا ہیلتھ ڈیسک",
      header: {
        emergency: "ایمرجنسی",
        emergency108: "ایمرجنسی 108"
      },
      landing: {
        trustBadge: "10 لاکھ+ ہندوستانیوں کا اعتماد",
        title: "آپ کی صحت،",
        titleHighlight: "آسان۔",
        startTriage: "مفت ٹرائیج شروع کریں"
      },
      triage: {
        breadcrumbHome: "ہوم",
        title: "اپنی علامات بیان کریں",
        submitButton: "علامات کا تجزیہ کریں"
      },
      voice: {
        title: "آپ کی بات سن رہا ہوں..."
      },
      settings: {
        title: "ترتیبات"
      }
    }
  },
  as: {
    translation: {
      appName: "চিকিৎসা ট্ৰাইয়েজ",
      landing: {
        title: "জৰুৰীকালীন চিকিৎসা ট্ৰাইয়েজ",
        subtitle: "তাৎক্ষণিক চিকিৎসা নিৰ্দেশনা লাভ কৰক আৰু ওচৰৰ স্বাস্থ্য সুবিধা বিচাৰক",
        startTriage: "ট্ৰাইয়েজ আৰম্ভ কৰক",
        emergency: "জৰুৰীকাল? 108 লৈ কল কৰক"
      }
    }
  },
  ks: {
    translation: {
      appName: "طبی ٹریاج",
      landing: {
        title: "ہنگامی طبی ٹریاج",
        subtitle: "فوری طبی رہنمائی حاصل کریں اور قریبی صحت کی سہولیات تلاش کریں",
        startTriage: "ٹریاج شروع کریں",
        emergency: "ایمرجنسی? 108 پر کال کریں"
      }
    }
  },
  kok: {
    translation: {
      appName: "वैद्यकीय ट्रायेज",
      landing: {
        title: "तातडीच्या वैद्यकीय ट्रायेज",
        subtitle: "तात्काळ वैद्यकीय मार्गदर्शन मिळवा आणि जवळच्या आरोग्य सुविधा शोधा",
        startTriage: "ट्रायेज सुरू करा",
        emergency: "आणीबाणी? 108 वर कॉल करा"
      }
    }
  },
  mai: {
    translation: {
      appName: "चिकित्सा ट्राइएज",
      landing: {
        title: "आपातकालीन चिकित्सा ट्राइएज",
        subtitle: "तत्काल चिकित्सा मार्गदर्शन प्राप्त करू आ निकट स्वास्थ्य सुविधा खोजू",
        startTriage: "ट्राइएज शुरू करू",
        emergency: "आपातकाल? 108 पर कॉल करू"
      }
    }
  },
  mni: {
    translation: {
      appName: "মেদিকেল ত্রিয়াজ",
      landing: {
        title: "ইমর্জেন্সি মেদিকেল ত্রিয়াজ",
        subtitle: "তৎক্ষণাৎ চিকিৎসা নির্দেশনা পান আৰু ওচৰৰ স্বাস্থ্য সুবিধা বিচাৰক",
        startTriage: "ত্রিয়াজ শুরু কৰক",
        emergency: "ইমর্জেন্সি? 108 ত কল কৰক"
      }
    }
  },
  ne: {
    translation: {
      appName: "चिकित्सा ट्राइएज",
      landing: {
        title: "आपतकालीन चिकित्सा ट्राइएज",
        subtitle: "तत्काल चिकित्सा मार्गदर्शन प्राप्त गर्नुहोस् र नजिकैका स्वास्थ्य सुविधा खोज्नुहोस्",
        startTriage: "ट्राइएज सुरु गर्नुहोस्",
        emergency: "आपतकाल? 108 मा कल गर्नुहोस्"
      }
    }
  },
  sa: {
    translation: {
      appName: "चिकित्सा त्रियाज",
      landing: {
        title: "आपातकालीन चिकित्सा त्रियाज",
        subtitle: "तत्कालं चिकित्सा मार्गदर्शनं प्राप्नुवन्तु समीपस्थान् स्वास्थ्य सुविधाः अन्विष्यन्तु",
        startTriage: "त्रियाज आरभन्तु",
        emergency: "आपातकालः? 108 आह्वयन्तु"
      }
    }
  },
  sat: {
    translation: {
      appName: "ᱢᱮᱰᱤᱠᱟᱞ ᱴᱨᱟᱭᱟᱡᱽ",
      landing: {
        title: "ᱮᱢᱟᱨᱡᱮᱱᱥᱤ ᱢᱮᱰᱤᱠᱟᱞ ᱴᱨᱟᱭᱟᱡᱽ",
        subtitle: "ᱛᱤᱱᱟᱝ ᱜᱮ ᱢᱮᱰᱤᱠᱟᱞ ᱜᱟᱭᱰᱮᱱᱥ ᱧᱟᱢ ᱢᱮ ᱟᱨ ᱥᱩᱨ ᱨᱮᱭᱟᱜ ᱦᱮᱞᱛᱷ ᱯᱷᱮᱥᱤᱞᱤᱴᱤ ᱯᱟᱱᱛᱮ ᱢᱮ",
        startTriage: "ᱴᱨᱟᱭᱟᱡᱽ ᱮᱛᱦ Vance ᱢᱮ",
        emergency: "ᱮᱢᱟᱨᱡᱮᱱᱥᱤ? 108 ᱨᱮ ᱠ Vance ᱢᱮ"
      }
    }
  },
  sd: {
    translation: {
      appName: "طبي ٽرياج",
      landing: {
        title: "ايمرجنسي طبي ٽرياج",
        subtitle: "فوري طبي هدايت حاصل كريو ۽ ويجھو صحت جون سهولتون ڳوليو",
        startTriage: "ٽرياج شروع ڪريو",
        emergency: "ايمرجنسي? 108 تي ڪال ڪريو"
      }
    }
  },
  ur: {
    translation: {
      appName: "طبی ٹرائیج",
      landing: {
        title: "ایمرجنسی طبی ٹرائیج",
        subtitle: "فوری طبی رہنمائی حاصل کریں اور قریبی صحت کی سہولیات تلاش کریں",
        startTriage: "ٹرائیج شروع کریں",
        emergency: "ایمرجنسی؟ 108 پر کال کریں"
      }
    }
  },
  brx: {
    translation: {
      appName: "मेडिकल ट्राइएज",
      landing: {
        title: "एमरजेन्सी मेडिकल ट्राइएज",
        subtitle: "तुरन्त मेडिकल मार्गदर्शन हासिल होनाय आरो गाबै थानाय हेल्थ सुविधा नागिरनाय",
        startTriage: "ट्राइएज थांनाय",
        emergency: "एमरजेन्सी? 108 आव कल खालाम"
      }
    }
  },
  doi: {
    translation: {
      appName: "मेडिकल ट्रियाज",
      landing: {
        title: "एमरजेंसी मेडिकल ट्रियाज",
        subtitle: "तुरंत मेडिकल मार्गदर्शन हासिल करो ते नेड़े दे सेहत सुविधा लब्भो",
        startTriage: "ट्रियाज शुरू करो",
        emergency: "एमरजेंसी? 108 पर कॉल करो"
      }
    }
  }
  // Add more languages as needed: Assamese, Kashmiri, Konkani, Maithili, Manipuri, Nepali, Sanskrit, Santali, Sindhi, Urdu, Bodo, Dogri
};

// Get stored language or default to English
const storedLanguage = typeof window !== 'undefined' ? localStorage.getItem('appLanguage') : null;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: storedLanguage || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Listen for language changes and persist to localStorage
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('appLanguage', lng);
  }
});

export default i18n;

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کشمری' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृत' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'brx', name: 'Bodo', nativeName: 'बर\'' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी' }
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
  { code: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa-IN', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or-IN', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as-IN', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'ur-IN', name: 'Urdu', nativeName: 'اردو' },
  { code: 'sa-IN', name: 'Sanskrit', nativeName: 'संस्कृत' },
  { code: 'ne-IN', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'kok-IN', name: 'Konkani', nativeName: 'कोंकणी' },
  { code: 'mai-IN', name: 'Maithili', nativeName: 'मैथिली' },
  { code: 'mni-IN', name: 'Manipuri', nativeName: 'মৈতৈলোন্' },
  { code: 'sat-IN', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'sd-IN', name: 'Sindhi', nativeName: 'سنڌي' },
  { code: 'brx-IN', name: 'Bodo', nativeName: 'बर\'' },
  { code: 'doi-IN', name: 'Dogri', nativeName: 'डोगरी' }
];
