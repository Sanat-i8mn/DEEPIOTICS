import React, { useState } from 'react';
import { Brain, Database, Cog, BarChart3, Zap, Shield, ArrowRight, Bot, Network, LucideIcon } from 'lucide-react';
import ServiceModal from './ServiceModal';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  color: string;
}

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetConsultation = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };
  const services = [
    {
      icon: Brain,
      title: 'Scattered Teams Create Confusion',
      description: 'Multiple vendors cause misalignment, delays, and endless rework.',
      features: ['Custom Machine Learning Models', 'AI-Powered Chatbots & Virtual Assistants', 'Intelligent Document Processing', 'Predictive Business Analytics'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Bot,
      title: 'Poor Planning Derails AI Projects',
      description: 'Lack of clear requirements leads to failed or stalled builds.',
      features: ['Autonomous Task Execution', 'Multi-Channel Customer Engagement', 'Intelligent Decision Making', 'Seamless System Integration'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Network,
      title: 'Slow Releases Kill Momentum',
      description: 'Inefficient workflows make delivery unpredictable and costly.',
      features: ['Multi-Agent Orchestration', 'Collaborative AI Networks', 'Adaptive Learning Systems', 'Enterprise-Scale Deployment'],
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: BarChart3,
      title: 'Bad Architecture Breaks at Scale',
      description: 'Weak foundations cause instability as your product grows.',
      features: ['Advanced Business Intelligence', 'Real-Time Data Processing', 'Predictive Market Analysis', 'Custom Analytics Dashboards'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Zap,
      title: 'High Costs Burn Your Budget',
      description: 'Unnecessary complexity leads to overspending and slow ROI.',
      features: ['Custom API Development', 'Legacy System Integration', 'Cloud & On-Premise Deployment', 'Scalable AI Architecture'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Brain,
      title: 'Weak Communication Causes Chaos',
      description: 'Unclear updates and shifting expectations disrupt your roadmap.',
      features: ['Real-time Collaboration Tools', 'Automated Documentation Generation', 'Predictive Analytics for Project Timelines', 'Cross-platform Compatibility'],
      color: 'from-yellow-500 to-blue-500'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Remove the Roadblocks Slowing  {' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Product
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We eliminate the common failures that delay AI, web, and app builds—so you can launch without chaos.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleGetConsultation(service)}
                className="group/btn flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 md:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to Scale Your Business with AI?
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join 500+ companies that have increased revenue by 200%+ with our custom AI development services. Get your free strategy session today.
            </p>
            <a 
              href="https://calendly.com/researchmentorclinic1/ai-strategy-call-pre-call-questionnaire"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-block"
            >
              Get Free AI Strategy Session
            </a>
          </div>
        </div>
      </div>

      {/* Service Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={selectedService}
      />
    </section>
  );
};

export default Services;