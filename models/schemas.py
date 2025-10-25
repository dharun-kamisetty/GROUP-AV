"""
Pydantic models for structured medical triage outputs
"""
from typing import List, Optional, Literal
from pydantic import BaseModel, Field
from datetime import datetime


class Symptom(BaseModel):
    """Individual symptom with details"""
    name: str = Field(description="Name of the symptom")
    severity: Literal["mild", "moderate", "severe"] = Field(description="Severity level")
    duration: Optional[str] = Field(description="Duration of the symptom", default=None)
    associated_symptoms: List[str] = Field(description="Related symptoms", default_factory=list)


class RedFlag(BaseModel):
    """Red flag indicators for emergency conditions"""
    flag_type: Literal["cardiac", "neurological", "respiratory", "trauma", "mental_health", "other"]
    description: str = Field(description="Description of the red flag")
    urgency_level: Literal["immediate", "urgent"] = Field(description="Urgency level")
    action_required: str = Field(description="Immediate action required")


class PotentialRisk(BaseModel):
    """Potential medical conditions or risks"""
    condition: str = Field(description="Name of potential condition")
    probability: Literal["low", "medium", "high"] = Field(description="Probability level")
    specialty_needed: str = Field(description="Required medical specialty")


class TriageResult(BaseModel):
    """Complete triage assessment result"""
    chief_complaint: str = Field(description="Primary complaint from patient")
    symptoms: List[Symptom] = Field(description="List of identified symptoms")
    urgency_score: int = Field(ge=1, le=10, description="Urgency score from 1-10")
    red_flags: List[RedFlag] = Field(description="Red flag indicators", default_factory=list)
    potential_risks: List[PotentialRisk] = Field(description="Potential medical risks", default_factory=list)
    recommended_specialty: str = Field(description="Recommended medical specialty")
    triage_category: Literal["immediate", "urgent", "standard"] = Field(description="Triage category")
    emergency_detected: bool = Field(description="Whether emergency conditions are detected")
    action_required: str = Field(description="Immediate action required")
    timestamp: datetime = Field(default_factory=datetime.now, description="Assessment timestamp")
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class VoiceInput(BaseModel):
    """Voice input processing result"""
    audio_file_path: str = Field(description="Path to audio file")
    transcribed_text: str = Field(description="Transcribed text from audio")
    language: str = Field(description="Detected language")
    confidence: float = Field(ge=0.0, le=1.0, description="Transcription confidence")
    processing_time: float = Field(description="Processing time in seconds")


class MedicalRelevance(BaseModel):
    """Schema for checking medical relevance of a text"""
    is_relevant: bool = Field(description="Whether the text is medically relevant")
    reason: str = Field(description="Reason for the relevance decision")


class FacilityInfo(BaseModel):
    """Healthcare facility information"""
    name: str = Field(description="Facility name")
    address: str = Field(description="Full address")
    distance_km: float = Field(description="Distance in kilometers")
    specialty: str = Field(description="Medical specialty")
    services: List[str] = Field(description="Available services")
    contact: Optional[str] = Field(description="Contact information", default=None)
    map_link: Optional[str] = Field(description="Google Maps link", default=None)


class ReferralNote(BaseModel):
    """Complete referral note for healthcare providers"""
    patient_id: Optional[str] = Field(description="Patient identifier", default=None)
    triage_result: TriageResult = Field(description="Triage assessment")
    recommended_facilities: List[FacilityInfo] = Field(description="Recommended facilities")
    generated_at: datetime = Field(default_factory=datetime.now)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
