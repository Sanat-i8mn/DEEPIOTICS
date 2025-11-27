import React, { useState, useEffect } from 'react';
import { Menu, X, Brain, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = window.location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldShowWhiteBg = !isHomePage || isScrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-2">
              <img 
                src={isScrolled ? "/LogoDeepiotics.png" : "/LogoDeepiotics.png"}
                alt="Deepiotics Logo" 
                className="h-10 w-auto"
                style={!isScrolled ? { filter: 'brightness(0) invert(1)' } : {}}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className={`font-medium transition-colors hover:text-blue-600 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              Home
            </a>
            <a href="/about" className={`font-medium transition-colors hover:text-blue-600 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              About Us
            </a>
            <a href="/services" className={`font-medium transition-colors hover:text-blue-600 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              Services
            </a>
            <a href="/portfolio" className={`font-medium transition-colors hover:text-blue-600 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              Portfolio
            </a>
            <a href="/blog" className={`font-medium transition-colors hover:text-blue-600 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              Blog
            </a>
            <a href="/careers" className={`font-medium transition-colors hover:text-blue-600 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              Careers
            </a>
            <a href="/contact" className={`font-medium transition-colors hover:text-blue-600 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="https://calendly.com/researchmentorclinic1/ai-strategy-call-pre-call-questionnaire"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 inline-block"
            >
              Get Free AI Strategy Session
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100/10"
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200/20">
            <div className="flex flex-col space-y-4">
              <a
                href="/"
                className={`font-medium transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/about"
                className={`font-medium transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              <a
                href="/services"
                className={`font-medium transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="/portfolio"
                className={`font-medium transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </a>
              <a
                href="/blog"
                className={`font-medium transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              <a
                href="/careers"
                className={`font-medium transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Careers
              </a>
              <a
                href="/contact"
                className={`font-medium transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <a
                href="https://calendly.com/researchmentorclinic1/ai-strategy-call-pre-call-questionnaire"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium w-full text-center inline-block"
              >
                Get Free AI Strategy Session
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;