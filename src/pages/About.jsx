import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Globe, Clock, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About WanderMate</h1>
        <p className="text-gray-600">
          WanderMate is your personal travel companion, helping you discover and plan your adventures around the world.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At WanderMate, we believe that travel should be accessible, enjoyable, and hassle-free. Our mission is to provide travelers with a simple yet powerful tool to discover new destinations and plan their trips efficiently.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Discover the World</h3>
                <p className="text-gray-600">
                  Search for destinations around the globe and find detailed information to help plan your perfect trip.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Save Time</h3>
                <p className="text-gray-600">
                  Streamline your travel planning process with our intuitive tools and save your trip details in one place.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Personalized Experience</h3>
                <p className="text-gray-600">
                  Create and customize your travel plans according to your preferences and interests.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Privacy First</h3>
                <p className="text-gray-600">
                  Your travel plans are stored locally on your device, ensuring your data remains private.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
        
        <ol className="space-y-6">
          <li className="flex">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
              1
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">Search</h3>
              <p className="text-gray-600">
                Start by searching for destinations you're interested in. You can search by city, country, or landmark.
              </p>
            </div>
          </li>
          
          <li className="flex">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
              2
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">Plan</h3>
              <p className="text-gray-600">
                Once you've found a destination, create a trip by adding travel dates, budget, and notes.
              </p>
            </div>
          </li>
          
          <li className="flex">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
              3
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">Organize</h3>
              <p className="text-gray-600">
                View all your trips in one place, filter by upcoming or past trips, and easily access your travel plans.
              </p>
            </div>
          </li>
          
          <li className="flex">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
              4
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">Discover</h3>
              <p className="text-gray-600">
                Explore nearby attractions and get more information about your destination to enhance your trip.
              </p>
            </div>
          </li>
        </ol>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Ready to Plan Your Next Adventure?</h2>
        <p className="text-gray-600 mb-6">
          Start using WanderMate today and make your travel planning experience simpler and more enjoyable.
        </p>
        <div className="flex justify-center">
          <Link
            to="/search"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;