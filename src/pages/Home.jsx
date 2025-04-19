import React from 'react';
import { Link } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import DestinationCard from '../components/DestinationCard';
import { MapPin, Search, Calendar } from 'lucide-react';

const Home = () => {
  const { trips } = useTrips();
  
  // Get the upcoming trip
  const upcomingTrips = trips
    .filter(trip => new Date(trip.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white rounded-lg p-8 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Find Your Next Adventure</h1>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl">
            WanderMate helps you discover amazing destinations and plan your perfect getaway.
            Search, save, and organize all your travel plans in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/search" 
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition inline-flex items-center"
            >
              <Search className="mr-2 h-5 w-5" /> Explore Destinations
            </Link>
            <Link 
              to="/my-trips" 
              className="px-6 py-3 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800 transition inline-flex items-center"
            >
              <Calendar className="mr-2 h-5 w-5" /> View My Trips
            </Link>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10">
          <MapPin className="h-64 w-64" />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Use WanderMate?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Discover Places</h3>
            <p className="text-gray-600">
              Search for destinations around the world and get detailed information.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Plan Trips</h3>
            <p className="text-gray-600">
              Save your travel dates, budget, and notes for each destination.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Stay Organized</h3>
            <p className="text-gray-600">
              Keep all your travel plans in one place, accessible anytime.
            </p>
          </div>
        </div>
      </section>
      
      {/* Upcoming Trips Section */}
      {upcomingTrips.length > 0 && (
        <section className="py-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Upcoming Adventures</h2>
            <Link 
              to="/my-trips" 
              className="text-blue-600 hover:text-blue-800 transition"
            >
              View all trips
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTrips.map(trip => (
              <DestinationCard key={trip.id} destination={trip} />
            ))}
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Ready to start planning?</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Begin your journey today. Search for destinations and create your first trip.
        </p>
        <Link 
            to="/search" 
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition inline-flex items-center"
          >
            <Search className="mr-2 h-5 w-5" /> Find Your Next Destination
          </Link>
        </section>
      </div>
    );
};

export default Home;
