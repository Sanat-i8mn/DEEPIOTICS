import React from 'react';
import { Users, Award, Globe, TrendingUp, CheckCircle, Star } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: '50+', label: 'Expert Team Members' },
    { icon: Award, value: '1000+', label: 'AI Solutions Deployed' },
    { icon: Globe, value: '25+', label: 'Countries Served' },
    { icon: TrendingUp, value: '$50M+', label: 'Client Cost Savings' }
  ];

  const values = [
    {
      title: 'Proven AI Expertise',
      description: 'Our team of certified AI specialists and data scientists brings 10+ years of experience in enterprise AI development.'
    },
    {
      title: 'Guaranteed ROI',
      description: 'We guarantee measurable results within 6 months or your money back. Average client ROI: 300%+'
    },
    {
      title: 'Enterprise-Grade Security',
      description: 'Bank-level security, GDPR compliance, and rigorous testing ensure your AI solutions are production-ready.'
    },
    {
      title: 'End-to-End Partnership',
      description: 'From strategy to deployment and beyond - we provide complete AI development lifecycle support.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why 100+ Companies Choose{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Deepiotics for AI Development
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            As a leading AI development company, we've helped over 500 enterprises achieve 300% efficiency gains and $50M+ in cost savings through custom machine learning solutions and intelligent automation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 sm:mb-20">
          {/* Left Column - Content */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Proven AI Development Expertise That Delivers Results
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
              With over a decade of AI development experience, Deepiotics has become the trusted partner for enterprises seeking transformative artificial intelligence solutions. Our team of 50+ AI specialists, data scientists, and ML engineers has delivered over 1,000 successful AI implementations across 25+ industries.
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              From Fortune 500 corporations to innovative startups, we've consistently delivered custom AI solutions that generate measurable ROI within 6 months. Our proven methodology combines cutting-edge machine learning techniques with deep industry expertise to solve your most complex business challenges.
            </p>

            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">{value.title}</h4>
                    <p className="text-sm sm:text-base text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border border-white/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 border border-white/20">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Meet Our AI Development Experts
            </h3>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Led by industry veterans with 15+ years in AI development, our leadership team has built AI solutions for Google, Microsoft, and Fortune 500 companies worldwide.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                name: 'Ayan Nigam',
                role: 'Founder & CEO',
                description: 'With 20+ years of industry experience, Ayan drives AI strategy and innovation, transforming businesses through intelligent automation.',
                image: 'https://res.cloudinary.com/dq5v1ewpq/image/upload/v1754281036/ayan_g3mkvg.jpg',
                linkedin: 'https://www.linkedin.com/in/ayannigam/'
              },
              {
                name: 'Dr. Bhawna Nigam',
                role: 'Co-Founder & AI Consultant',
                description: 'Ph.D. in AI with 50+ research papers and 70+ successful AI projects, she specializes in scalable AI systems and ML engineering.',
                image: '/bhawna.png',
                linkedin: 'https://www.linkedin.com/in/dr-bhawna-nigam/'
              },
              {
                name: 'Dr. Madhu Jain',
                role: 'Head of R&D and Data Science',
                description: 'Ph.D. and data science expert leading research and innovation initiatives across AI and analytics.',
                image: '/madhuji.png',
                linkedin: 'https://www.linkedin.com/in/madhu-jain-5b5917376/'
              },
              {
                name: 'Rajshri Nigam',
                role: 'Head of Business Development',
                description: 'Leads business development and client strategy, driving growth and partnerships in the global AI ecosystem.',
                image: '/rajeshri.png',
                linkedin: 'https://www.linkedin.com/in/rajeshri-nigam-a4941337a/'
              },
              {
                name: 'Narendra Pipliwal',
                role: 'Project Manager – AI Implementation',
                description: 'Manages AI deployment and process optimization, ensuring smooth execution of client AI solutions.',
                image: '/Narendra.png',
                linkedin: 'https://www.linkedin.com/in/narendra-pipliwal'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100">
                <div className="relative mb-5">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-gradient-to-r from-blue-600 to-purple-600 shadow-md group-hover:scale-105 transition-transform duration-300"

                  />
                  <div className="absolute inset-0 w-28 h-28 rounded-full mx-auto bg-gradient-to-r from-blue-600/10 to-purple-600/10 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-blue-600 font-semibold mb-3 text-sm">{member.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{member.description}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;