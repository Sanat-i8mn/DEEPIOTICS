import { Bot, Brain, LineChart, Workflow, MessageSquare, Shield, Zap, Code, Database, Cpu, Network, CloudCog } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: Bot,
      title: 'AI Agent Development',
      description: 'Custom AI agents that automate complex tasks, make intelligent decisions, and interact naturally with users.',
      features: [
        'Conversational AI chatbots and virtual assistants',
        'Autonomous task execution and decision-making',
        'Multi-channel deployment (web, mobile, messaging)',
        'Natural language understanding and generation',
        'Context-aware responses and personalization',
        'Integration with existing business systems'
      ],
      benefits: [
        '24/7 automated customer support',
        'Reduced operational costs by up to 60%',
        'Improved response times and customer satisfaction',
        'Scalable solution that grows with your business'
      ]
    },
    {
      icon: Brain,
      title: 'Machine Learning Solutions',
      description: 'Advanced ML models tailored to your business needs, from predictive analytics to computer vision.',
      features: [
        'Custom model development and training',
        'Predictive analytics and forecasting',
        'Computer vision and image recognition',
        'Natural language processing',
        'Recommendation systems',
        'Anomaly detection and fraud prevention'
      ],
      benefits: [
        'Data-driven decision making',
        'Improved accuracy and efficiency',
        'Automated pattern recognition',
        'Enhanced business intelligence'
      ]
    },
    {
      icon: LineChart,
      title: 'Business Intelligence & Analytics',
      description: 'Transform raw data into actionable insights with our comprehensive BI and analytics solutions.',
      features: [
        'Real-time dashboards and reporting',
        'Data warehousing and ETL pipelines',
        'Advanced data visualization',
        'Predictive and prescriptive analytics',
        'Self-service BI tools',
        'Performance metrics and KPI tracking'
      ],
      benefits: [
        'Better strategic planning',
        'Faster time to insights',
        'Improved operational efficiency',
        'Data-driven culture'
      ]
    },
    {
      icon: Workflow,
      title: 'Process Automation',
      description: 'Streamline operations with intelligent automation that reduces manual work and increases efficiency.',
      features: [
        'Robotic Process Automation (RPA)',
        'Workflow optimization and automation',
        'Document processing and data extraction',
        'Integration with legacy systems',
        'Business rules engine',
        'Exception handling and monitoring'
      ],
      benefits: [
        'Up to 80% reduction in processing time',
        'Minimized human error',
        'Freed resources for strategic work',
        'Consistent and compliant processes'
      ]
    },
    {
      icon: MessageSquare,
      title: 'Conversational AI',
      description: 'Engage customers with intelligent chatbots and voice assistants that understand context and intent.',
      features: [
        'Multi-language support',
        'Sentiment analysis and emotion detection',
        'Voice recognition and synthesis',
        'Context management and memory',
        'Seamless handoff to human agents',
        'Analytics and conversation insights'
      ],
      benefits: [
        'Enhanced customer experience',
        'Increased engagement rates',
        'Reduced support costs',
        'Global reach with localization'
      ]
    },
    {
      icon: Database,
      title: 'Data Engineering',
      description: 'Build robust data infrastructure that powers your AI and analytics initiatives.',
      features: [
        'Data pipeline architecture',
        'Real-time data streaming',
        'Data quality and governance',
        'Cloud and hybrid solutions',
        'Big data processing',
        'Data lake and warehouse design'
      ],
      benefits: [
        'Reliable and scalable data infrastructure',
        'Improved data quality and consistency',
        'Faster data processing',
        'Reduced infrastructure costs'
      ]
    },
    {
      icon: Cpu,
      title: 'AI Strategy Consulting',
      description: 'Expert guidance to develop and execute your AI transformation roadmap.',
      features: [
        'AI readiness assessment',
        'Use case identification and prioritization',
        'ROI analysis and business case development',
        'Technology stack recommendations',
        'Implementation roadmap',
        'Change management and training'
      ],
      benefits: [
        'Clear AI strategy aligned with business goals',
        'Reduced risk and faster time to value',
        'Organizational AI readiness',
        'Competitive advantage'
      ]
    },
    {
      icon: Shield,
      title: 'AI Security & Compliance',
      description: 'Ensure your AI systems are secure, ethical, and compliant with regulations.',
      features: [
        'AI security audits and testing',
        'Bias detection and mitigation',
        'Privacy-preserving AI techniques',
        'Regulatory compliance (GDPR, CCPA, etc.)',
        'Model governance and monitoring',
        'Explainable AI implementation'
      ],
      benefits: [
        'Protected intellectual property',
        'Regulatory compliance assurance',
        'Trust and transparency',
        'Risk mitigation'
      ]
    },
    {
      icon: Code,
      title: 'Custom AI Development',
      description: 'Bespoke AI solutions built from the ground up to address your unique challenges.',
      features: [
        'Full-stack AI application development',
        'API development and integration',
        'Microservices architecture',
        'Cloud-native deployment',
        'Continuous integration and delivery',
        'Performance optimization'
      ],
      benefits: [
        'Tailored to exact requirements',
        'Competitive differentiation',
        'Full ownership and control',
        'Scalable and maintainable code'
      ]
    },
    {
      icon: Network,
      title: 'AI Integration Services',
      description: 'Seamlessly integrate AI capabilities into your existing systems and workflows.',
      features: [
        'Legacy system integration',
        'API and webhook development',
        'Middleware and orchestration',
        'Data synchronization',
        'Single sign-on and authentication',
        'Performance monitoring'
      ],
      benefits: [
        'Minimal disruption to operations',
        'Enhanced system capabilities',
        'Unified user experience',
        'Maximized existing investments'
      ]
    },
    {
      icon: CloudCog,
      title: 'MLOps & Model Deployment',
      description: 'Deploy, monitor, and maintain ML models in production with enterprise-grade MLOps practices.',
      features: [
        'Model versioning and registry',
        'Automated deployment pipelines',
        'A/B testing and experimentation',
        'Model monitoring and drift detection',
        'Scalable inference infrastructure',
        'Performance optimization'
      ],
      benefits: [
        'Faster model deployment',
        'Improved model reliability',
        'Reduced operational overhead',
        'Better model performance'
      ]
    },
    {
      icon: Zap,
      title: 'AI-Powered Optimization',
      description: 'Use AI to optimize business processes, resource allocation, and decision-making.',
      features: [
        'Supply chain optimization',
        'Dynamic pricing and revenue optimization',
        'Resource allocation and scheduling',
        'Demand forecasting',
        'Route optimization',
        'Inventory management'
      ],
      benefits: [
        'Reduced costs and waste',
        'Improved resource utilization',
        'Better customer satisfaction',
        'Increased profitability'
      ]
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive AI solutions designed to transform your business and drive measurable results
          </p>
        </div>

        <div className="mb-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">End-to-End AI Services</h2>
          <p className="text-lg opacity-95 mb-6">
            From initial strategy and consultation to development, deployment, and ongoing optimization,
            we provide complete AI solutions that deliver real business value. Our team of experts works
            closely with you to understand your unique challenges and craft tailored solutions that drive
            innovation and growth.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold mb-2">Discovery & Strategy</h3>
              <p className="text-sm opacity-90">We analyze your needs and develop a comprehensive AI roadmap</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold mb-2">Development & Deployment</h3>
              <p className="text-sm opacity-90">We build and launch production-ready AI solutions</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold mb-2">Support & Optimization</h3>
              <p className="text-sm opacity-90">We continuously monitor and improve your AI systems</p>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-shadow">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">{service.title}</h2>
                  <p className="text-lg text-gray-600">{service.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Business Benefits</h3>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">★</span>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-95">
            Let's discuss how our AI solutions can transform your business
          </p>
          <a
            href="https://calendly.com/researchmentorclinic1/ai-strategy-call-pre-call-questionnaire"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Schedule Your Free Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
