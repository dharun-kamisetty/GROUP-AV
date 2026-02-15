"""
Facility Matching Engine for Arovia
Integrates with Google Maps Platform (Places & Geocoding APIs)
"""
import os
import googlemaps
from typing import List, Dict, Any, Optional, Tuple
from geopy.distance import geodesic
from models.schemas import FacilityInfo
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class FacilityMatcher:
    """Facility matching engine using Google Maps Platform"""
    
    def __init__(self):
        """Initialize facility matcher with Google Maps client"""
        api_key = os.getenv("GOOGLE_MAPS_API_KEY")
        if not api_key or api_key.startswith("your_"):
            print("Warning: GOOGLE_MAPS_API_KEY not configured. Facility search will be limited.")
            self.client = None
        else:
            try:
                self.client = googlemaps.Client(key=api_key)
            except ValueError as e:
                print(f"Warning: Invalid GOOGLE_MAPS_API_KEY: {e}. Facility search will be limited.")
                self.client = None
        
        # Medical specialty mappings
        self.specialty_mappings = {
            "cardiology": ["cardiologist", "heart hospital"],
            "neurology": ["neurologist", "neuro hospital"],
            "pulmonology": ["pulmonologist", "chest clinic"],
            "orthopedics": ["orthopedic", "bone clinic"],
            "pediatrics": ["pediatrician", "children hospital"],
            "gynecology": ["gynecologist", "maternity hospital"],
            "dermatology": ["dermatologist", "skin clinic"],
            "psychiatry": ["psychiatrist", "mental health clinic"],
            "emergency": ["emergency room", "trauma center"],
            "general": ["general physician", "medical clinic"]
        }
    
    def geocode_location(self, location: str) -> Optional[Tuple[float, float]]:
        """
        Convert location string to coordinates using Google Geocoding API
        """
        if not self.client:
            return None
            
        try:
            result = self.client.geocode(location)
            if result:
                loc = result[0]['geometry']['location']
                return (loc['lat'], loc['lng'])
            return None
        except Exception as e:
            print(f"Error geocoding location '{location}': {e}")
            return None
    
    def search_nearby_facilities(
        self, 
        latitude: float, 
        longitude: float, 
        radius_km: float = 10.0,
        specialty: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """
        Search for nearby healthcare facilities using Google Places API (Nearby Search)
        Implements 'Diversity Search' to ensure Government and NGO options are included.
        """
        if not self.client:
            print("Google Maps client not initialized")
            return []

        try:
            # Ensure coordinates are floats
            latitude = float(latitude)
            longitude = float(longitude)
            radius_meters = min(int(radius_km * 1000), 50000)
            
            # 1. Determine base keyword
            base_keyword = "hospital"
            if specialty and specialty.lower() in self.specialty_mappings:
                base_keyword = self.specialty_mappings[specialty.lower()][0]
            
            # 2. Define search strategies
            searches = [
                {"keyword": base_keyword, "type": "standard"}, # Primary search
                {"keyword": f"government {base_keyword}", "type": "government"}, # Govt search
                {"keyword": f"charitable {base_keyword}", "type": "ngo"} # NGO search
            ]
            
            all_facilities = []
            seen_place_ids = set()
            
            # 3. Execute searches
            for search in searches:
                try:
                    places_result = self.client.places_nearby(
                        location=(latitude, longitude),
                        radius=radius_meters,
                        keyword=search["keyword"],
                        type="health"
                    )
                    
                    if 'results' in places_result:
                        for place in places_result['results']:
                            place_id = place.get('place_id')
                            if place_id in seen_place_ids:
                                continue
                                
                            seen_place_ids.add(place_id)
                            
                            processed = self._process_google_place(
                                place, latitude, longitude, specialty, 
                                forced_type=search["type"] if search["type"] != "standard" else None
                            )
                            
                            if processed:
                                all_facilities.append(processed)
                                
                except Exception as e:
                    print(f"Error in search strategy '{search['keyword']}': {e}")
                    continue

            # 4. Sort by distance
            all_facilities.sort(key=lambda x: x["distance_km"])
            
            return all_facilities[:15] # Return top 15 to allow for diversity
            
        except Exception as e:
            print(f"Error searching facilities: {e}")
            return []

    def _process_google_place(
        self, 
        place: Dict[str, Any], 
        user_lat: float, 
        user_lon: float,
        specialty: Optional[str],
        forced_type: Optional[str] = None
    ) -> Optional[Dict[str, Any]]:
        """
        Process Google Place result into standard structure
        """
        try:
            name = place.get('name')
            vicinity = place.get('vicinity', '') # Address in nearby search
            
            # Calculate distance
            place_lat = place['geometry']['location']['lat']
            place_lon = place['geometry']['location']['lng']
            
            distance = geodesic(
                (user_lat, user_lon), 
                (place_lat, place_lon)
            ).kilometers
            
            # Determine type
            if forced_type:
                facility_type = forced_type
            else:
                # Heuristic fallback
                types = place.get('types', [])
                facility_type = "private" # Default
                name_lower = name.lower()
                
                if 'local_government_office' in types or 'city_hall' in types:
                    facility_type = "government"
                elif 'hospital' in types: 
                    if any(x in name_lower for x in ['govt', 'public', 'civil', 'district', 'municipal']):
                        facility_type = "government"
                    elif 'foundation' in name_lower or 'trust' in name_lower or 'charitable' in name_lower or 'mission' in name_lower:
                        facility_type = "ngo"
                    elif 'clinic' in name_lower and 'hospital' not in name_lower:
                        facility_type = "local"
            
            # Determine services (basic heuristic from types)
            services = ["General Consultation"]
            if 'emergency_room' in place.get('types', []) or 'emergency' in name.lower():
                services.append("Emergency Care")
            if 'pharmacy' in place.get('types', []):
                services.append("Pharmacy")
            if specialty:
                services.append(f"{specialty.title()} Services")

            # Rating
            rating = place.get('rating', 'N/A')
            
            return {
                "name": name,
                "address": vicinity,
                "city": "", 
                "state": "",
                "distance_km": round(distance, 2),
                "facility_type": facility_type,
                "services": services,
                "specialty_match": specialty if specialty else "general",
                "map_link": f"https://www.google.com/maps/place/?q=place_id:{place.get('place_id')}",
                "contact": None,
                "rating": rating,
                "coordinates": {
                    "latitude": place_lat,
                    "longitude": place_lon
                }
            }
        except Exception as e:
            print(f"Error processing Google Place: {e}")
            return None

    def find_facilities_for_condition(
        self,
        user_location: str,
        specialty: str,
        radius_km: float = 10.0
    ) -> List[Dict[str, Any]]:
        """
        Find facilities for a specific medical condition
        """
        # Geocode user location
        coordinates = self.geocode_location(user_location)
        if not coordinates:
            return []
        
        latitude, longitude = coordinates
        
        # Search for facilities
        return self.search_nearby_facilities(
            latitude, longitude, radius_km, specialty
        )


# Convenience function for quick facility search
def find_nearby_clinics(
    location: str,
    specialty: str = "general",
    radius_km: float = 10.0
) -> List[Dict[str, Any]]:
    matcher = FacilityMatcher()
    return matcher.find_facilities_for_condition(location, specialty, radius_km)


if __name__ == "__main__":
    # Test the facility matcher
    print("Testing Google Maps Facility Matcher...")
    
    matcher = FacilityMatcher()
    
    # Test with a sample location
    test_location = "Hyderabad, Telangana"
    test_specialty = "cardiology"
    
    if not os.getenv("GOOGLE_MAPS_API_KEY"):
        print("Please set GOOGLE_MAPS_API_KEY in .env first")
    else:
        print(f"Searching for {test_specialty} facilities near {test_location}")
        
        facilities = matcher.find_facilities_for_condition(
            test_location, test_specialty, radius_km=15.0
        )
        
        print(f"Found {len(facilities)} facilities:")
        for i, facility in enumerate(facilities, 1):
            print(f"{i}. {facility['name']} ({facility['facility_type']})")
            print(f"   Address: {facility['address']}")
            print(f"   Distance: {facility['distance_km']} km")
            print(f"   Rating: {facility['rating']}")
            print(f"   Map: {facility['map_link']}")
            print()
