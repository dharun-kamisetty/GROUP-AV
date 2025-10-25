"""
Arovia - AI Health Desk Agent
Streamlit web application for medical triage
"""
import streamlit as st
import os
import time
from typing import Optional
from dotenv import load_dotenv
from agents.triage_agent import AroviaTriageAgent
from models.schemas import TriageResult, VoiceInput, ReferralNote

# Load environment variables from .env file
load_dotenv()


def initialize_session_state():
    """Initialize Streamlit session state"""
    if 'agent' not in st.session_state:
        st.session_state.agent = None
    if 'triage_result' not in st.session_state:
        st.session_state.triage_result = None
    if 'voice_result' not in st.session_state:
        st.session_state.voice_result = None
    if 'referral_note' not in st.session_state:
        st.session_state.referral_note = None
    if 'user_location' not in st.session_state:
        st.session_state.user_location = ""


def setup_page():
    """Setup Streamlit page configuration"""
    st.set_page_config(
        page_title="Arovia - AI Health Desk Agent",
        page_icon="🏥",
        layout="wide",
        initial_sidebar_state="expanded"
    )


def display_header():
    """Display application header"""
    st.title("🏥 Arovia - AI Health Desk Agent")
    st.markdown("> Intelligent triage assistant revolutionizing first-point healthcare access in India")
    
    # Status badges
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.markdown("![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)")
    with col2:
        st.markdown("![LangChain](https://img.shields.io/badge/LangChain-Latest-green.svg)")
    with col3:
        st.markdown("![Groq](https://img.shields.io/badge/Groq-Llama%203.3%2070B-purple.svg)")
    with col4:
        st.markdown("![Status](https://img.shields.io/badge/Status-Live%20Demo-success.svg)")


def initialize_agent():
    """Initialize Arovia triage agent"""
    if st.session_state.agent is None:
        try:
            with st.spinner("Initializing Arovia AI Agent..."):
                st.session_state.agent = AroviaTriageAgent()
            st.success("✅ Arovia Agent initialized successfully!")
        except Exception as e:
            st.error(f"❌ Failed to initialize agent: {e}")
            st.stop()


def display_language_selector():
    """Display language selection for voice input"""
    st.subheader("🌐 Language Selection")
    
    if st.session_state.agent:
        languages = st.session_state.agent.get_supported_languages()
        
        # Create two columns for better layout
        col1, col2 = st.columns(2)
        
        with col1:
            st.markdown("**Major Indian Languages:**")
            major_languages = ["hindi", "english", "bengali", "telugu", "marathi", "tamil", "gujarati", "urdu", "kannada"]
            for lang in major_languages:
                if lang in languages:
                    st.markdown(f"• {lang.title()}")
        
        with col2:
            st.markdown("**Other Languages:**")
            other_languages = [lang for lang in languages.keys() if lang not in ["hindi", "english", "bengali", "telugu", "marathi", "tamil", "gujarati", "urdu", "kannada"]]
            for lang in other_languages[:10]:  # Show first 10
                st.markdown(f"• {lang.title()}")
        
        return languages
    return {}


def display_voice_input():
    """Display voice input interface"""
    st.subheader("🎤 Voice Input")
    
    if not st.session_state.agent:
        st.warning("Please initialize the agent first.")
        return
    
    # Language selection
    languages = st.session_state.agent.get_supported_languages()
    selected_lang = st.selectbox(
        "Select Language:",
        options=list(languages.keys()),
        format_func=lambda x: f"{x.title()} ({languages[x]})",
        index=0  # Default to first language
    )
    
    # Recording duration
    duration = st.slider("Recording Duration (seconds):", 5, 30, 10)
    
    # Record button
    if st.button("🎤 Start Recording", type="primary"):
        try:
            with st.spinner("Recording... Please speak now..."):
                voice_result, triage_result = st.session_state.agent.process_voice_to_triage(
                    language=languages[selected_lang],
                    duration=duration
                )
                
                st.session_state.voice_result = voice_result
                st.session_state.triage_result = triage_result
                
            st.success("✅ Recording and analysis completed!")
            
        except Exception as e:
            st.error(f"❌ Error during recording: {e}")


