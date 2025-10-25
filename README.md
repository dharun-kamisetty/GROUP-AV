# 🏥 Arovia - AI Health Desk Agent

> Intelligent triage assistant revolutionizing first-point healthcare access in India

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![LangChain](https://img.shields.io/badge/LangChain-Latest-green.svg)](https://github.com/langchain-ai/langchain)
[![Groq](https://img.shields.io/badge/Groq-Llama%203.3%2070B-purple.svg)](https://groq.com)
[![Demo](https://img.shields.io/badge/Status-Live%20Demo-success.svg)](https://arovia.streamlit.app)

---

## 🌟 What is Arovia?

**Arovia** is an AI-powered Health Desk Agent designed to be the intelligent first point of contact in India's overburdened public health system. Named after the fusion of "AI" and "Rovia" (Sanskrit for healing), Arovia combines cutting-edge language models with medical protocols to provide safe, accurate, and accessible health triage.

### The Problem We're Solving

India faces a critical healthcare access crisis:
- 🏥 Doctor-to-patient ratio: **1:1,445** (WHO recommends 1:1,000)
- ⏰ Average wait time: **2-4 hours** for basic consultations  
- 🚨 Non-clinical front-desk staff making critical triage decisions
- 🗺️ Patients arriving at facilities that can't treat their condition
- 📊 10+ minutes average door-to-triage time at Primary Health Centers

**Arovia bridges this gap** by providing instant, intelligent triage that:
1. Identifies emergency symptoms requiring immediate care
2. Assesses urgency levels with medical accuracy
3. Matches patients to appropriate nearby facilities
4. Generates structured referral notes for healthcare providers

---

## ✨ Key Features

### 🎯 Intelligent Symptom Triage
- Natural language understanding of patient symptoms
- Context-aware follow-up questions
- Urgency scoring (1-10 scale) using validated medical protocols
- Identification of potential conditions and risks

### 🚨 Emergency Detection System
- Real-time red flag identification for life-threatening conditions
- Immediate escalation protocols for cardiac, neurological, and trauma cases
- Built-in safety rails to prevent misdiagnosis

### 🗣️ Multilingual Voice Interface
- Speech-to-text using Whisper-Large model
- Support for Hindi, English, and other Indic languages
- Accessible for low-literacy populations

### 📍 Smart Facility Matching
- Real-time geolocation using OpenStreetMap
- Search for nearby clinics within customizable radius
- Filter by specialty and service availability
- Distance calculation and map links

### 📋 Structured Referral Notes
- Medical-compliant documentation format
- Comprehensive symptom summary
- Urgency assessment and red flags
- Recommended facilities with contact information
- Downloadable for easy handoff to healthcare providers

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        AROVIA INTERFACE                          │
│                   Streamlit Web Application                       │
│         [💬 Text Input]  OR  [🎤 Voice Recording]                │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────────┐
│                    VOICE PROCESSING LAYER                         │
│                                                                   │
│  ╔══════════════════════════════════════════════════════════╗   │
│  ║          Whisper-Large Speech Recognition                ║   │
│  ║  • Transcribes patient voice input to text              ║   │
│  ║  • Supports Hindi, English, Telugu, Tamil               ║   │
│  ║  • Handles accents and background noise                 ║   │
│  ╚══════════════════════════════════════════════════════════╝   │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────────┐
│                   AROVIA INTELLIGENCE CORE                        │
│                     Powered by LangChain                          │
│                                                                   │
│  ╔══════════════════════════════════════════════════════════╗   │
│  ║              Llama 3.3 70B (Groq Cloud)                  ║   │
│  ║                                                           ║   │
│  ║  🧠 Medical Reasoning Engine:                            ║   │
│  ║     ├─ Extract: Chief complaint & symptoms               ║   │
│  ║     ├─ Analyze: Severity, duration, progression          ║   │
│  ║     ├─ Score: Urgency level (1-10)                       ║   │
│  ║     ├─ Identify: Red flag symptoms                       ║   │
│  ║     └─ Assess: Potential conditions & risks              ║   │
│  ║                                                           ║   │
│  ║  📝 Structured Output (Pydantic Model):                  ║   │
│  ║     {                                                     ║   │
│  ║       "chief_complaint": "...",                          ║   │
│  ║       "symptoms": [...],                                 ║   │
│  ║       "urgency_score": 8,                                ║   │
│  ║       "red_flags": [...],                                ║   │
│  ║       "potential_risks": [...],                          ║   │
│  ║       "recommended_specialty": "..."                     ║   │
│  ║     }                                                     ║   │
│  ╚══════════════════════════════════════════════════════════╝   │
│                          │                                        │
│              ┌───────────┴───────────┐                           │
│              │                       │                            │
│              ▼                       ▼                            │
│   ┏━━━━━━━━━━━━━━━┓       ┏━━━━━━━━━━━━━━━┓                     │
│   ┃  🚨 RED FLAG  ┃       ┃   ✅ NORMAL   ┃                     │
│   ┃   DETECTOR    ┃       ┃    TRIAGE     ┃                     │
│   ┗━━━━━┯━━━━━━━━━┛       ┗━━━━━┯━━━━━━━━━┛                     │
│         │                        │                               │
│         │ Emergency Keywords     │                               │
│         ▼                        │                               │
│   ┌─────────────┐               │                               │
│   │  IMMEDIATE  │               │                               │
│   │ ESCALATION  │               │                               │
│   │   ⚠️ 108    │               │                               │
│   └─────────────┘               │                               │
└─────────────────────────────────┼───────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│                   FACILITY MATCHING ENGINE                        │
│                  OpenStreetMap Integration                        │
│                                                                   │
│  📍 Location Services:                                           │
│     ├─ Geocode user location (lat/lon)                          │
│     ├─ Search clinics within radius (default: 10km)             │
│     ├─ Filter by required specialty                             │
│     ├─ Calculate distances                                      │
│     └─ Generate map links                                       │
│                                                                   │
│  🏥 Output: Top 3 Nearest Facilities                            │
│     [Clinic Name | Distance | Services | Map Link]              │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────────┐
│                    AROVIA REFERRAL NOTE                          │
│                   (Medical-Grade Output)                          │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  📋 PATIENT REFERRAL DOCUMENTATION                         │ │
│  │  ══════════════════════════════════════════════════════════│ │
│  │                                                             │ │
│  │  🩺 CLINICAL SUMMARY:                                      │ │
│  │     Chief Complaint: [Primary symptom description]         │ │
│  │     Duration: [Onset timeline]                             │ │
│  │     Severity: [Mild/Moderate/Severe]                       │ │
│  │     Associated Symptoms: [Secondary symptoms]              │ │
│  │                                                             │ │
│  │  ⚡ URGENCY ASSESSMENT:                                    │ │
│  │     Score: [X/10] 🔴🟡🟢                                   │ │
│  │     Red Flags: [YES/NO - List if present]                  │ │
│  │     Triage Category: [Immediate/Urgent/Standard]           │ │
│  │                                                             │ │
│  │  ⚠️ POTENTIAL RISKS:                                       │ │
│  │     • [Condition 1]                                        │ │
│  │     • [Condition 2]                                        │ │
│  │                                                             │ │
│  │  🏥 RECOMMENDED FACILITIES:                                │ │
│  │     1. [Primary Recommendation]                            │ │
│  │        📍 [Distance] • [Specialty] • [Map Link]           │ │
│  │     2. [Alternative Option 1]                              │ │
│  │        📍 [Distance] • [Specialty] • [Map Link]           │ │
│  │     3. [Alternative Option 2]                              │ │
│  │        📍 [Distance] • [Specialty] • [Map Link]           │ │
│  │                                                             │ │
│  │  ⏰ Generated: [Timestamp]                                 │ │
│  │  🤖 Powered by Arovia v1.0                                 │ │
│  │                                                             │ │
│  │  ⚠️ DISCLAIMER: This is a triage support tool, not a      │ │
│  │  medical diagnosis. Please consult a healthcare            │ │
│  │  professional for definitive medical advice.               │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Core Technologies

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **🧠 LLM** | Llama 3.3 70B via Groq Cloud | Medical reasoning, symptom analysis, urgency assessment |
| **🔗 Orchestration** | LangChain | Agent coordination, structured outputs, prompt management |
| **🗣️ Speech-to-Text** | Whisper-Large | Voice input processing for Indic languages |
| **📍 Geolocation** | OpenStreetMap API | Clinic search, distance calculation, mapping |
| **🎨 Frontend** | Streamlit | Rapid web interface development |
| **📦 Package Manager** | uv | Lightning-fast dependency management |
| **✅ Validation** | Pydantic | Structured medical data models |

### Why These Choices?

- **Groq Cloud**: 10x faster inference than traditional LLM hosting, free tier available
- **Llama 3.3 70B**: Best open-source model for medical reasoning and Hindi support
- **Whisper-Large**: State-of-the-art accuracy for Indic languages
- **OpenStreetMap**: Comprehensive India coverage, free API, no rate limits for basic use
- **Streamlit**: Deploy from Python code in minutes, perfect for hackathon demos

---

## ⏰ 24-Hour Development Timeline

### 🎯 Our Goal
Build a **fully functional MVP** demonstrating intelligent triage with voice input, emergency detection, and facility matching - achievable, impressive, and ready to scale.

---

### **PHASE 1: Foundation (Hours 0-6)** 🌅

#### Hour 0-1: Project Initialization
```bash
✅ Setup & Configuration
├─ Initialize GitHub repository
├─ Configure development environment with uv
├─ Test Groq API connectivity
├─ Create project structure
└─ Set up version control
```

#### Hour 1-3: Core Triage Intelligence
```bash
✅ Build Arovia Brain
├─ Implement LangChain agent with Llama 3.3 70B
├─ Design medical triage prompts
├─ Create Pydantic models for structured outputs
├─ Build urgency scoring algorithm
└─ Test with 5 sample symptoms

Deliverable: Working function
>>> arovia.triage("chest pain for 2 hours")
{urgency: 9, red_flags: ["chest pain"], specialty: "cardiology"}
```

#### Hour 3-4: Safety System
```bash
✅ Emergency Detection
├─ Define red flag keyword dictionary
├─ Implement immediate escalation logic
├─ Create safety prompts and guardrails
└─ Test emergency scenarios (100% accuracy required)
```

#### Hour 4-6: User Interface
```bash
✅ Streamlit Web App
├─ Create main application layout
├─ Build symptom input interface
├─ Design urgency visualization (color-coded)
├─ Add referral note display
└─ Basic styling and branding
```

**✅ Milestone 1: Working text-based triage system (6 hours)**

---

### **PHASE 2: Intelligence Enhancement (Hours 6-12)** ☀️

#### Hour 6-8: Geolocation Integration
```bash
✅ Facility Matching Engine
├─ Integrate OpenStreetMap API
├─ Implement geocoding service
├─ Build nearby clinic search (10km radius)
├─ Calculate distances and generate map links
└─ Display top 3 recommendations

Deliverable: Facility finder
>>> find_clinics(lat=28.6139, lon=77.2090, specialty="emergency")
[Clinic_1: 2.3km, Clinic_2: 4.1km, Clinic_3: 5.8km]
```

#### Hour 8-10: Voice Interface
```bash
✅ Whisper Integration
├─ Add audio recording functionality to UI
├─ Integrate Whisper-Large for transcription
├─ Support Hindi + English input
├─ Handle audio preprocessing
└─ Test transcription accuracy

⚠️ Backup Plan: If complex, prioritize text input
```

#### Hour 10-12: Referral Documentation
```bash
✅ Professional Output Generation
├─ Design medical-grade referral note template
├─ Implement structured data formatting
├─ Add timestamp and metadata
├─ Create downloadable output (TXT/PDF)
└─ Include disclaimers and safety warnings
```

**✅ Milestone 2: Complete end-to-end pipeline (12 hours)**

---

### **PHASE 3: Polish & Validation (Hours 12-18)** 🌆

#### Hour 12-14: User Experience
```bash
✅ UI/UX Refinement
├─ Add loading animations and progress indicators
├─ Implement color-coded urgency levels
│  ├─ 🔴 Red (8-10): Immediate
│  ├─ 🟡 Yellow (5-7): Urgent
│  └─ 🟢 Green (1-4): Standard
├─ Create "Quick Demo" buttons with pre-loaded scenarios
├─ Add Arovia branding and logo
└─ Mobile responsiveness
```

#### Hour 14-16: Comprehensive Testing
```bash
✅ Quality Assurance
├─ Test 10 diverse symptom scenarios
│  ├─ Emergency cases (3)
│  ├─ Urgent cases (4)
│  └─ Standard cases (3)
├─ Verify red flag detection (100% accuracy)
├─ Validate facility matching correctness
├─ Edge case handling
│  ├─ No clinics found
│  ├─ API failures
│  └─ Ambiguous symptoms
└─ Performance benchmarking
```

#### Hour 16-18: Documentation Excellence
```bash
✅ Professional Documentation
├─ Complete README with:
│  ├─ Project overview
│  ├─ Architecture diagrams
│  ├─ Setup instructions
│  └─ Demo scenarios
├─ Create system architecture diagram
├─ Write technical documentation
├─ Add code comments and docstrings
└─ Prepare demo script
```

**✅ Milestone 3: Production-ready demo (18 hours)**

---

### **PHASE 4: Demo Preparation (Hours 18-24)** 🌙

#### Hour 18-20: Final Validation
```bash
✅ Pre-Demo Checklist
├─ End-to-end testing (all features)
├─ Record 2-minute demo video
├─ Prepare 3 live demo scenarios:
│  ├─ Emergency: Chest pain case
│  ├─ Urgent: Fever + respiratory symptoms
│  └─ Standard: Mild headache
└─ Backup testing (offline scenarios)
```

#### Hour 20-22: Pitch Deck Creation
```bash
✅ Presentation Materials
├─ Create 7-slide deck:
│  ├─ Slide 1: Problem statement with statistics
│  ├─ Slide 2: Arovia solution overview
│  ├─ Slide 3: System architecture
│  ├─ Slide 4: Live demo
│  ├─ Slide 5: Technology stack
│  ├─ Slide 6: Impact & scalability
│  └─ Slide 7: Future roadmap
├─ Practice 5-minute pitch
├─ Prepare Q&A responses
└─ Create one-pager for judges
```

#### Hour 22-24: Buffer & Deployment
```bash
✅ Final Touches
├─ Deploy to Streamlit Cloud
├─ Test deployed version
├─ Final bug fixes
├─ Team rest/preparation
└─ ☕ Coffee break!
```

**✅ Final Milestone: Pitch-ready product (24 hours)**

---

## 🚀 Quick Start

### Prerequisites
```bash
# Python 3.11 or higher
python --version

# uv package manager
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Installation

```bash
# 1. Clone Arovia repository
git clone https://github.com/your-team/arovia.git
cd arovia

# 2. Install dependencies using uv
uv pip install -r requirements.txt

# 3. Configure environment variables
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

# 4. Launch Arovia
streamlit run app.py
```

### Environment Variables
```bash
# .env file
GROQ_API_KEY=gsk_your_groq_api_key_here
# Optional: For premium OpenStreetMap features
# OSM_API_KEY=your_osm_key
```

---

## 🎬 Demo Scenarios

### Scenario 1: 🚨 Emergency Case (Red Flag Detection)

**Patient Input:**
> "I've been having severe chest pain for the last 30 minutes. The pain is radiating to my left arm and I'm feeling short of breath."

**Arovia Output:**
```
╔════════════════════════════════════════════════════════╗
║              🚨 EMERGENCY DETECTED 🚨                  ║
╚════════════════════════════════════════════════════════╝

URGENCY SCORE: 10/10 🔴

RED FLAGS IDENTIFIED:
• Chest pain with radiation
• Shortness of breath
• Acute onset (<1 hour)

POTENTIAL RISKS:
• Acute Myocardial Infarction (Heart Attack)
• Unstable Angina
• Pulmonary Embolism

⚠️ IMMEDIATE ACTION REQUIRED
→ Call 108 (Emergency Services) NOW
→ Do NOT drive yourself
→ Proceed to nearest Emergency Room immediately

NEAREST EMERGENCY FACILITIES:
1. AIIMS Cardiac Emergency Unit
   📍 2.3 km • 7 min drive • [View Map]
   24/7 Cardiac Care Available

2. Apollo Hospital ER
   📍 4.1 km • 12 min drive • [View Map]
   Cardiology Specialist On-Call
```

---

### Scenario 2: 🟡 Urgent Case (Non-Emergency)

**Patient Input:**
> "मुझे 3 दिन से बुखार है और खांसी भी हो रही है। सांस लेने में थोड़ी तकलीफ हो रही है।" 
> (Hindi: I've had fever for 3 days and cough. Having slight breathing difficulty.)

**Arovia Output:**
```
╔════════════════════════════════════════════════════════╗
║            URGENT MEDICAL ATTENTION NEEDED             ║
╚════════════════════════════════════════════════════════╝

URGENCY SCORE: 6/10 🟡

CHIEF COMPLAINT:
Fever and cough for 3 days with breathing difficulty

SYMPTOMS IDENTIFIED:
• Fever (duration: 3 days)
• Persistent cough
• Mild dyspnea (breathing difficulty)

RED FLAGS: None detected

POTENTIAL RISKS:
• Lower Respiratory Tract Infection
• Pneumonia (requires chest X-ray evaluation)
• COVID-19 or Influenza

RECOMMENDED ACTION:
Visit Primary Health Center or General Physician within 24 hours

NEAREST APPROPRIATE FACILITIES:
1. Government Primary Health Center
   📍 1.2 km • 4 min drive • [View Map]
   Services: X-ray, GP consultation, Basic lab tests

2. Community Health Center - Respiratory Clinic
   📍 3.5 km • 10 min drive • [View Map]
   Services: Pulmonary function tests, Specialist available
```

---

### Scenario 3: 🟢 Standard Case (Non-Urgent)

**Patient Input:**
> "I have a mild headache since this morning. No other symptoms."

**Arovia Output:**
```
╔════════════════════════════════════════════════════════╗
║             STANDARD CONSULTATION ADVISED              ║
╚════════════════════════════════════════════════════════╝

URGENCY SCORE: 2/10 🟢

CHIEF COMPLAINT:
Mild headache (duration: few hours)

SYMPTOMS IDENTIFIED:
• Tension-type headache (likely)
• No associated symptoms

RED FLAGS: None

POTENTIAL CAUSES:
• Tension headache
• Dehydration
• Eye strain
• Stress-related

RECOMMENDED ACTION:
• Rest and hydration
• OTC pain relief (e.g., Paracetamol)
• Monitor for worsening symptoms
• Consult GP if persists beyond 24 hours

NEARBY GENERAL PRACTITIONERS:
1. City Clinic - General Medicine
   📍 800m • 3 min walk • [View Map]
   Walk-in available, Avg wait: 15 mins
```

---

## 🛡️ Safety & Compliance

### Medical Safety Rails

#### Emergency Keyword Detection
```python
EMERGENCY_KEYWORDS = {
    "cardiac": [
        "chest pain", "heart attack", "crushing chest pressure",
        "pain radiating to arm/jaw", "severe palpitations"
    ],
    "neurological": [
        "stroke", "face drooping", "arm weakness", "slurred speech",
        "sudden severe headache", "loss of consciousness", "seizure"
    ],
    "respiratory": [
        "can't breathe", "choking", "severe shortness of breath",
        "blue lips", "gasping for air"
    ],
    "trauma": [
        "severe bleeding", "head injury", "broken bone visible",
        "penetrating wound", "unconscious after injury"
    ],
    "mental_health": [
        "suicide", "want to die", "self-harm", "kill myself"
    ],
    "other": [
        "severe abdominal pain", "pregnancy + bleeding",
        "high fever in infant", "allergic reaction + swelling"
    ]
}

# If ANY keyword detected → Urgency = 10, Immediate escalation to 108
```

### Disclaimers & Legal Compliance

**Every Arovia output includes:**
```
⚠️ MEDICAL DISCLAIMER:
Arovia is a triage support tool and does NOT provide medical 
diagnoses or treatment recommendations. This assessment is based 
on symptom information provided and should not replace consultation 
with qualified healthcare professionals.

In case of emergency, call 108 immediately.
```

### Data Privacy
- ✅ No storage of personal health information
- ✅ No user authentication required (privacy-by-design)
- ✅ Session-based processing (data deleted after session)
- ✅ Compliant with India's Digital Personal Data Protection Act 2023

### Medical Device Classification
- **India**: Likely Class A/B (low risk) under Medical Device Rules 2017
- **Purpose**: Clinical decision support tool, not diagnostic device
- **Validation**: Tested against validated clinical vignettes

---

## 📊 Success Metrics & Evaluation

### Technical Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Red Flag Detection Accuracy** | 100% | Tested with 10 emergency scenarios |
| **Urgency Scoring Precision** | ±1 point | Compared with medical professional assessment |
| **Facility Matching Speed** | <2 seconds | Average response time for geolocation query |
| **Speech Recognition Accuracy** | >85% | Word Error Rate (WER) for Hindi/English |
| **End-to-End Latency** | <5 seconds | User input → Complete referral note |
| **System Uptime** | >99% | During demo period |

### Clinical Validation

| Test Case Type | Sample Size | Expected Accuracy |
|----------------|-------------|-------------------|
| Emergency Cases | 10 scenarios | 100% red flag detection |
| Urgent Cases | 10 scenarios | 90% appropriate triage |
| Standard Cases | 10 scenarios | 85% correct assessment |

---

## 🎯 Judge Evaluation Alignment

### Innovation (25 points)
✅ **What makes Arovia unique:**
- First AI triage agent specifically designed for Indian public health context
- Multilingual voice interface for low-literacy populations
- Real-time facility matching with OpenStreetMap
- LLM-powered medical reasoning with safety guardrails

### Technical Execution (25 points)
✅ **Our technical achievements:**
- Full-stack implementation (Voice → LLM → Geolocation → Output)
- Production-grade architecture with error handling
- Structured outputs using Pydantic for medical compliance
- Fast inference with Groq Cloud (<1s response time)
- Clean, documented, reproducible code

### Impact & Scalability (25 points)
✅ **Real-world impact potential:**
- Addresses 1.4 billion people's healthcare access problem
- Reduces 10+ minute triage time to <30 seconds
- Prevents wrong-facility visits (saving time & resources)
- Scales horizontally with cloud infrastructure
- Zero marginal cost per additional user

### Presentation & Demo (25 points)
✅ **Our presentation strategy:**
- Live demo with 3 real patient scenarios
- Clear problem-solution narrative
- Visual system architecture
- Downloadable referral notes as artifacts
- Q&A preparation for technical and medical questions

---

## 🚀 Future Roadmap (Post-Hackathon)

### Phase 1: Pilot Deployment (Q1 2025)
- Deploy in 5 Primary Health Centers in Telangana
- Collect real-world usage data and feedback
- Refine urgency scoring based on outcomes
- Build analytics dashboard for health officers

### Phase 2: Feature Enhancement (Q2 2025)
- Add 5+ Indic languages (Bengali, Marathi, Gujarati, Kannada, Malayalam)
- Integrate with eSanjeevani telemedicine platform
- Build WhatsApp bot for feature phone users
- Develop mobile app for community health workers

### Phase 3: AI Enhancement (Q3 2025)
- Implement RAG (Retrieval-Augmented Generation) with ICMR guidelines
- Add medical history context (returning patients)
- Predictive analytics for disease outbreak detection
- Integration with National Health Stack (ABDM)

### Phase 4: Scale (Q4 2025 - 2026)
- Expand to 100+ PHCs across 5 states
- Partner with NGOs and government health programs
- Open-source community ecosystem
- Research publication on clinical validation

---

## 🛠️ Development Setup

### Project Structure
```
arovia/
├── app.py                          # Main Streamlit application
├── requirements.txt                # Python dependencies
├── .env.example                    # Environment template
├── README.md                       # This file
│
├── agents/
│   ├── __init__.py
│   ├── triage_agent.py            # Core triage logic with LangChain
│   ├── red_flag_checker.py        # Emergency detection system
│   └── facility_matcher.py        # Geolocation and clinic search
│
├── models/
│   ├── __init__.py
│   └── schemas.py                 # Pydantic models for structured outputs
│
├── prompts/
│   ├── __init__.py
│   ├── triage_prompts.py          # Medical triage prompt templates
│   └── safety_prompts.py          # Safety rail prompts
│
├── utils/
│   ├── __init__.py
│   ├── whisper_client.py          # Speech-to-text integration
│   ├── geo_utils.py               # OpenStreetMap utilities
│   └── formatters.py              # Referral note formatting
│
├── config/
│   ├── __init__.py
│   └── settings.py                # Configuration management
│
├── tests/
│   ├── test_triage.py             # Unit tests for triage agent
│   ├── test_safety.py             # Red flag detection tests
│   └── test_integration.py        # End-to-end tests
│
└── assets/
    ├── logo.png                   # Arovia branding
    └── demo_scenarios.json        # Pre-loaded demo cases
```

### Dependencies (requirements.txt)
```txt
# Core Framework
streamlit>=1.31.0
langchain>=0.1.0
langchain-groq>=0.1.0
langchain-community>=0.1.0

# LLM & Embeddings  
groq>=0.4.0

# Data Validation
pydantic>=2.0.0
pydantic-settings>=2.0.0

# Speech Processing
openai-whisper>=20230918
sounddevice>=0.4.6    # For audio recording

# Geolocation
geopy>=2.4.0
folium>=0.15.0        # Interactive maps

# Utilities
python-dotenv>=1.0.0
requests>=2.31.0

# Development
pytest>=7.4.0         # Testing framework
black>=23.0.0         # Code formatting

will add further if any...