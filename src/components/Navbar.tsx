
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold font-poppins text-meal-primary">
              MealCompass
            </h1>
          </Link>

          {/* Desktop Navigation - Moved to right */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              <Link
                to="/"
                className="text-meal-text-dark hover:text-meal-teal px-3 py-2 text-sm font-medium font-roboto transition-colors duration-200 border-b-2 border-transparent hover:border-meal-accent"
              >
                Home
              </Link>
              <Link
                to="/create-plan"
                className="text-meal-text-dark hover:text-meal-teal px-3 py-2 text-sm font-medium font-roboto transition-colors duration-200 border-b-2 border-transparent hover:border-meal-accent"
              >
                Create Plan
              </Link>
              <Link
                to="/about"
                className="text-meal-text-dark hover:text-meal-teal px-3 py-2 text-sm font-medium font-roboto transition-colors duration-200 border-b-2 border-transparent hover:border-meal-accent"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-meal-text-dark hover:text-meal-teal px-3 py-2 text-sm font-medium font-roboto transition-colors duration-200 border-b-2 border-transparent hover:border-meal-accent"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-meal-text-dark hover:text-meal-teal p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link
                to="/"
                className="text-meal-text-dark hover:text-meal-teal block px-3 py-2 text-base font-medium font-roboto"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/create-plan"
                className="text-meal-text-dark hover:text-meal-teal block px-3 py-2 text-base font-medium font-roboto"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Plan
              </Link>
              <Link
                to="/about"
                className="text-meal-text-dark hover:text-meal-teal block px-3 py-2 text-base font-medium font-roboto"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-meal-text-dark hover:text-meal-teal block px-3 py-2 text-base font-medium font-roboto"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