def display_location_input():
    """Display location input interface"""
    st.subheader("📍 Your Location")
    
    # Location input
    location = st.text_input(
        "Enter your location:",
        value=st.session_state.user_location,
        placeholder="Example: Hyderabad, Telangana or Banjara Hills, Hyderabad",
        help="Enter your city, area, or full address for nearby clinic recommendations"
    )
    
    if location:
        st.session_state.user_location = location
        st.success(f"📍 Location set: {location}")
    
    return location


def display_text_input():
    """Display text input interface"""
    st.subheader("📝 Text Input")
    
    if not st.session_state.agent:
        st.warning("Please initialize the agent first.")
        return
    
    # Text input
    patient_input = st.text_area(
        "Describe your symptoms:",
        placeholder="Example: I have severe chest pain for 30 minutes, radiating to my left arm...",
        height=100
    )
    
    # Analyze button
    if st.button("🔍 Analyze Symptoms", type="primary"):
        if patient_input.strip():
            try:
                with st.spinner("Analyzing symptoms..."):
                    if st.session_state.user_location:
                        # Complete triage with facility recommendations
                        referral_note = st.session_state.agent.complete_triage_with_facilities(
                            patient_input, st.session_state.user_location
                        )
                        st.session_state.referral_note = referral_note
                        st.session_state.triage_result = referral_note.triage_result
                    else:
                        # Basic triage without facilities
                        triage_result = st.session_state.agent.analyze_symptoms_from_text(patient_input)
                        st.session_state.triage_result = triage_result
                
                st.success("✅ Analysis completed!")
                
            except Exception as e:
                st.error(f"❌ Error during analysis: {e}")
        else:
            st.warning("Please enter your symptoms.")


def display_triage_result():
    """Display triage results"""
    if st.session_state.triage_result is None:
        return
    
    result = st.session_state.triage_result
    
    st.subheader("📊 Triage Assessment")
    
    # Urgency score with color coding
    urgency_score = result.urgency_score
    if urgency_score >= 9:
        urgency_color = "🔴"
        urgency_text = "IMMEDIATE"
    elif urgency_score >= 7:
        urgency_color = "🟡"
        urgency_text = "URGENT"
    else:
        urgency_color = "🟢"
        urgency_text = "STANDARD"
    
    # Display urgency
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Urgency Score", f"{urgency_score}/10", delta=None)
    with col2:
        st.metric("Category", f"{urgency_color} {urgency_text}")
    with col3:
        st.metric("Emergency", "🚨 YES" if result.emergency_detected else "✅ NO")
    
    # Chief complaint
    st.markdown(f"**Chief Complaint:** {result.chief_complaint}")
    
    # Symptoms
    if result.symptoms:
        st.markdown("**Identified Symptoms:**")
        for symptom in result.symptoms:
            severity_emoji = {"mild": "🟢", "moderate": "🟡", "severe": "🔴"}.get(symptom.severity, "⚪")
            st.markdown(f"• {severity_emoji} {symptom.name} ({symptom.severity})")
            if symptom.duration:
                st.markdown(f"  - Duration: {symptom.duration}")
            if symptom.associated_symptoms:
                st.markdown(f"  - Associated: {', '.join(symptom.associated_symptoms)}")
    
    # Red flags
    if result.red_flags:
        st.markdown("**🚨 Red Flags Detected:**")
        for flag in result.red_flags:
            flag_emoji = {"immediate": "🔴", "urgent": "🟡"}.get(flag.urgency_level, "⚪")
            st.markdown(f"• {flag_emoji} {flag.flag_type.upper()}: {flag.description}")
            st.markdown(f"  - Action: {flag.action_required}")
    
    # Potential risks
    if result.potential_risks:
        st.markdown("**⚠️ Potential Risks:**")
        for risk in result.potential_risks:
            risk_emoji = {"low": "🟢", "medium": "🟡", "high": "🔴"}.get(risk.probability, "⚪")
            st.markdown(f"• {risk_emoji} {risk.condition} ({risk.probability} probability)")
            st.markdown(f"  - Specialty: {risk.specialty_needed}")
    
    # Recommendations
    st.markdown("**🏥 Recommendations:**")
    st.markdown(f"• **Specialty:** {result.recommended_specialty}")
    st.markdown(f"• **Action:** {result.action_required}")
    
    # Emergency actions
    if result.emergency_detected:
        st.error("🚨 **EMERGENCY DETECTED - CALL 108 IMMEDIATELY**")
        st.markdown("**Immediate Actions Required:**")
        st.markdown("• Do NOT drive yourself")
        st.markdown("• Call emergency services (108)")
        st.markdown("• Proceed to nearest Emergency Room")
    
    # Voice input info (if available)
    if st.session_state.voice_result:
        st.markdown("---")
        st.markdown("**🎤 Voice Input Details:**")
        st.markdown(f"• **Transcribed:** {st.session_state.voice_result.transcribed_text}")
        st.markdown(f"• **Language:** {st.session_state.voice_result.language}")
        st.markdown(f"• **Confidence:** {st.session_state.voice_result.confidence:.2f}")
        st.markdown(f"• **Processing Time:** {st.session_state.voice_result.processing_time:.2f}s")


