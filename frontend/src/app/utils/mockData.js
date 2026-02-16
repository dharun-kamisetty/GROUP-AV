import i18n from '../../i18n';

export const MOCK_FACILITIES = [
  {
    id: '1',
    name: 'Apollo Hospital',
    type: 'Hospital',
    specialty: ['Cardiology', 'Neurology', 'Emergency'],
    distance: 2.3,
    address: 'Jubilee Hills, Hyderabad',
    phone: '+91-40-23607777',
    whatsapp: '+919876543210',
    latitude: 17.4326,
    longitude: 78.4071,
    isOpen24x7: true,
    rating: 4.5
  },
  {
    id: '2',
    name: 'AIIMS Emergency',
    type: 'Emergency',
    specialty: ['Emergency', 'Trauma'],
    distance: 3.5,
    address: 'Ansari Nagar, New Delhi',
    phone: '+91-11-26588500',
    whatsapp: '+919876543211',
    latitude: 28.5672,
    longitude: 77.2100,
    isOpen24x7: true,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Fortis Hospital',
    type: 'Hospital',
    specialty: ['Orthopedics', 'General Medicine', 'Pediatrics'],
    distance: 4.2,
    address: 'Bannerghatta Road, Bangalore',
    phone: '+91-80-66214444',
    whatsapp: '+919876543212',
    latitude: 12.9121,
    longitude: 77.5937,
    isOpen24x7: false,
    rating: 4.3
  },
  {
    id: '4',
    name: 'Primary Health Center',
    type: 'Primary Health Center',
    specialty: ['General Medicine', 'Pediatrics'],
    distance: 1.1,
    address: 'Sector 15, Urban Area',
    phone: '+91-22-12345678',
    latitude: 19.0760,
    longitude: 72.8777,
    isOpen24x7: false,
    rating: 3.8
  },
  {
    id: '5',
    name: 'Max Super Specialty Hospital',
    type: 'Hospital',
    specialty: ['Oncology', 'Cardiology', 'Neurosurgery'],
    distance: 5.8,
    address: 'Saket, New Delhi',
    phone: '+91-11-26515050',
    whatsapp: '+919876543213',
    latitude: 28.5244,
    longitude: 77.2066,
    isOpen24x7: true,
    rating: 4.6
  },
  {
    id: '6',
    name: 'City Clinic',
    type: 'Clinic',
    specialty: ['General Medicine'],
    distance: 0.8,
    address: 'Main Market Road',
    phone: '+91-80-98765432',
    latitude: 12.9716,
    longitude: 77.5946,
    isOpen24x7: false,
    rating: 4.0
  }
];

export function analyzeSymptoms(symptoms) {
  const lowerSymptoms = symptoms.toLowerCase();

  // Emergency keywords
  const emergencyKeywords = [
    'chest pain', 'heart attack', 'stroke', 'seizure', 'unconscious',
    'severe bleeding', 'breathing difficulty', 'suicide', 'overdose',
    'severe burn', 'paralysis', 'head injury'
  ];

  const redFlagKeywords = [
    'blood', 'severe pain', 'high fever', 'vomiting', 'dizziness',
    'confusion', 'weakness', 'numbness', 'shortness of breath'
  ];

  const emergencyDetected = emergencyKeywords.some(keyword =>
    lowerSymptoms.includes(keyword)
  );

  const redFlagsFound = redFlagKeywords.filter(keyword =>
    lowerSymptoms.includes(keyword)
  );

  let urgencyScore = 3;
  let urgencyLevel = i18n.t('results.low');

  if (emergencyDetected) {
    urgencyScore = 10;
    urgencyLevel = i18n.t('results.critical');
  } else if (redFlagsFound.length >= 3) {
    urgencyScore = 8;
    urgencyLevel = i18n.t('results.high');
  } else if (redFlagsFound.length >= 1) {
    urgencyScore = 6;
    urgencyLevel = i18n.t('results.moderate');
  }

  const recommendations = [];

  if (emergencyDetected) {
    recommendations.push(i18n.t('results.call108'));
    recommendations.push(i18n.t('results.nearestER'));
    recommendations.push(i18n.t('results.noDrive'));
  } else if (urgencyScore >= 8) {
    recommendations.push(i18n.t('results.seek2_4'));
    recommendations.push(i18n.t('results.visitUrgent'));
    recommendations.push(i18n.t('results.monitorClose'));
  } else if (urgencyScore >= 6) {
    recommendations.push(i18n.t('results.schedule24_48'));
    recommendations.push(i18n.t('results.monitorWorsen'));
    recommendations.push(i18n.t('results.restHydrate'));
  } else {
    recommendations.push(i18n.t('results.selfCare'));
    recommendations.push(i18n.t('results.regularVisit'));
    recommendations.push(i18n.t('results.restHydrate'));
  }

  return {
    urgencyScore,
    urgencyLevel,
    emergencyDetected,
    redFlags: redFlagsFound.length > 0 ? redFlagsFound : undefined,
    recommendations,
    specialtyRecommended: determineSpecialty(lowerSymptoms)
  };
}

function determineSpecialty(symptoms) {
  if (symptoms.includes('chest') || symptoms.includes('heart')) {
    return 'Cardiology';
  }
  if (symptoms.includes('head') || symptoms.includes('brain') || symptoms.includes('stroke')) {
    return 'Neurology';
  }
  if (symptoms.includes('bone') || symptoms.includes('fracture') || symptoms.includes('joint')) {
    return 'Orthopedics';
  }
  if (symptoms.includes('child') || symptoms.includes('baby')) {
    return 'Pediatrics';
  }
  return 'General Medicine';
}

export function getNearbyFacilities(
  userLocation,
  maxDistance = 10,
  specialty
) {
  let facilities = [...MOCK_FACILITIES];

  // Filter by distance
  facilities = facilities.filter(f => f.distance <= maxDistance);

  // Filter by specialty if provided
  if (specialty) {
    facilities = facilities.filter(f =>
      f.specialty?.includes(specialty)
    );
  }

  // Sort by distance
  facilities.sort((a, b) => a.distance - b.distance);

  return facilities;
}

export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        // Fallback to default location (New Delhi)
        console.warn('Geolocation error:', error);
        resolve({
          latitude: 28.6139,
          longitude: 77.2090
        });
      }
    );
  });
}
