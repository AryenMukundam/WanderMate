import React from 'react';
import { Map } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({ title, description, action, link }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <Map className="h-10 w-10 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 max-w-md mb-6">{description}</p>
      {action && link && (
        <Link
          to={link}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {action}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;