def display_recommended_facilities():
    """Display recommended healthcare facilities"""
    if not st.session_state.referral_note or not st.session_state.referral_note.recommended_facilities:
        return
    
    st.subheader("🏥 Recommended Healthcare Facilities")
    
    facilities = st.session_state.referral_note.recommended_facilities
    
    if not facilities:
        st.info("No nearby facilities found. Please try expanding your search radius or check a different location.")
        return
    
    # Display facilities
    for i, facility in enumerate(facilities, 1):
        with st.expander(f"{i}. {facility.name}", expanded=(i == 1)):
            col1, col2 = st.columns([2, 1])
            
            with col1:
                st.markdown(f"**📍 Address:** {facility.address}")
                st.markdown(f"**🏥 Specialty:** {facility.specialty.title()}")
                st.markdown(f"**📏 Distance:** {facility.distance_km} km")
                
                # Facility type badge
                facility_type = getattr(facility, 'facility_type', 'local')
                type_colors = {
                    'government': '🔵',
                    'private': '🟢', 
                    'ngo': '🟡',
                    'local': '⚪'
                }
                type_emoji = type_colors.get(facility_type, '⚪')
                st.markdown(f"**Type:** {type_emoji} {facility_type.title()}")
                
                # Services
                if facility.services:
                    st.markdown(f"**🩺 Services:** {', '.join(facility.services)}")
                
                # Contact info
                if facility.contact:
                    st.markdown(f"**📞 Contact:** {facility.contact}")
            
            with col2:
                if facility.map_link:
                    st.markdown(f"[🗺️ View on Map]({facility.map_link})")
                
                # Priority indicator
                if i == 1:
                    st.success("🥇 **Primary Recommendation**")
                elif i <= 3:
                    st.info(f"🥈 **Alternative {i-1}**")
                else:
                    st.info(f"🥉 **Option {i}**")
    
    # Summary
    st.markdown("---")
    st.markdown(f"**📊 Found {len(facilities)} facilities within your area**")
    
    # Facility type breakdown
    facility_types = {}
    for facility in facilities:
        facility_type = getattr(facility, 'facility_type', 'local')
        facility_types[facility_type] = facility_types.get(facility_type, 0) + 1
    
    if facility_types:
        st.markdown("**🏥 Facility Types:**")
        for facility_type, count in facility_types.items():
            type_emoji = {'government': '🔵', 'private': '🟢', 'ngo': '🟡', 'local': '⚪'}.get(facility_type, '⚪')
            st.markdown(f"• {type_emoji} {facility_type.title()}: {count}")


def display_referral_note():
    """Display complete referral note"""
    if not st.session_state.referral_note:
        return
    
    st.subheader("📋 Complete Referral Note")
    
    referral = st.session_state.referral_note
    
    # Download button for referral note
    if st.button("📥 Download Referral Note"):
        # Generate referral note text
        note_text = generate_referral_note_text(referral)
        
        # Create download
        st.download_button(
            label="Download as TXT",
            data=note_text,
            file_name=f"arovia_referral_{int(time.time())}.txt",
            mime="text/plain"
        )
    
    # Display referral note content
    with st.expander("📄 View Complete Referral Note", expanded=False):
        st.markdown(generate_referral_note_text(referral))


