export const generateReferralNote = (triage, facilities) => {
    const timestamp = new Date().toLocaleString();

    let note = `AROVIA HEALTH DESK AGENT - REFERRAL NOTE
==================================================

🩺 CLINICAL SUMMARY:
Chief Complaint: ${triage.chief_complaint}
Urgency Score: ${triage.urgency_score}/10 (${triage.urgency_score >= 9 ? 'IMMEDIATE' : triage.urgency_score >= 7 ? 'URGENT' : 'STANDARD'})
Emergency Detected: ${triage.emergency_detected ? 'YES' : 'NO'}
Recommended Specialty: ${triage.recommended_specialty}

🚨 RED FLAGS:
${triage.red_flags.length > 0
            ? triage.red_flags.map(f => `• ${f.flag_type}: ${f.description} (Action: ${f.action_required})`).join('\n')
            : 'None identified'}

⚠️ POTENTIAL RISKS:
${triage.potential_risks.length > 0
            ? triage.potential_risks.map(r => `• ${r.condition} (${r.probability} probability)`).join('\n')
            : 'None identified'}

🏥 RECOMMENDED FACILITIES:
`;

    if (facilities.length > 0) {
        facilities.forEach((f, i) => {
            note += `
${i + 1}. ${f.name}
   📍 ${f.address}
   📏 ${f.distance_km} km • ${f.specialty_match}
   ${f.contact ? `📞 ${f.contact}` : ''}
   🔗 ${f.map_link || 'No map link'}
`;
        });
    } else {
        note += '\nNo facilities found in the searched area.\n';
    }

    note += `
--------------------------------------------------
⏰ Generated: ${timestamp}
🤖 Powered by Arovia Health Desk
⚠️ DISCLAIMER: This is a triage support tool, not a medical diagnosis.
Please consult a healthcare professional.
`;

    return note;
};

export const downloadReferralNote = (triage, facilities) => {
    const text = generateReferralNote(triage, facilities);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arovia_referral_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
