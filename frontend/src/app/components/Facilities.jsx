import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Phone,
  MessageCircle,
  Navigation,
  MapPin,
  Clock,
  Star,
  Search,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { getNearbyFacilities, getUserLocation } from '../utils/mockData';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'motion/react';

// Fix for default marker icon in react-leaflet
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom marker for user location (blue)
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom marker for facilities (red)
const facilityIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export function Facilities() {
  const { t } = useTranslation();
  const location = useLocation();
  const { result } = location.state || {};

  const [facilities, setFacilities] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState([28.6139, 77.2090]);

  useEffect(() => {
    loadFacilities();
  }, [result]);

  const loadFacilities = async () => {
    const loc = await getUserLocation();
    setUserLocation([loc.latitude, loc.longitude]);
    const nearbyFacilities = getNearbyFacilities(loc, 10);
    setFacilities(nearbyFacilities);
  };

  const filterTabs = [
    { id: 'all', label: t('facilities.filterAll') },
    { id: 'trauma', label: t('facilities.filterTrauma') },
    { id: 'cardiology', label: t('facilities.filterCardiology') },
    { id: 'pediatrics', label: t('facilities.filterPediatrics') },
    { id: 'oncology', label: t('facilities.filterOncology') },
    { id: 'emergency', label: t('facilities.filterEmergency') },
    { id: 'neurology', label: t('facilities.filterNeurology') },
  ];

  const getDirections = (facility) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.latitude},${facility.longitude}`;
    window.open(url, '_blank');
  };

  // Filter facilities
  const filteredFacilities = facilities.filter(f => {
    const matchesSearch = searchQuery === '' ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedFilter === 'all' ||
      f.specialty?.some(s => s.toLowerCase().includes(selectedFilter));

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 py-6">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t('facilities.title')}
          </h1>
          <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {t('facilities.resultsCount', { count: filteredFacilities.length })}
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder={t('facilities.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-2 scrollbar-hide">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedFilter === tab.id
                ? 'bg-cyan-600 text-white'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Emergency Alert */}
        {result?.emergencyDetected && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <p className="text-red-700 dark:text-red-400 font-medium text-sm">
              {t('facilities.emergencyAlert')}
            </p>
          </motion.div>
        )}

        {/* Two-Column Layout: List + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left: Facility List */}
          <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {filteredFacilities.map((facility, index) => (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    {/* Top Row: Name, Badge, Distance */}
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          {facility.name}
                        </h3>
                        {facility.isOpen24x7 && (
                          <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold px-2 py-0.5">
                            24/7 ER
                          </Badge>
                        )}
                      </div>
                      <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm whitespace-nowrap">
                        {facility.distance} km
                      </span>
                    </div>

                    {/* Subtitle */}
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                      {facility.type}
                    </p>

                    {/* Rating */}
                    {facility.rating && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {facility.rating}
                        </span>
                        <span className="text-sm text-slate-400 dark:text-slate-500">
                          ({Math.floor(Math.random() * 2000 + 500)})
                        </span>
                      </div>
                    )}

                    {/* Specialty Tags */}
                    {facility.specialty && facility.specialty.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {facility.specialty.slice(0, 3).map((spec) => (
                          <Badge
                            key={spec}
                            variant="secondary"
                            className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                          >
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Open Status & Address */}
                    <div className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
                      <Clock className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">{t('facilities.openNow')}</span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                      <span className="line-clamp-1">{facility.address}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <a href={`tel:${facility.phone}`} className="flex-1">
                        <Button size="sm" className="w-full gap-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg h-9">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </a>
                      {facility.whatsapp && (
                        <a href={`https://wa.me/${facility.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className="gap-2 rounded-lg h-9 w-10 p-0 border-slate-200 dark:border-slate-700">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 rounded-lg h-9 w-10 p-0 border-slate-200 dark:border-slate-700"
                        onClick={() => getDirections(facility)}
                      >
                        <Navigation className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 rounded-lg h-9 w-10 p-0 border-slate-200 dark:border-slate-700"
                        onClick={() => getDirections(facility)}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {filteredFacilities.length === 0 && (
              <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <CardContent className="p-8 text-center">
                  <MapPin className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">
                    No facilities found. Try adjusting your search or filter.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right: Map */}
          <div className="hidden lg:block">
            <div className="h-[calc(100vh-280px)] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
              <MapContainer
                center={userLocation}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* User location marker (blue) */}
                <Marker position={userLocation} icon={userIcon}>
                  <Popup>
                    <strong>{t('facilities.yourLocation')}</strong>
                  </Popup>
                </Marker>

                {/* Facility markers (red) */}
                {filteredFacilities.map((facility) => (
                  <Marker
                    key={facility.id}
                    position={[facility.latitude, facility.longitude]}
                    icon={facilityIcon}
                  >
                    <Popup>
                      <div className="p-1 min-w-[180px]">
                        <h3 className="font-bold text-sm mb-1">{facility.name}</h3>
                        <p className="text-xs text-gray-600 mb-1">{facility.type}</p>
                        <p className="text-xs text-gray-500 mb-2">{facility.distance} {t('facilities.distanceUnit') || "km away"}</p>
                        <div className="flex gap-1">
                          <a href={`tel:${facility.phone}`}>
                            <Button size="sm" className="h-7 text-xs px-2 bg-cyan-600 hover:bg-cyan-700">
                              <Phone className="w-3 h-3 mr-1" />
                              {t('facilities.call') || "Call"}
                            </Button>
                          </a>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs px-2"
                            onClick={() => getDirections(facility)}
                          >
                            <Navigation className="w-3 h-3 mr-1" />
                            {t('facilities.go') || "Go"}
                          </Button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Mobile Map Toggle Button */}
        <div className="lg:hidden mt-4">
          <Button
            size="lg"
            variant="outline"
            className="w-full gap-2 rounded-xl border-slate-200 dark:border-slate-800"
            onClick={() => {
              const url = `https://www.google.com/maps/search/hospitals/@${userLocation[0]},${userLocation[1]},14z`;
              window.open(url, '_blank');
            }}
          >
            <MapPin className="w-5 h-5" />
            View on Map
          </Button>
        </div>
      </div>
    </div>
  );
}
