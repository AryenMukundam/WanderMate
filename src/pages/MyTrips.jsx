import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import DestinationCard from '../components/DestinationCard';
import EmptyState from '../components/EmptyState';
import { Calendar, Plus, Filter } from 'lucide-react';

const MyTrips = () => {
  const { trips, loading, error } = useTrips();
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'
  const [debugInfo, setDebugInfo] = useState('');
  
  // Add debugging to monitor trips data
  useEffect(() => {
    console.log('Trips in MyTrips component:', trips);
    setDebugInfo(`Trips count: ${trips.length}`);
    
    // Check localStorage directly for comparison
    try {
      const storedTrips = localStorage.getItem('wandermate_trips');
      console.log('Raw localStorage trips:', storedTrips);
      const parsedTrips = storedTrips ? JSON.parse(storedTrips) : [];
      console.log('Parsed localStorage trips:', parsedTrips);
      setDebugInfo(prev => `${prev} | LocalStorage: ${parsedTrips.length}`);
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      setDebugInfo(prev => `${prev} | LocalStorage error`);
    }
  }, [trips]);
  
  // Safe filter that handles null or undefined values
  const filteredTrips = trips?.filter(trip => {
    if (!trip || !trip.startDate) return false;
    
    try {
      const tripDate = new Date(trip.startDate);
      const today = new Date();
      
      if (filter === 'upcoming') {
        return tripDate >= today;
      } else if (filter === 'past') {
        return tripDate < today;
      }
      return true;
    } catch (e) {
      console.error('Error filtering trip:', e, trip);
      return false;
    }
  }) || [];
  
  // Safe sort that handles potential errors
  try {
    filteredTrips.sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      
      if (filter === 'upcoming') {
        return dateA - dateB; // Closest date first
      } else {
        return dateB - dateA; // Newest first
      }
    });
  } catch (e) {
    console.error('Error sorting trips:', e);
  }

  // Show loading state if data is loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  // Show error message if there was an error
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
        <p className="font-medium">Error loading trips</p>
        <p>{error}</p>
      </div>
    );
  }

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
      
      {/* Debug information in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-gray-100 p-2 text-xs text-gray-600 rounded">
          {debugInfo}
        </div>
      )}
      
      {(!trips || trips.length === 0) ? (
        <EmptyState
          title="No trips found"
          description="You haven't planned any trips yet. Start by searching for a destination."
          action="Find Destinations"
          link="/search"
        />
      ) : (
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
      )}
    </div>
  );
};

export default MyTrips;