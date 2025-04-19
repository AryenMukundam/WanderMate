import React, { createContext, useContext, useEffect, useState, useReducer } from 'react';

const TripContext = createContext();

const initialState = {
  trips: [],
  favorites: [],
  loading: false,
  error: null   
};

function tripReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_TRIPS':
      return { ...state, trips: action.payload, loading: false };
    case 'ADD_TRIP':
      return { ...state, trips: [...state.trips, action.payload] };
    case 'UPDATE_TRIP':
      return {
        ...state,
        trips: state.trips.map(trip => 
          trip.id === action.payload.id ? action.payload : trip
        )
      };
    case 'DELETE_TRIP':
      return {
        ...state,
        trips: state.trips.filter(trip => trip.id !== action.payload)
      };
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload]
      };
    default:
      return state;
  }
}

export function TripProvider({ children }) {
  const [state, dispatch] = useReducer(tripReducer, initialState);

  useEffect(() => {
    const storedTrips = localStorage.getItem('wandermate_trips');
    const storedFavorites = localStorage.getItem('wandermate_favorites');
    
    if (storedTrips) {
      dispatch({ type: 'SET_TRIPS', payload: JSON.parse(storedTrips) });
    }
    
    if (storedFavorites) {
      dispatch({ type: 'SET_FAVORITES', payload: JSON.parse(storedFavorites) });
    }
  }, []);

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem('wandermate_trips', JSON.stringify(state.trips));
    localStorage.setItem('wandermate_favorites', JSON.stringify(state.favorites));
  }, [state.trips, state.favorites]);

  // Creating a new trip
  const addTrip = (tripData) => {
    const newTrip = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...tripData
    };
    
    dispatch({ type: 'ADD_TRIP', payload: newTrip });
    return newTrip.id;
  };

  // Updating an existing trip
  const updateTrip = (id, tripData) => {
    const trip = state.trips.find(t => t.id === id);
    if (!trip) return null;
    
    const updatedTrip = {
      ...trip,
      ...tripData,
      updatedAt: new Date().toISOString()
    };
    
    dispatch({ type: 'UPDATE_TRIP', payload: updatedTrip });
    return updatedTrip;
  };

  // Deleting a trip
  const deleteTrip = (id) => {
    dispatch({ type: 'DELETE_TRIP', payload: id });
  };

  // Toggle favorite status
  const toggleFavorite = (id) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  };

  const value = {
    trips: state.trips,
    favorites: state.favorites,
    loading: state.loading,
    error: state.error,
    addTrip,
    updateTrip,
    deleteTrip,
    toggleFavorite
  };

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
}