def generate_referral_note_text(referral: ReferralNote) -> str:
    """Generate formatted referral note text"""
    triage = referral.triage_result
    
    note = f"""
AROVIA HEALTH DESK AGENT - REFERRAL NOTE
{'='*50}

🩺 CLINICAL SUMMARY:
Chief Complaint: {triage.chief_complaint}
Duration: {getattr(triage, 'duration', 'Not specified')}
Severity: {getattr(triage, 'severity', 'Not specified')}
Associated Symptoms: {', '.join([s.name for s in triage.symptoms]) if triage.symptoms else 'None'}

⚡ URGENCY ASSESSMENT:
Score: {triage.urgency_score}/10 {'🔴' if triage.urgency_score >= 9 else '🟡' if triage.urgency_score >= 7 else '🟢'}
Red Flags: {'YES' if triage.red_flags else 'NO'}
Triage Category: {triage.triage_category.upper()}

⚠️ POTENTIAL RISKS:
"""
    
    if triage.potential_risks:
        for risk in triage.potential_risks:
            note += f"• {risk.condition} ({risk.probability} probability)\n"
    else:
        note += "• None identified\n"
    
    note += f"""
🏥 RECOMMENDED FACILITIES:
"""
    
    if referral.recommended_facilities:
        for i, facility in enumerate(referral.recommended_facilities, 1):
            note += f"""
{i}. {facility.name}
   📍 {facility.address}
   📏 {facility.distance_km} km • {facility.specialty.title()}
   🗺️ {facility.map_link}
"""
    else:
        note += "• No facilities found in the specified area\n"
    
    note += f"""
⏰ Generated: {referral.generated_at.strftime('%Y-%m-%d %H:%M:%S')}
🤖 Powered by Arovia v1.0

⚠️ DISCLAIMER: This is a triage support tool, not a medical diagnosis.
Please consult a healthcare professional for definitive medical advice.
"""
    
    return note


def display_sidebar():
    """Display sidebar with information"""
    with st.sidebar:
        st.markdown("## 🏥 Arovia System")
        st.markdown("AI-powered health triage assistant for India's healthcare system.")
        
        st.markdown("### 🔧 System Status")
        if st.session_state.agent:
            st.success("✅ Agent Ready")
            
            # Model info
            model_info = st.session_state.agent.get_model_info()
            st.markdown("**AI Models:**")
            st.markdown(f"• Whisper: {model_info['whisper']['model']}")
            st.markdown(f"• Groq: {model_info['groq']['model']}")
            st.markdown(f"• Languages: {model_info['whisper']['supported_languages']}")
        else:
            st.error("❌ Agent Not Ready")
        
        st.markdown("### 📊 Quick Stats")
        if st.session_state.triage_result:
            result = st.session_state.triage_result
            st.metric("Urgency Score", f"{result.urgency_score}/10")
            st.metric("Symptoms", len(result.symptoms))
            st.metric("Red Flags", len(result.red_flags))
            st.metric("Emergency", "Yes" if result.emergency_detected else "No")
        
        st.markdown("### 🚨 Emergency")
        st.markdown("**If this is a medical emergency, call 108 immediately.**")
        
        st.markdown("### ⚠️ Disclaimer")
        st.markdown("""
        Arovia is a triage support tool and does NOT provide medical diagnoses. 
        This assessment should not replace consultation with qualified healthcare professionals.
        """)


def main():
    """Main application function"""
    # Setup
    setup_page()
    initialize_session_state()
    
    # Display header
    display_header()
    
    # Initialize agent
    initialize_agent()
    
    # Create main layout
    col1, col2 = st.columns([2, 1])
    
    with col1:
        # Location input
        display_location_input()
        
        # Input methods
        tab1, tab2 = st.tabs(["🎤 Voice Input", "📝 Text Input"])
        
        with tab1:
            display_voice_input()
        
        with tab2:
            display_text_input()
        
        # Display results
        if st.session_state.triage_result:
            display_triage_result()
        
        # Display recommended facilities
        if st.session_state.referral_note:
            display_recommended_facilities()
            display_referral_note()
    
    with col2:
        # Sidebar content
        display_sidebar()
        
        # Language info
        st.markdown("### 🌐 Supported Languages")
        if st.session_state.agent:
            languages = st.session_state.agent.get_supported_languages()
            for lang, code in list(languages.items())[:10]:  # Show first 10
                st.markdown(f"• {lang.title()}")


if __name__ == "__main__":
    main()
