"""
Utility to generate health reports in PDF format
"""
from fpdf import FPDF
import datetime
from models.schemas import TriageResult

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'Health Report', 0, 1, 'C')

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

def generate_health_report(triage_result: TriageResult, patient_name: str = "Anonymous") -> str:
    """
    Generate a PDF health report from a TriageResult

    Args:
        triage_result: The TriageResult object
        patient_name: The name of the patient

    Returns:
        The path to the generated PDF file
    """
    pdf = PDF()
    pdf.add_page()
    pdf.set_font('Arial', '', 12)

    pdf.cell(0, 10, f"Patient Name: {patient_name}", 0, 1)
    pdf.cell(0, 10, f"Report Date: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", 0, 1)
    pdf.ln(10)

    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, "Triage Assessment", 0, 1)
    pdf.set_font('Arial', '', 12)

    pdf.multi_cell(0, 10, f"Chief Complaint: {triage_result.chief_complaint}")
    pdf.multi_cell(0, 10, f"Urgency Score: {triage_result.urgency_score}/10")
    pdf.multi_cell(0, 10, f"Triage Category: {triage_result.triage_category}")
    pdf.multi_cell(0, 10, f"Emergency Detected: {'Yes' if triage_result.emergency_detected else 'No'}")
    pdf.multi_cell(0, 10, f"Recommended Specialty: {triage_result.recommended_specialty}")
    pdf.multi_cell(0, 10, f"Action Required: {triage_result.action_required}")
    pdf.ln(5)

    if triage_result.symptoms:
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, "Symptoms", 0, 1)
        pdf.set_font('Arial', '', 12)
        for symptom in triage_result.symptoms:
            pdf.multi_cell(0, 10, f"- {symptom.name} (Severity: {symptom.severity}, Duration: {symptom.duration})")
        pdf.ln(5)

    if triage_result.red_flags:
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, "Red Flags", 0, 1)
        pdf.set_font('Arial', '', 12)
        for flag in triage_result.red_flags:
            pdf.multi_cell(0, 10, f"- {flag.description} (Urgency: {flag.urgency_level})")
        pdf.ln(5)

    if triage_result.potential_risks:
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, "Potential Risks", 0, 1)
        pdf.set_font('Arial', '', 12)
        for risk in triage_result.potential_risks:
            pdf.multi_cell(0, 10, f"- {risk.condition} (Probability: {risk.probability})")
        pdf.ln(5)

    report_path = f"/tmp/health_report_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    pdf.output(report_path)
    return report_path
