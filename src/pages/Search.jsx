import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import DestinationCard from '../components/DestinationCard';
import EmptyState from '../components/EmptyState';
import TripForm from '../components/TripForm';
import { getCityImage, getPlaceholderImage } from '../services/imageApi';

// Mock API function since the real implementation isn't visible
const searchDestinations = async (query) => {
  // This is a placeholder implementation
  // In a real app, this would make an API call
  try {
    return {
      xid: `place-${Date.now()}`,
      name: query,
      country: "Example Country",
      timezone: "Local Time",
      point: { lat: 40.7128, lon: -74.0060 }
    };
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setLoading(true);
    setError(null);
    
    try {
      const data = await searchDestinations(query);
      
      if (data && data.name) {
        // Get city image from our new API
        let imageUrl = null;
        try {
          imageUrl = await getCityImage(data.name, { width: 400, height: 250 });
        } catch (imgError) {
          console.error('Error fetching destination image:', imgError);
        }
        
        const formattedResults = [
          {
            id: data.xid || `place-${Date.now()}`,
            name: data.name,
            location: `${data.country || ''} ${data.country ? '·' : ''} ${data.timezone || ''}`.trim(),
            description: '',
            image: imageUrl || getPlaceholderImage(data.name, 400, 250),
            coordinates: data.point ? { lat: data.point.lat, lon: data.point.lon } : null
          }
        ];
        setResults(formattedResults);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error('Error searching destinations:', err);
      setError('Failed to search destinations. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination);
  };

  const handleTripSuccess = (tripId) => {
    setSelectedDestination(null);
    navigate(`/trips/${tripId}`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Find Your Destination</h1>
        <p className="text-gray-600 mb-6">
          Search for cities, countries, or famous landmarks to start planning your next adventure.
        </p>
        <div className="flex justify-center">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      {!selectedDestination ? (
        <div className="space-y-6">
          {searchQuery && !loading && results.length === 0 ? (
            <EmptyState 
              title="No destinations found"
              description={`We couldn't find any results for "${searchQuery}". Please try a different search term.`}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map(destination => (
                <div 
                  key={destination.id} 
                  onClick={() => handleDestinationSelect(destination)}
                  className="cursor-pointer"
                >
                  <DestinationCard 
                    destination={destination}
                    showActions={false}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Plan Your Trip to {selectedDestination.name}
            </h2>
            <button
              onClick={() => setSelectedDestination(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              &times; Cancel
            </button>
          </div>
          
          <TripForm 
            destination={selectedDestination}
            onSuccess={handleTripSuccess}
          />
        </div>
      )}
    </div>
  );
};

export default Search;