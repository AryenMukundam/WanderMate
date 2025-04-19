import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import { Calendar, MapPin, DollarSign, Clock, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { getAttractions } from '../services/api';
import TripForm from '../components/TripForm';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips, updateTrip, deleteTrip } = useTrips();
  const [trip, setTrip] = useState(null);
  const [editing, setEditing] = useState(false);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const foundTrip = trips.find(t => t.id === id);
    setTrip(foundTrip);
    
    if (foundTrip?.coordinates) {
      loadAttractions(foundTrip.coordinates);
    }
  }, [id, trips]);
  
  const loadAttractions = async (coordinates) => {
    if (!coordinates || !coordinates.lat || !coordinates.lon) return;
    
    setLoading(true);
    try {
      const data = await getAttractions(coordinates.lat, coordinates.lon);
      if (data && data.features) {
        const formattedAttractions = data.features
          .slice(0, 6)
          .map(feature => ({
            id: feature.id || feature.properties.xid,
            name: feature.properties.name || 'Unnamed Attraction',
            kind: feature.properties.kinds ? feature.properties.kinds.split(',')[0] : 'attraction'
          }));
        setAttractions(formattedAttractions);
      }
    } catch (error) {
      console.error('Error loading attractions:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateTrip = (tripId, updatedData) => {
    updateTrip(tripId, updatedData);
    setEditing(false);
  };
  
  const handleDeleteTrip = () => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      deleteTrip(id);
      navigate('/my-trips');
    }
  };
  
  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Trip not found</h2>
        <p className="text-gray-600 mb-6">The trip you're looking for doesn't exist or has been deleted.</p>
        <Link
          to="/my-trips"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Back to My Trips
        </Link>
      </div>
    );
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="space-y-8">
      <Link
        to="/my-trips"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to My Trips
      </Link>
      
      {editing ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Edit Trip</h2>
            <button
              onClick={() => setEditing(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              &times; Cancel
            </button>
          </div>
          <TripForm
            destination={trip}
            onSuccess={(tripId) => handleUpdateTrip(tripId, trip)}
          />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-64">
              <img
                src={trip.image || "/api/placeholder/800/400"}
                alt={trip.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">{trip.name}</h1>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{trip.location}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center bg-blue-50 px-3 py-2 rounded-md">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Dates</div>
                    <div className="font-medium">
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </div>
                  </div>
                </div>
                
                {trip.budget && (
                  <div className="flex items-center bg-green-50 px-3 py-2 rounded-md">
                    <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Budget</div>
                      <div className="font-medium">${trip.budget}</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center bg-purple-50 px-3 py-2 rounded-md">
                  <Clock className="h-5 w-5 text-purple-600 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-medium">
                      {Math.ceil(
                        (new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)
                      )}{' '}
                      days
                    </div>
                  </div>
                </div>
              </div>
              
              {trip.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                  <p className="text-gray-600">{trip.description}</p>
                </div>
              )}
              
              {trip.notes && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Notes</h2>
                  <p className="text-gray-600 whitespace-pre-line">{trip.notes}</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 inline-flex items-center border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </button>
                <button
                  onClick={handleDeleteTrip}
                  className="px-4 py-2 inline-flex items-center border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
          
          {/* Nearby Attractions Section */}
          {trip.coordinates && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Nearby Attractions</h2>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
              ) : attractions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {attractions.map(attraction => (
                    <div
                      key={attraction.id}
                      className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition"
                    >
                      <h3 className="font-medium text-gray-800">{attraction.name}</h3>
                      <span className="text-sm text-gray-500 capitalize">{attraction.kind}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No nearby attractions found.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TripDetails;