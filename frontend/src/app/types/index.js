/**
 * @typedef {Object} TriageResult
 * @property {number} urgencyScore
 * @property {'Low' | 'Moderate' | 'High' | 'Critical'} urgencyLevel
 * @property {boolean} emergencyDetected
 * @property {string[]} [redFlags]
 * @property {string[]} recommendations
 * @property {string} [specialtyRecommended]
 */

/**
 * @typedef {Object} HealthFacility
 * @property {string} id
 * @property {string} name
 * @property {'Hospital' | 'Clinic' | 'Primary Health Center' | 'Emergency'} type
 * @property {string[]} [specialty]
 * @property {number} distance - in km
 * @property {string} address
 * @property {string} phone
 * @property {string} [whatsapp]
 * @property {number} latitude
 * @property {number} longitude
 * @property {boolean} isOpen24x7
 * @property {number} [rating]
 */

/**
 * @typedef {Object} Location
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * @typedef {Object} VoiceRecording
 * @property {string} transcription
 * @property {string} language
 * @property {number} [confidence]
 */

/**
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {'user' | 'assistant'} role
 * @property {string} content
 * @property {Date} timestamp
 */

/**
 * @typedef {Object} SavedTriage
 * @property {string} id
 * @property {string} symptoms
 * @property {TriageResult} result
 * @property {Date} timestamp
 * @property {Location} [location]
 */

// Export empty objects as type references for runtime compatibility
export const TriageResult = {};
export const HealthFacility = {};
export const Location = {};
export const VoiceRecording = {};
export const ChatMessage = {};
export const SavedTriage = {};
