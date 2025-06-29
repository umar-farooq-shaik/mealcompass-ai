
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-meal-text-dark text-meal-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-poppins text-meal-primary">
              MealCompass
            </h3>
            <p className="text-gray-300 font-roboto leading-relaxed">
              Personalized, affordable meal plans powered by AI. 
              Helping you eat better, feel better, and live better.
            </p>
            <p className="text-sm text-gray-400 font-roboto">
              Powered by Gemini AI meal planning technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-poppins text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-meal-accent transition-colors duration-200 font-roboto"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/create-plan"
                  className="text-gray-300 hover:text-meal-accent transition-colors duration-200 font-roboto"
                >
                  Create Plan
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-meal-accent transition-colors duration-200 font-roboto"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-meal-accent transition-colors duration-200 font-roboto"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info and Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-poppins text-white">
              Connect With Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="text-meal-teal" size={18} />
                <span className="text-gray-300 font-roboto">hello@mealcompass.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-meal-teal" size={18} />
                <span className="text-gray-300 font-roboto">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-meal-teal" size={18} />
                <span className="text-gray-300 font-roboto">Global Service</span>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-4">
              <a
                href="#"
                className="text-meal-teal hover:text-meal-accent transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-meal-teal hover:text-meal-accent transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-meal-teal hover:text-meal-accent transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 font-roboto text-sm">
            © 2024 MealCompass. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
