import { TrendingUp, ShoppingCart, Building2, Heart, DollarSign, Users, BarChart, CheckCircle } from 'lucide-react';

export default function PortfolioPage() {
  const caseStudies = [
    {
      icon: ShoppingCart,
      company: 'Global Retail Chain',
      industry: 'E-commerce & Retail',
      title: 'AI-Powered Personalization Engine',
      challenge: 'A major retail chain was struggling with low conversion rates and high cart abandonment. Their generic product recommendations were not resonating with customers, leading to missed revenue opportunities.',
      solution: 'We developed a sophisticated AI personalization engine that analyzes customer behavior, purchase history, browsing patterns, and demographic data to deliver hyper-personalized product recommendations in real-time. The system uses collaborative filtering, deep learning, and natural language processing to understand customer preferences.',
      results: [
        '45% increase in conversion rates',
        '32% reduction in cart abandonment',
        '$12M additional annual revenue',
        '28% improvement in average order value',
        '65% increase in customer engagement'
      ],
      technologies: ['TensorFlow', 'Python', 'AWS', 'Redis', 'PostgreSQL'],
      timeline: '4 months',
      team: '8 specialists'
    },
    {
      icon: Heart,
      company: 'Regional Healthcare Network',
      industry: 'Healthcare',
      title: 'Predictive Patient Care Platform',
      challenge: 'The healthcare network faced challenges with patient readmission rates, inefficient resource allocation, and difficulty predicting patient deterioration. Manual processes were time-consuming and prone to oversight.',
      solution: 'We built an AI-powered predictive analytics platform that monitors patient data in real-time, identifies high-risk patients, predicts potential complications, and recommends preventive interventions. The system integrates with existing EMR systems and provides actionable insights to healthcare providers.',
      results: [
        '37% reduction in patient readmissions',
        '52% improvement in early detection of complications',
        '$8M annual cost savings',
        '25% reduction in average length of stay',
        '89% clinician satisfaction rate'
      ],
      technologies: ['PyTorch', 'Python', 'Azure', 'FHIR', 'MongoDB'],
      timeline: '6 months',
      team: '12 specialists'
    },
    {
      icon: Building2,
      company: 'Manufacturing Enterprise',
      industry: 'Manufacturing',
      title: 'Predictive Maintenance System',
      challenge: 'Unexpected equipment failures were causing production downtime, costing millions in lost productivity. Traditional preventive maintenance was either too early or too late, wasting resources.',
      solution: 'We implemented an IoT-enabled predictive maintenance solution using machine learning to analyze sensor data from equipment, predict failures before they occur, and optimize maintenance schedules. The system provides real-time alerts and maintenance recommendations.',
      results: [
        '68% reduction in unplanned downtime',
        '43% decrease in maintenance costs',
        '$15M annual savings',
        '35% improvement in equipment lifespan',
        '92% prediction accuracy'
      ],
      technologies: ['Scikit-learn', 'Python', 'Azure IoT', 'Time Series DB', 'Power BI'],
      timeline: '5 months',
      team: '10 specialists'
    },
    {
      icon: DollarSign,
      company: 'Financial Services Firm',
      industry: 'Finance',
      title: 'AI Fraud Detection System',
      challenge: 'The firm was experiencing significant losses due to fraudulent transactions. Their rule-based system had high false positive rates, causing customer frustration and operational inefficiency.',
      solution: 'We developed a real-time AI fraud detection system using advanced machine learning algorithms that analyze transaction patterns, user behavior, and contextual data to identify fraudulent activities with high accuracy while minimizing false positives.',
      results: [
        '84% improvement in fraud detection accuracy',
        '76% reduction in false positives',
        '$22M prevented fraud losses annually',
        '3-second average detection time',
        '94% customer satisfaction improvement'
      ],
      technologies: ['XGBoost', 'Python', 'Kafka', 'Cassandra', 'Docker'],
      timeline: '7 months',
      team: '14 specialists'
    },
    {
      icon: Users,
      company: 'Customer Service Platform',
      industry: 'SaaS',
      title: 'Intelligent Virtual Assistant',
      challenge: 'The company\'s support team was overwhelmed with repetitive customer inquiries, leading to long wait times and decreased satisfaction. Manual ticket routing was inefficient and error-prone.',
      solution: 'We created an AI-powered virtual assistant that handles customer inquiries 24/7, uses natural language understanding to comprehend complex questions, provides accurate responses, escalates complex issues to human agents, and learns from interactions to improve over time.',
      results: [
        '72% of inquiries resolved without human intervention',
        '88% reduction in average response time',
        '$5M annual cost savings',
        '91% customer satisfaction score',
        '4.8/5 virtual assistant rating'
      ],
      technologies: ['GPT-4', 'Python', 'AWS Lambda', 'DynamoDB', 'React'],
      timeline: '3 months',
      team: '6 specialists'
    },
    {
      icon: TrendingUp,
      company: 'Supply Chain Logistics',
      industry: 'Logistics',
      title: 'AI-Driven Route Optimization',
      challenge: 'The logistics company faced challenges with inefficient routing, high fuel costs, delayed deliveries, and difficulty adapting to real-time changes such as traffic or weather conditions.',
      solution: 'We developed an AI-powered route optimization system that uses machine learning, real-time data, and predictive analytics to determine the most efficient delivery routes, considering multiple variables including traffic patterns, weather, vehicle capacity, and delivery windows.',
      results: [
        '34% reduction in fuel costs',
        '41% improvement in on-time deliveries',
        '$18M annual operational savings',
        '29% increase in daily deliveries',
        '82% driver satisfaction improvement'
      ],
      technologies: ['Google OR-Tools', 'Python', 'Google Cloud', 'Redis', 'GraphQL'],
      timeline: '5 months',
      team: '9 specialists'
    },
    {
      icon: BarChart,
      company: 'Marketing Technology Company',
      industry: 'MarTech',
      title: 'Predictive Customer Analytics',
      challenge: 'The company lacked insights into customer behavior and couldn\'t effectively predict churn or identify upsell opportunities. Marketing campaigns were generic and ineffective.',
      solution: 'We built a comprehensive customer analytics platform that uses machine learning to segment customers, predict churn risk, identify upsell opportunities, and optimize marketing spend. The system provides real-time dashboards and actionable recommendations.',
      results: [
        '56% improvement in churn prediction',
        '47% increase in customer lifetime value',
        '$9M additional revenue from upsells',
        '38% improvement in marketing ROI',
        '71% reduction in customer acquisition cost'
      ],
      technologies: ['Pandas', 'Python', 'Snowflake', 'Tableau', 'Airflow'],
      timeline: '4 months',
      team: '7 specialists'
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world AI solutions delivering measurable results across industries
          </p>
        </div>

        <div className="mb-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Proven Track Record</h2>
          <p className="text-lg opacity-95 mb-8">
            We've helped organizations across industries transform their operations with AI
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Projects Delivered</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-4xl font-bold mb-2">$200M+</div>
              <div className="text-sm opacity-90">Client Value Created</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-sm opacity-90">Industries Served</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">Client Satisfaction</div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <study.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{study.title}</h2>
                    <div className="flex gap-4 mt-2">
                      <span className="text-sm opacity-90">{study.company}</span>
                      <span className="text-sm opacity-90">•</span>
                      <span className="text-sm opacity-90">{study.industry}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">The Challenge</h3>
                    <p className="text-gray-600">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Our Solution</h3>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Results Achieved</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-green-50 p-4 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Project Timeline</h4>
                      <p className="text-gray-900 font-medium">{study.timeline}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Team Size</h4>
                      <p className="text-gray-900 font-medium">{study.team}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create Your Success Story?</h2>
          <p className="text-xl mb-8 opacity-95">
            Let's discuss how we can help you achieve similar results
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
