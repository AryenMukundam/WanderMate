import React, { useState } from 'react';
import { useTrips } from '../context/TripContext';

const TripForm = ({ destination, onSuccess }) => {
  const { addTrip } = useTrips();
  const [formData, setFormData] = useState({
    name: destination?.name || '',
    location: destination?.location || '',
    startDate: '',
    endDate: '',
    description: '',
    budget: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error once user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Destination name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date cannot be before start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const tripData = {
        ...formData,
        image: destination?.image || null,
        coordinates: destination?.coordinates || null
      };
      
      const tripId = addTrip(tripData);
      
      if (onSuccess) {
        onSuccess(tripId);
      }
      
      // Reset form
      setFormData({
        name: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        budget: '',
        notes: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Destination Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Location *
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.location ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date *
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.startDate ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
        </div>
        
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date *
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.endDate ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>}
        </div>
      </div>
      
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
          Budget Estimate
        </label>
        <input
          id="budget"
          name="budget"
          type="number"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Trip
        </button>
      </div>
    </form>
  );
};

export default TripForm;