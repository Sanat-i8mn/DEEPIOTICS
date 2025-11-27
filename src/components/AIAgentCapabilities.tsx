import React, { useState } from 'react';
import { Bot, Target, TrendingUp, Users, MessageSquare, BarChart3, Zap, Brain, ArrowRight, CheckCircle, Download, LucideIcon } from 'lucide-react';
import ServiceModal from './ServiceModal';

interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  color: string;
}

const AIAgentCapabilities = () => {
  const [selectedService, setSelectedService] = useState<Capability | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = (capability: Capability) => {
    setSelectedService(capability);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };
  const capabilities = [
    {
      icon: MessageSquare,
      title: 'Web & App Development',
      description: 'Build scalable, high-performance web and mobile applications with cutting-edge technologies. From responsive websites to complex enterprise applications, we deliver solutions that drive business growth.',
      features: ['Responsive Web Design', 'Mobile App Development', 'Progressive Web Apps', 'E-commerce Solutions'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'AI Agent Development - Agentic AI Chatbots',
      description: 'Deploy intelligent AI agents that autonomously handle complex business tasks. Our agentic AI chatbots work 24/7 to qualify leads, provide customer support, and drive conversions with human-like interactions.',
      features: ['Autonomous Task Execution', 'Lead Qualification Automation', 'Multi-Channel Integration', 'Natural Language Understanding'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'AI Business Process Automation',
      description: 'Transform your operations with intelligent automation that eliminates manual tasks, reduces errors, and accelerates workflows. Achieve 300% efficiency gains with our custom AI automation solutions.',
      features: ['Workflow Automation', 'Document Processing', 'Intelligent Data Entry', 'Process Optimization'],
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Users,
      title: 'Generative AI Model Development',
      description: 'Harness the power of generative AI with custom models tailored to your business needs. From content generation to creative design, unlock new possibilities with cutting-edge AI technology.',
      features: ['Custom LLM Development', 'Content Generation AI', 'Image & Video Synthesis', 'AI-Powered Creativity'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: TrendingUp,
      title: 'Fast MVP & Prototype Delivery',
      description: 'Launch your AI product in 30 days with our rapid MVP development. We help startups and enterprises validate ideas quickly, iterate fast, and get to market before the competition.',
      features: ['30-Day Deployment', 'Agile Development', 'Quick Iterations', 'Market Validation'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Data-driven Forecasting, Predictive Analytics & Insights',
      description: 'Make smarter decisions with AI-powered predictive analytics. Our machine learning models analyze historical data and market trends to forecast outcomes with 95% accuracy.',
      features: ['Sales Forecasting', 'Demand Prediction', 'Customer Behavior Analysis', 'Real-time Insights'],
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const benefits = [
    { metric: '300%', description: 'Increase in qualified leads' },
    { metric: '85%', description: 'Reduction in customer acquisition cost' },
    { metric: '250%', description: 'Improvement in conversion rates' },
    { metric: '90%', description: 'Time saved on manual tasks' }
  ];

  const handleDownloadGuide = () => {
    const guideContent = `AI CAPABILITIES GUIDE
Deepiotics — Custom AI Solutions Deployed in 30 Days with Guaranteed ROI

1. EXECUTIVE SUMMARY

At Deepiotics, we partner with forward-thinking companies to deliver custom AI solutions that drive real business outcomes: increased conversion, better engagement, improved operational efficiency and faster growth. As we commit on our site: "Get your custom AI solution deployed in 30 days with guaranteed ROI."

This guide outlines our core AI capabilities, our approach, and how you can get started.

2. WHY AI MATTERS TODAY

AI has transitioned from niche to business-critical technology — from automating workflows to making real-time predictions.

Companies leveraging AI effectively gain an edge in speed, accuracy, and scale.

Deepiotics helps you not just build AI — we help you deploy it, adopt it, and realize value quickly.

3. OUR CORE AI CAPABILITIES

Below are the major service pillars offered by Deepiotics:

a. Intelligent Sales Chatbots
AI-powered conversational agents that qualify leads, answer product questions, and guide prospects through your sales funnel 24/7.

b. Predictive Lead Scoring
Advanced machine learning algorithms that analyze customer behaviour and predict conversion probability with high accuracy.

c. Marketing Analytics AI
Intelligent data analysis that uncovers hidden patterns in marketing campaigns and delivers actionable insights.

Each capability is customized for your industry, data set, and business objective.

4. HOW WE WORK — DEPLOYMENT PROCESS

• Discovery & Strategy – Understand your business, goals & data.
• Prototype & Validate – Build a proof-of-concept quickly, test assumptions.
• Build & Integrate – Build full solution; integrate with your systems (CRM, web, mobile).
• Deploy & Monitor – Deploy within 30 days and monitor for performance.
• Scale & Optimize – Expand across departments, optimize models and processes.

5. INDUSTRIES WE SERVE

We work across sectors where data, customer experience, and automation matter, including:

• Sales & Marketing
• FinTech
• Healthcare
• Customer Service
• Supply Chain & Logistics

(Regardless of sector, our focus is on delivering business-value through AI.)

6. WHY CHOOSE DEEPIOTICS

• Rapid deployment (30 days) with a commitment to ROI.
• End-to-end delivery: strategy, model-building, integration, operations.
• Tailored AI solutions — not one-size-fits-all.
• Deep expertise in AI, ML, IoT, computer vision & data analytics.

7. SUCCESS METRICS & OUTCOME FOCUS

When you engage with us, we define success metrics up front: e.g.,

• % increase in qualified leads
• % uplift in conversions
• Reduction in cost per acquisition
• Time to deployment and adoption

We track these, and you see measurable results.

8. HOW TO GET STARTED

Book a Free AI Agent Demo or reach out for a Consultation — we'll assess your data, define roadmap.

After that: we begin the 30-day deployment cycle.

9. CONTACT & NEXT STEPS

Deepiotics Pvt. Ltd.
Location: Atulya IT Park, Indore, MP 452016, India
Email: ai-experts@deepiotics.com
Phone: +919826324365
Website: https://deepiotics.com

Let's start the conversation — transform your business with AI.`;

    const blob = new Blob([guideContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Deepiotics-AI-Capabilities-Guide.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
           Enterprise AI Development Services  {' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              That Transform Industries
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            From custom machine learning models to enterprise AI automation, our proven development services deliver measurable ROI and competitive advantage for 100+ companies and growing businesses.
          </p>
        </div>

        {/* Benefits Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{benefit.metric}</div>
              <div className="text-xs sm:text-sm text-gray-600">{benefit.description}</div>
            </div>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${capability.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <capability.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{capability.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{capability.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {capability.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleLearnMore(capability)}
                className="group/btn flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Featured Demo Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 border border-white/20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">AI Sales Assistant Demo</h3>
                  <p className="text-sm sm:text-base text-gray-600">See our AI agent in action</p>
                </div>
              </div>

              <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Watch How Our AI Agents Transform Sales Performance
              </h4>
              <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                Experience firsthand how Deepiotics AI agents revolutionize sales and marketing operations. Our intelligent systems have helped Fortune 500 companies achieve 300% increases in qualified leads while reducing customer acquisition costs by 85%.
              </p>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Real-time lead qualification and scoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Automated personalized marketing campaigns</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Predictive analytics for sales forecasting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">24/7 intelligent customer engagement</span>
                </div>
              </div>

              <a
                href="https://calendly.com/researchmentorclinic1/ai-strategy-call-pre-call-questionnaire"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 inline-flex"
              >
                <span>Schedule AI Demo</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Right Column - Demo Interface */}
            <div className="relative">
              <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">Deepiotics AI Sales Assistant</span>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                    Hi! I'm your AI sales assistant. I've analyzed your visitor behavior and identified 3 high-value prospects ready for engagement.
                  </div>
                  
                  <div className="bg-gray-700 text-gray-300 p-3 rounded-lg max-w-xs ml-auto">
                    Show me the lead analysis
                  </div>
                  
                  <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                    <div className="mb-2">📊 Lead Score: 95/100</div>
                    <div className="mb-2">🎯 Intent: High (Product Demo Request)</div>
                    <div className="mb-2">💰 Est. Value: $50,000</div>
                    <div>⚡ Recommended Action: Immediate follow-up</div>
                  </div>
                  
                  <div className="bg-green-600 text-white p-2 rounded-lg text-center">
                    ✅ Auto-scheduling demo call for tomorrow 2 PM
                  </div>
                </div>
              </div>
              
              {/* Floating metrics */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg p-3 shadow-lg border">
                <div className="text-xs text-gray-500">Conversion Rate</div>
                <div className="text-lg font-bold text-green-600">+247%</div>
              </div>
              
              <div className="absolute -bottom-12 -left-4 bg-white rounded-lg p-3 shadow-lg border">
                <div className="text-xs text-gray-500">Response Time</div>
                <div className="text-lg font-bold text-blue-600">0.3s</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Deploy AI Agents for Your Sales & Marketing?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join 200+ companies that have revolutionized their sales and marketing with Deepiotics AI agents. Get your custom AI solution deployed in 30 days with guaranteed ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://calendly.com/researchmentorclinic1/ai-strategy-call-pre-call-questionnaire"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-block"
              >
                Get Free AI Agent Demo
              </a>
              <button
                onClick={handleDownloadGuide}
                className="bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download AI Capabilities Guide</span>
              </button>
            </div>
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

export default AIAgentCapabilities;