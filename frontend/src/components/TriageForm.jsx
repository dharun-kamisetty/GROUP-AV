import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentTextIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const TriageForm = ({ onSubmit, loading, error }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [symptoms, setSymptoms] = useState('');
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState(undefined);
  const [isLocating, setIsLocating] = useState(false);

  const handleLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
          setLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not detect location. Please enter manually.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setIsLocating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symptoms.trim()) {
      onSubmit(symptoms.trim(), location.trim() || undefined, coordinates);
      navigate('/results');
    }
  };

  const exampleSymptoms = [
    t('triageForm.example1'),
    t('triageForm.example2'),
    t('triageForm.example3'),
    t('triageForm.example4'),
    t('triageForm.example5')
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card shadow-lg">
        <div className="flex items-center mb-8 border-b border-gray-100 pb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-5">
            <DocumentTextIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('triageForm.heading')}</h1>
            <p className="text-gray-500 mt-1">{t('triageForm.subheading')}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="symptoms" className="block text-sm font-semibold text-gray-700 mb-2">
              {t('triageForm.symptomsLabel')} <span className="text-red-500">{t('triageForm.required')}</span>
            </label>
            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder={t('triageForm.symptomsPlaceholder')}
              className="input-field h-40 resize-none text-base leading-relaxed bg-gray-50/50"
              required
            />
            <p className="mt-2 text-xs text-gray-400">
              {t('triageForm.symptomsHint')}
            </p>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
              {t('triageForm.locationLabel')}
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-gray-400">
                <MapPinIcon className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t('triageForm.locationPlaceholder')}
                className="input-field pl-10 pr-12 bg-gray-50/50"
              />
              <button
                type="button"
                onClick={handleLocation}
                disabled={isLocating}
                className="absolute right-2 p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                title="Detect my location"
              >
                {isLocating ? (
                  <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-blue-600 rounded-full" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Example Symptoms */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {t('triageForm.quickSelectLabel')}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exampleSymptoms.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSymptoms(example)}
                  className="text-left px-4 py-3 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-xl text-sm text-gray-600 hover:text-blue-700 transition-all duration-200 shadow-sm"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center space-x-3 text-red-700">
              <span className="text-xl">⚠️</span>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
            >
              {t('triageForm.cancelButton')}
            </button>
            <button
              type="submit"
              disabled={loading || !symptoms.trim()}
              className="btn-primary flex-1 py-3 text-lg font-medium shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                  <span>{t('triageForm.analyzingButton')}</span>
                </div>
              ) : (
                t('triageForm.submitButton')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TriageForm;
