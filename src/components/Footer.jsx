import React from 'react';
import { MapPin, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <MapPin className="h-6 w-6" />
              <span className="text-xl font-bold">WanderMate</span>
            </Link>
            <p className="mt-2 text-blue-200">Plan your adventures with ease.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Navigate</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-blue-200 hover:text-white transition">Home</Link></li>
                <li><Link to="/search" className="text-blue-200 hover:text-white transition">Search</Link></li>
                <li><Link to="/my-trips" className="text-blue-200 hover:text-white transition">My Trips</Link></li>
                <li><Link to="/about" className="text-blue-200 hover:text-white transition">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact</h3>
              <div className="flex items-center space-x-2 text-blue-200">
                <Mail className="h-4 w-4" />
                <span>contact@wandermate.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-700 mt-8 pt-6 flex justify-between items-center">
          <p className="text-sm text-blue-200">© 2025 WanderMate. All rights reserved.</p>
          <div className="flex items-center space-x-1 text-blue-200">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;