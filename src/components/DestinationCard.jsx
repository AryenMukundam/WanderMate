import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Star } from 'lucide-react';
import { useTrips } from '../context/TripContext';

const DestinationCard = ({ destination, showActions = true }) => {
  const { toggleFavorite, favorites } = useTrips();
  const isFavorite = favorites.includes(destination.id);

  // Create a proper fallback image URL
  const fallbackImage = `https://via.placeholder.com/400x250/e2e8f0/1e40af?text=${encodeURIComponent(destination.name || 'Trip')}`;

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img 
          src={destination.image || fallbackImage} 
          alt={destination.name} 
          className="w-full h-48 object-cover"
          onError={handleImageError}
        />
        {showActions && (
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent triggering card click
              toggleFavorite(destination.id);
            }}
            className="absolute top-2 right-2 p-2 bg-white bg-opacity-75 rounded-full"
          >
            <Star 
              className={`h-5 w-5 ${isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
            />
          </button>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-700">{destination.name}</h3>
        
        <div className="flex items-center space-x-1 text-gray-500 mt-1">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{destination.location}</span>
        </div>
        
        {destination.startDate && destination.endDate && (
          <div className="flex items-center space-x-1 text-gray-500 mt-1">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              {new Date(destination.startDate).toLocaleDateString()} - {new Date(destination.endDate).toLocaleDateString()}
            </span>
          </div>
        )}
        
        {destination.description && (
          <p className="text-gray-600 mt-2 line-clamp-2">{destination.description}</p>
        )}
        
        {showActions && (
          <div className="mt-4 flex justify-end">
            <Link 
              to={`/trips/${destination.id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationCard;