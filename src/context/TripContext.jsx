import React, { createContext, useContext, useEffect, useReducer } from 'react';

// Create the TripContext
const TripContext = createContext();

// Storage keys
const STORAGE_KEYS = {
  TRIPS: 'wandermate_trips',
  FAVORITES: 'wandermate_favorites'
};

// Initial state
const initialState = {
  trips: [],
  favorites: [],
  loading: false,
  error: null   
};

// Check if localStorage is available and working
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.warn('localStorage not available:', e);
    return false;
  }
};

// Load data from localStorage
const loadFromStorage = (key, defaultValue) => {
  if (!isLocalStorageAvailable()) return defaultValue;
  
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Error loading data from localStorage (${key}):`, error);
    return defaultValue;
  }
};

// Save data to localStorage
const saveToStorage = (key, data) => {
  if (!isLocalStorageAvailable()) return;
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to localStorage (${key}):`, error);
  }
};

// Reducer function
function tripReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
      
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
      
    case 'SET_TRIPS':
      return { ...state, trips: action.payload, loading: false };
      
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
      
    case 'ADD_TRIP': {
      const updatedTrips = [...state.trips, action.payload];
      // Save immediately to ensure persistence
      saveToStorage(STORAGE_KEYS.TRIPS, updatedTrips);
      return { ...state, trips: updatedTrips };
    }
    
    case 'UPDATE_TRIP': {
      const updatedTrips = state.trips.map(trip => 
        trip.id === action.payload.id ? action.payload : trip
      );
      // Save immediately to ensure persistence
      saveToStorage(STORAGE_KEYS.TRIPS, updatedTrips);
      return { ...state, trips: updatedTrips };
    }
    
    case 'DELETE_TRIP': {
      const updatedTrips = state.trips.filter(trip => trip.id !== action.payload);
      // Save immediately to ensure persistence
      saveToStorage(STORAGE_KEYS.TRIPS, updatedTrips);
      return { ...state, trips: updatedTrips };
    }
    
    case 'TOGGLE_FAVORITE': {
      const updatedFavorites = state.favorites.includes(action.payload)
        ? state.favorites.filter(id => id !== action.payload)
        : [...state.favorites, action.payload];
      // Save immediately to ensure persistence
      saveToStorage(STORAGE_KEYS.FAVORITES, updatedFavorites);
      return { ...state, favorites: updatedFavorites };
    }
    
    default:
      return state;
  }
}

export function TripProvider({ children }) {
  // Initialize state with data from localStorage
  const [state, dispatch] = useReducer(tripReducer, {
    ...initialState,
    trips: loadFromStorage(STORAGE_KEYS.TRIPS, []),
    favorites: loadFromStorage(STORAGE_KEYS.FAVORITES, [])
  });

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

  // Debug data
  useEffect(() => {
    console.log('Current state:', state);
    console.log('Stored trips:', loadFromStorage(STORAGE_KEYS.TRIPS, []));
  }, [state.trips.length]);

  const value = {
    trips: state.trips,
    favorites: state.favorites || [], 
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