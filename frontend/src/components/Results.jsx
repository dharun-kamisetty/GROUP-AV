import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ExclamationTriangleIcon,
  MapPinIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { downloadReferralNote } from '../utils/download';

const Results = ({ triageResult, facilities, loading, error }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('results.loading')}</h2>
          <p className="text-gray-600">{t('results.loadingDesc')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('results.errorTitle')}</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              {t('results.tryAgainButton')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!triageResult) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('results.noResultsTitle')}</h2>
          <p className="text-gray-600 mb-6">{t('results.noResultsDesc')}</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            {t('results.startButton')}
          </button>
        </div>
      </div>
    );
  }

  const getUrgencyColor = (score) => {
    if (score >= 9) return 'text-red-600 bg-red-100';
    if (score >= 7) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getUrgencyText = (score) => {
    if (score >= 9) return t('results.immediate');
    if (score >= 7) return t('results.urgent');
    return t('results.standard');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('results.heading')}</h1>
            <p className="text-gray-600">{t('results.subheading')}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => downloadReferralNote(triageResult, facilities)}
              className="btn-secondary flex items-center gap-2"
              disabled={loading}
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              {t('results.downloadButton')}
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              {t('results.newAssessment')}
            </button>
          </div>
        </div>

        {/* Urgency Score */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(triageResult.urgency_score)}`}>
              {getUrgencyText(triageResult.urgency_score)}
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {triageResult.urgency_score}/10
            </p>
            <p className="text-sm text-gray-600">{t('results.urgencyScore')}</p>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {triageResult.recommended_specialty}
            </div>
            <p className="text-sm text-gray-600">{t('results.recommendedSpecialty')}</p>
          </div>

          <div className="text-center">
            <div className={`text-2xl font-bold ${triageResult.emergency_detected ? 'text-red-600' : 'text-green-600'}`}>
              {triageResult.emergency_detected ? t('results.yes') : t('results.no')}
            </div>
            <p className="text-sm text-gray-600">{t('results.emergencyDetected')}</p>
          </div>
        </div>

        {/* Chief Complaint */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('results.chiefComplaint')}</h3>
          <p className="text-gray-700 bg-gray-50 rounded-lg p-4">{triageResult.chief_complaint}</p>
        </div>
      </div>

      {/* Red Flags */}
      {triageResult.red_flags.length > 0 && (
        <div className="card">
          <div className="flex items-center mb-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">{t('results.redFlagsTitle')}</h3>
          </div>
          <div className="space-y-3">
            {triageResult.red_flags.map((flag, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="font-medium text-red-900">{flag.flag_type}</div>
                <p className="text-red-800 text-sm mt-1">{flag.description}</p>
                <p className="text-red-700 text-sm mt-2 font-medium">{t('results.action')}: {flag.action_required}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Potential Risks */}
      {triageResult.potential_risks.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('results.potentialRisks')}</h3>
          <div className="space-y-3">
            {triageResult.potential_risks.map((risk, index) => (
              <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-yellow-900">{risk.condition}</div>
                    <p className="text-yellow-800 text-sm mt-1">{t('results.specialty')}: {risk.specialty_needed}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${risk.probability === 'high' ? 'bg-red-100 text-red-800' :
                    risk.probability === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                    {risk.probability === 'high' ? t('results.highProbability') :
                      risk.probability === 'medium' ? t('results.mediumProbability') :
                        t('results.lowProbability')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('results.recommendations')}</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-900 font-medium">{triageResult.action_required}</p>
        </div>
      </div>

      {/* Emergency Alert */}
      {triageResult.emergency_detected && (
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-center mb-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-red-900">{t('results.emergencyTitle')}</h3>
          </div>
          <div className="space-y-2 text-red-800">
            <p className="font-medium">{t('results.emergencyCall')}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('results.emergencyTip1')}</li>
              <li>{t('results.emergencyTip2')}</li>
              <li>{t('results.emergencyTip3')}</li>
            </ul>
          </div>
        </div>
      )}

      {/* Facilities */}
      {facilities.length > 0 && (
        <div className="card">
          <div className="flex items-center mb-4">
            <MapPinIcon className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">{t('results.nearbyFacilities')}</h3>
          </div>
          <div className="space-y-4">
            {facilities.slice(0, 3).map((facility, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{facility.name}</h4>
                  <span className="text-sm text-gray-600">{facility.distance_km} km</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{facility.address}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-blue-600">{facility.specialty_match}</span>
                  <span className="text-gray-500">{facility.facility_type}</span>
                  {facility.contact && (
                    <span className="text-gray-500">{facility.contact}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
