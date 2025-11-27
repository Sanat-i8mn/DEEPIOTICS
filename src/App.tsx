import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import AIAgentCapabilities from './components/AIAgentCapabilities';
import About from './components/About';
import CaseStudies from './components/CaseStudies';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminCareer from './components/AdminCareer';
import Careers from './components/Careers';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import PortfolioPage from './components/PortfolioPage';
import ContactPage from './components/ContactPage';
import BlogPage from './components/BlogPage';
import BlogDetailPage from './components/BlogDetailPage';

function App() {
  const path = window.location.pathname;

  if (path === '/admin') {
    return <AdminLogin />;
  }

  if (path === '/admin/dashboard') {
    return <AdminDashboard />;
  }

  if (path === '/admin/career') {
    return <AdminCareer />;
  }

  if (path === '/careers') {
    return (
      <div className="min-h-screen">
        <Header />
        <Careers />
        <Footer />
        <ChatbotWidget customerName="Guest" customerId="99aupairs" />
      </div>
    );
  }

  if (path === '/about') {
    return (
      <div className="min-h-screen">
        <Header />
        <AboutPage />
        <Footer />
        <ChatbotWidget customerName="Guest" customerId="99aupairs" />
      </div>
    );
  }

  if (path === '/services') {
    return (
      <div className="min-h-screen">
        <Header />
        <ServicesPage />
        <Footer />
        <ChatbotWidget customerName="Guest" customerId="99aupairs" />
      </div>
    );
  }

  if (path === '/portfolio') {
    return (
      <div className="min-h-screen">
        <Header />
        <PortfolioPage />
        <Footer />
        <ChatbotWidget customerName="Guest" customerId="99aupairs" />
      </div>
    );
  }

  if (path === '/contact') {
    return (
      <div className="min-h-screen">
        <Header />
        <ContactPage />
        <Footer />
        <ChatbotWidget customerName="Guest" customerId="99aupairs" />
      </div>
    );
  }

  if (path === '/blog') {
    return (
      <div className="min-h-screen">
        <Header />
        <BlogPage />
        <Footer />
        <ChatbotWidget customerName="Guest" customerId="99aupairs" />
      </div>
    );
  }

  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '');
    return (
      <div className="min-h-screen">
        <Header />
        <BlogDetailPage slug={slug} />
        <Footer />
        <ChatbotWidget customerName="Guest" customerId="99aupairs" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <AIAgentCapabilities />
      <About />
      <CaseStudies />
      <Contact />
      <Footer />
      <ChatbotWidget customerName="Guest" customerId="99aupairs" />
    </div>
  );
}

export default App;