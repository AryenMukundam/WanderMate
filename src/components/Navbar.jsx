import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Menu, X, Calendar, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="h-6 w-6" />
            <span className="text-xl font-bold">WanderMate</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-blue-200 transition">Home</Link>
            <Link to="/search" className="hover:text-blue-200 transition">Search</Link>
            <Link to="/my-trips" className="hover:text-blue-200 transition">My Trips</Link>
            <Link to="/about" className="hover:text-blue-200 transition">About</Link>
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link 
              to="/" 
              className="block hover:bg-blue-700 px-3 py-2 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="block hover:bg-blue-700 px-3 py-2 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              Search
            </Link>
            <Link 
              to="/my-trips" 
              className="block hover:bg-blue-700 px-3 py-2 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              My Trips
            </Link>
            <Link 
              to="/about" 
              className="block hover:bg-blue-700 px-3 py-2 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;