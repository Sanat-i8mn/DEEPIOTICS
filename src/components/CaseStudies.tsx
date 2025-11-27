import React from 'react';
import { ArrowRight, TrendingUp, DollarSign, Clock, Users } from 'lucide-react';

const CaseStudies = () => {
  const caseStudies = [
    {
      title: 'AI-Powered Manufacturing Optimization',
      client: 'Fortune 500 Manufacturing Leader',
      industry: 'Manufacturing',
      challenge: 'Reduce production defects by 80% and optimize quality control across 15 global facilities',
      solution: 'Deployed custom computer vision AI system with real-time defect detection and predictive maintenance algorithms',
      results: [
        { icon: TrendingUp, metric: '87%', description: 'Defect reduction achieved' },
        { icon: DollarSign, metric: '$4.2M', description: 'Annual cost savings' },
        { icon: Clock, metric: '65%', description: 'Faster quality inspection' }
      ],
      image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'AI Medical Diagnosis System',
      client: 'Leading Healthcare Network',
      industry: 'Healthcare',
      challenge: 'Improve diagnostic accuracy to 95%+ and reduce patient wait times by 50% across 20 hospitals',
      solution: 'Built custom AI medical imaging analysis system with natural language processing for patient triage',
      results: [
        { icon: TrendingUp, metric: '96%', description: 'Diagnostic accuracy rate' },
        { icon: Clock, metric: '58%', description: 'Reduction in wait times' },
        { icon: Users, metric: '2000+', description: 'Patients served daily' }
      ],
      image: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'AI Fraud Detection & Risk Management',
      client: 'Top-Tier Financial Institution',
      industry: 'Finance',
      challenge: 'Detect fraud in real-time with 99%+ accuracy while reducing false positives by 70%',
      solution: 'Developed advanced machine learning models for real-time fraud detection and intelligent risk assessment',
      results: [
        { icon: TrendingUp, metric: '99.2%', description: 'Fraud detection accuracy' },
        { icon: DollarSign, metric: '$12.5M', description: 'Fraud losses prevented' },
        { icon: Clock, metric: '73%', description: 'Reduction in false positives' }
      ],
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="case-studies" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Proven AI Development Success Stories:{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              $50M+ in Client Savings
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            See how our custom AI development services have transformed operations for Fortune 500 companies and growing businesses across industries, delivering measurable ROI and competitive advantages.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-12 sm:space-y-16">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="mb-4">
                  <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    {study.industry}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{study.title}</h3>
                  <p className="text-base sm:text-lg text-gray-600 font-medium">{study.client}</p>
                </div>

                <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Challenge</h4>
                    <p className="text-sm sm:text-base text-gray-600">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Solution</h4>
                    <p className="text-sm sm:text-base text-gray-600">{study.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
                  {study.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <result.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{result.metric}</div>
                      <div className="text-xs text-gray-600 leading-tight">{result.description}</div>
                    </div>
                  ))}
                </div>

                <button className="group flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  <span>Get Similar Results</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${study.color} rounded-2xl transform rotate-3`}></div>
                  <img
                    src={study.image}
                    alt={study.title}
                    className="relative rounded-2xl shadow-xl w-full h-64 sm:h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 sm:p-8 md:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to Achieve Similar Results?
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Join 500+ companies that have achieved 300%+ ROI with our custom AI development services. Get your free strategy session and discover how AI can transform your business.
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
    </section>
  );
};

export default CaseStudies;