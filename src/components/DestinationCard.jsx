import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Star } from 'lucide-react';
import { useTrips } from '../context/TripContext';

const DestinationCard = ({ destination, showActions = true }) => {
  const { toggleFavorite, favorites } = useTrips();
  const isFavorite = favorites.includes(destination.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img 
          src={destination.image || "/api/placeholder/400/250"} 
          alt={destination.name} 
          className="w-full h-48 object-cover"
        />
        {showActions && (
          <button
            onClick={() => toggleFavorite(destination.id)}
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
        
        {destination.dates && (
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