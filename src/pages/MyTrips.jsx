import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import DestinationCard from '../components/DestinationCard';
import EmptyState from '../components/EmptyState';
import { Calendar, Plus, Filter } from 'lucide-react';

const MyTrips = () => {
  const { trips } = useTrips();
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'
  
  const filteredTrips = trips.filter(trip => {
    const tripDate = new Date(trip.startDate);
    const today = new Date();
    
    if (filter === 'upcoming') {
      return tripDate >= today;
    } else if (filter === 'past') {
      return tripDate < today;
    }
    return true;
  });
  
  // Sort trips by date
  filteredTrips.sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    
    if (filter === 'upcoming') {
      return dateA - dateB; // Closest date first
    } else {
      return dateB - dateA; // Newest first
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">My Trips</h1>
        <Link
          to="/search"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition inline-flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" /> New Trip
        </Link>
      </div>
      
      {trips.length > 0 ? (
        <>
          <div className="flex items-center space-x-2 border-b border-gray-200 pb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <div className="flex space-x-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Trips
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'upcoming'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'past'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Past
              </button>
            </div>
          </div>
          
          {filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map(trip => (
                <DestinationCard key={trip.id} destination={trip} />
              ))}
            </div>
          ) : (
            <EmptyState
              title={`No ${filter} trips found`}
              description={
                filter === 'upcoming'
                  ? "You don't have any upcoming trips. Start planning your next adventure!"
                  : filter === 'past'
                  ? "You don't have any past trips in your collection yet."
                  : "You don't have any trips yet. Start by searching for a destination."
              }
              action="Find Destinations"
              link="/search"
            />
          )}
        </>
      ) : (
        <EmptyState
          title="No trips found"
          description="You haven't planned any trips yet. Start by searching for a destination."
          action="Find Destinations"
          link="/search"
        />
      )}
    </div>
  );
};

export default MyTrips;
