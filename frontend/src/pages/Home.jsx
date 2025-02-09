import { useNavigate } from 'react-router-dom';
import { LogOut, Search, Home as HomeIcon, Users, Phone, Briefcase,Plane } from 'lucide-react';
import fondo from '/src/img/descarga.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/createReserva');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen relative">
      {/* Navigation Bar */}
      <nav className="fixed w-full z-50 bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
              <Plane className="text-cyan-400 w-8 h-12" />
                <span className="bg-gradient-to-r from-cyan-400 via-purple-300 to-white text-transparent bg-clip-text 
              hover:from-fuchsia-500 hover:to-cyan-400 transition-all duration-300">
                Ethereal Airline
               </span> 
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-white flex items-center space-x-1"><HomeIcon size={18} /> <span>Home</span></a>
                <a href="#" className="text-white flex items-center space-x-1"><Search size={18} /> <span>Search Flights</span></a>
                <a href="#" className="text-white flex items-center space-x-1"><Users size={18} /> <span>About Us</span></a>
                <a href="#" className="text-white flex items-center space-x-1"><Briefcase size={18} /> <span>Services</span></a>
                <a href="#" className="text-white flex items-center space-x-1"><Phone size={18} /> <span>Contact</span></a>
              </div>
            </div>
            <button onClick={handleLogout} className="text-white hover:text-gray-200">
              <LogOut size={20} />
      
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <div 
        className="min-h-screen relative flex items-center justify-center"
        style={{
          backgroundImage:`url(${fondo})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4">
          <div className="mb-8">
            <div className="flex items-center space-x-2">
              <div className="text-white">
              </div>
            </div>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-4 text-center">LETS TRAVEL</h2>
          <p className="text-xl text-white mb-8 text-center">ALWAYS WITH YOU</p>
          <button
            onClick={handleStart}
            className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:from-fuchsia-500 hover:to-cyan-400 
                  text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg"
          >
            Start
          </button>
        </div>
      </div>
      {/* Popular Destinations Section */}
<div className="bg-gradient-to-b from-white via-gray-800 py-16">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-black text-center mb-12">Popular Destinations</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { 
          title: 'Paris', 
          description: 'The City of Light',
          imageUrl: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg'
        },
        { 
          title: 'Tokyo', 
          description: 'Modern Meets Traditional',
          imageUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg'
        },
        { 
          title: 'New York', 
          description: 'The City That Never Sleeps',
          imageUrl: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg'
        }
      ].map((destination, index) => (
        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300">
          <img 
            src={destination.imageUrl}
            alt={destination.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{destination.title}</h3>
            <p className="text-gray-600">{destination.description}</p>
            <button className="mt-4 text-purple-600 font-semibold">Learn More →</button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Ethereal</h3>
              <p className="text-gray-400">Experience luxury travel with Ethereal Airlines. Your journey begins with us.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Book a Flight</a></li>
                <li><a href="#" className="hover:text-white">Check Status</a></li>
                <li><a href="#" className="hover:text-white">Travel Info</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>1234 Airport Road</li>
                <li>contact@ethereal.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Ethereal Airlines. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;








