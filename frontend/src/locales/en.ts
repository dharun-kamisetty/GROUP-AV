export const en = {
    translation: {
        title: "Arovia Health",
        nav: {
            dashboard: "Dashboard",
            voice: "Voice Input",
            facilities: "Facilities",
            results: "Results"
        },

        // Landing Page
        landing: {
            badge: "Arovia Health Logic v1.0 Live",
            heroTitle: "Intelligent Triage for Every Citizen",
            heroSubtitle: "Revolutionizing first-point healthcare access in India. AI-powered assessments, multilingual voice support, and instant facility matching.",
            startButton: "Start Assessment",
            learnMoreButton: "Learn More",
            stat1Value: "1:1,445",
            stat1Title: "Doctor-to-Patient Ratio",
            stat1Desc: "Well below the WHO recommendation of 1:1,000, leading to severe access gaps.",
            stat2Value: "2-4 hrs",
            stat2Title: "Average Wait Time",
            stat2Desc: "For basic consultations in public facilities, delaying critical care.",
            stat3Value: "10 min",
            stat3Title: "Door-to-Triage",
            stat3Desc: "Manual processes slow down identification of emergency cases.",
            featuresTitle: "Healthcare Intelligence at Scale",
            featuresSubtitle: "Arovia combines clinical protocols with advanced AI to bridge the gap between patients and care.",
            feature1Title: "Symptom Triage",
            feature1Desc: "Advanced NLP analyzes symptoms to assess urgency (1-10 scale) and identify potential conditions instantly.",
            feature2Title: "Red Flag Detection",
            feature2Desc: "Real-time identification of life-threatening emergencies (Cardiac, Stroke, Trauma) for immediate escalation.",
            feature3Title: "Multilingual Voice",
            feature3Desc: "Speak naturally in Hindi, English, or regional languages. Powered by Whisper for high-accuracy transcription.",
            feature4Title: "Smart Matching",
            feature4Desc: "Geolocation-based search connects patients to the nearest appropriate facilities (Govt, NGO, Private).",
            feature5Title: "Referral Notes",
            feature5Desc: "Generates structured medical summaries for seamless handoffs to doctors, reducing administrative burden.",
            feature6Title: "Ready to try?",
            feature6Subtitle: "Experience the future of triage today.",
            feature6Button: "Launch Dashboard",
            footerTitle: "Arovia",
            footerSubtitle: "AI-Powered Health Triage Agent",
            footerPrivacy: "Privacy",
            footerTerms: "Terms",
            footerContact: "Contact",
            footerCopyright: "Arovia Health. All rights reserved."
        },

        // Triage Form
        triageForm: {
            heading: "Symptom Assessment",
            subheading: "Describe your symptoms in detail for AI analysis",
            symptomsLabel: "Describe your symptoms",
            required: "*",
            symptomsPlaceholder: "Example: I have a severe headache on the left side, sensitivity to light, and nausea for the past 4 hours...",
            symptomsHint: "Be as specific as possible about the pain, duration, and any triggers.",
            locationLabel: "Your Location (Optional)",
            locationPlaceholder: "City, State OR Click to Detect",
            quickSelectLabel: "Quick Select Examples",
            cancelButton: "Cancel",
            submitButton: "Start Triage Analysis",
            analyzingButton: "Analyzing...",
            example1: "I have chest pain and shortness of breath",
            example2: "I have a high fever and headache",
            example3: "I have severe abdominal pain",
            example4: "I have difficulty breathing",
            example5: "I have a persistent cough"
        },

        // Voice Input
        voiceInput: {
            heading: "Voice Input",
            subheading: "Speak your symptoms in your preferred language",
            selectLanguage: "Select Language",
            recordingTime: "Recording...",
            recordingComplete: "Recording completed",
            recordingStop: "Click stop when finished",
            tipsTitle: "Recording Tips:",
            tip1: "• Speak clearly and at a normal pace",
            tip2: "• Describe your symptoms in detail",
            tip3: "• Include when symptoms started",
            tip4: "• Mention severity and any associated symptoms",
            tip5: "• Recording will automatically stop after 30 seconds",
            backButton: "Back to Dashboard",
            submitButton: "Analyze Recording",
            processingButton: "Processing..."
        },

        // Results
        results: {
            loading: "Analyzing Symptoms",
            loadingDesc: "Our AI is processing your symptoms...",
            errorTitle: "Analysis Error",
            tryAgainButton: "Try Again",
            noResultsTitle: "No Results",
            noResultsDesc: "Please submit symptoms for analysis",
            startButton: "Start Assessment",
            heading: "Triage Results",
            subheading: "AI-powered medical assessment",
            downloadButton: "Download Note",
            newAssessment: "New Assessment",
            urgencyScore: "Urgency Score",
            recommendedSpecialty: "Recommended Specialty",
            emergencyDetected: "Emergency Detected",
            yes: "YES",
            no: "NO",
            chiefComplaint: "Chief Complaint",
            redFlagsTitle: "Red Flags Detected",
            action: "Action",
            potentialRisks: "Potential Risks",
            specialty: "Specialty",
            highProbability: "high probability",
            mediumProbability: "medium probability",
            lowProbability: "low probability",
            recommendations: "Recommendations",
            emergencyTitle: "EMERGENCY DETECTED",
            emergencyCall: "🚨 CALL 108 IMMEDIATELY",
            emergencyTip1: "Do NOT drive yourself",
            emergencyTip2: "Call emergency services (108)",
            emergencyTip3: "Proceed to nearest Emergency Room",
            nearbyFacilities: "Nearby Healthcare Facilities",
            immediate: "IMMEDIATE",
            urgent: "URGENT",
            standard: "STANDARD"
        },

        // Facilities
        facilities: {
            heading: "Healthcare Facilities",
            subheading: "Find nearby medical centers and hospitals",
            searchPlaceholder: "Enter city, state (e.g., Mumbai, Maharashtra)",
            searchButton: "Search",
            loadingTitle: "Finding Facilities",
            loadingDesc: "Searching for nearby healthcare centers...",
            foundFacilities: "Found {{count}} facilities",
            sortedBy: "Sorted by distance",
            recommended: "⭐ Recommended",
            servicesAvailable: "Services Available:",
            viewOnMap: "View on Map →",
            saveButton: "Save",
            directionsButton: "Get Directions",
            noFacilitiesTitle: "No Facilities Found",
            noFacilitiesDesc: "Try searching for a different location or check your spelling.",
            clearButton: "Clear Search",
            priority: "Priority",
            kmAway: "km away"
        },

        // Disclaimer
        disclaimer: {
            title: "Medical Disclaimer",
            textFull: "This application uses Artificial Intelligence to provide preliminary health triage recommendations. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. If you think you may have a medical emergency, call your doctor or emergency services immediately.",
            textShort: "AI-powered assistant. Not a substitute for professional medical advice.",
            accept: "I Understand & Enter",
            readMore: "Read Full Disclaimer"
        }
    }
};
