import React, { useState, useEffect } from 'react';
import { MapPinIcon, PhoneIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const Facilities = ({ facilities, loading }) => {
  const { t } = useTranslation();
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredFacilities, setFilteredFacilities] = useState(facilities);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    setFilteredFacilities(facilities);
  }, [facilities]);

  const handleSearch = async (e, coords) => {
    if (e) e.preventDefault();

    // Allow search if we have location text OR coordinates
    if (!searchLocation.trim() && !coords) return;

    try {
      const payload = { location: searchLocation };
      if (coords) {
        payload.coordinates = coords;
      }

      const response = await fetch('http://localhost:8000/facilities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setFilteredFacilities(data);
      }
    } catch (error) {
      console.error('Error searching facilities:', error);
    }
  };

  const handleLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSearchLocation(`Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
          setIsLocating(false);
          // Auto-trigger search with coordinates
          handleSearch(undefined, { latitude, longitude });
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

  const getFacilityTypeColor = (type) => {
    switch (type) {
      case 'government': return 'bg-blue-100 text-blue-800';
      case 'private': return 'bg-green-100 text-green-800';
      case 'ngo': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFacilityTypeIcon = (type) => {
    switch (type) {
      case 'government': return '🏛️';
      case 'private': return '🏥';
      case 'ngo': return '🤝';
      default: return '🏢';
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="card text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('facilities.loadingTitle')}</h2>
          <p className="text-gray-600">{t('facilities.loadingDesc')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="card mb-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
            <MapPinIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('facilities.heading')}</h1>
            <p className="text-gray-600">{t('facilities.subheading')}</p>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={(e) => handleSearch(e)} className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder={t('facilities.searchPlaceholder')}
              className="input-field pr-12"
            />
            <button
              type="button"
              onClick={handleLocation}
              disabled={isLocating}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-primary-600 rounded-full hover:bg-gray-100 transition-colors"
              title="Use current location"
            >
              {isLocating ? (
                <div className="animate-spin h-5 w-5 border-2 border-primary-600 border-t-transparent rounded-full" />
              ) : (
                <MapPinIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          <button type="submit" className="btn-primary">
            {t('facilities.searchButton')}
          </button>
        </form>
      </div>

      {/* Results */}
      {filteredFacilities.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('facilities.foundFacilities', { count: filteredFacilities.length })}
            </h2>
            <div className="text-sm text-gray-600">
              {t('facilities.sortedBy')}
            </div>
          </div>

          {filteredFacilities.map((facility, index) => (
            <div key={index} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
                    <span className={`status-badge ${getFacilityTypeColor(facility.facility_type)}`}>
                      {getFacilityTypeIcon(facility.facility_type)} {facility.facility_type}
                    </span>
                    {index === 0 && (
                      <span className="status-badge bg-yellow-100 text-yellow-800">
                        {t('facilities.recommended')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">{facility.address}</span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {facility.distance_km} {t('facilities.kmAway')}
                    </span>
                    <span className="text-blue-600 font-medium">{facility.specialty_match}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    #{index + 1}
                  </div>
                  <div className="text-sm text-gray-500">{t('facilities.priority')}</div>
                </div>
              </div>

              {/* Services */}
              {facility.services.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{t('facilities.servicesAvailable')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {facility.services.map((service, serviceIndex) => (
                      <span
                        key={serviceIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact and Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  {facility.contact && (
                    <div className="flex items-center text-sm text-gray-600">
                      <PhoneIcon className="w-4 h-4 mr-1" />
                      <span>{facility.contact}</span>
                    </div>
                  )}
                  <a
                    href={facility.map_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {t('facilities.viewOnMap')}
                  </a>
                </div>

                <div className="flex space-x-2">
                  <button className="btn-secondary text-sm">
                    {t('facilities.saveButton')}
                  </button>
                  <button className="btn-primary text-sm">
                    {t('facilities.directionsButton')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center">
          <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('facilities.noFacilitiesTitle')}</h3>
          <p className="text-gray-600 mb-4">
            {t('facilities.noFacilitiesDesc')}
          </p>
          <button
            onClick={() => setSearchLocation('')}
            className="btn-primary"
          >
            {t('facilities.clearButton')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Facilities;
