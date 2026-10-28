import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const PHONE_NUMBER = '9330315009';
const PHONE_LINK = `tel:+91${PHONE_NUMBER}`;
const EMAIL = 'info@rentigo.com';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16 px-6 md:px-8">
      <div className="max-w-[120rem] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center">
                <span className="font-heading text-gray-900 text-lg font-bold">R</span>
              </div>
              <span className="font-heading text-white text-lg font-bold">Rentigo</span>
            </div>
            <p className="font-paragraph text-gray-400 text-sm leading-relaxed">
              Premium self-drive car rental in Kolkata. Experience freedom on the road with our modern fleet and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="font-paragraph text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/fleet"
                  className="font-paragraph text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-paragraph text-gray-400 text-sm hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="font-paragraph text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg text-white mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="font-paragraph text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Self-Drive Rental
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-paragraph text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Long-Term Rental
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-paragraph text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Corporate Packages
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-paragraph text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Airport Transfers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <a
                  href={PHONE_LINK}
                  className="font-paragraph text-gray-400 text-sm hover:text-white transition-colors"
                >
                  {PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-paragraph text-gray-400 text-sm hover:text-white transition-colors"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="font-paragraph text-gray-400 text-sm">
                  Kolkata, West Bengal, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Rentigo Self-Drive Car Rental. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="font-paragraph text-gray-400 text-sm hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-paragraph text-gray-400 text-sm hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
