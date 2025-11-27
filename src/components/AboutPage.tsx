import { Target, Users, Award, TrendingUp, Globe, Lightbulb, Heart, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About Deepiotics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pioneering the future of business through artificial intelligence and innovation
          </p>
        </div>

        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                Founded with a vision to democratize artificial intelligence, Deepiotics has emerged as a leading force in
                AI-driven business transformation. We believe that every organization, regardless of size or industry,
                should have access to cutting-edge AI solutions that drive real business value.
              </p>
              <p className="mb-4">
                Our journey began when our founders recognized a critical gap in the market: businesses needed more than
                just AI tools—they needed strategic partners who could understand their unique challenges and craft
                tailored solutions that deliver measurable results.
              </p>
              <p>
                Today, Deepiotics stands at the forefront of AI innovation, helping businesses across industries harness
                the power of artificial intelligence to optimize operations, enhance customer experiences, and unlock
                new opportunities for growth.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
            <Target className="w-16 h-16 mb-6" />
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg opacity-95">
              To empower businesses worldwide with intelligent AI solutions that transform challenges into opportunities,
              driving innovation, efficiency, and sustainable growth in an increasingly digital world.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
            <Lightbulb className="w-16 h-16 mb-6" />
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg opacity-95">
              To be the world's most trusted AI partner, recognized for creating transformative solutions that shape
              the future of business, foster innovation, and make advanced technology accessible to all.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Integrity</h3>
              <p className="text-gray-600">
                We operate with transparency, honesty, and ethical standards in everything we do, building trust with
                every interaction.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We constantly push boundaries, embrace new technologies, and create groundbreaking solutions that
                drive progress.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Collaboration</h3>
              <p className="text-gray-600">
                We believe in the power of partnership, working closely with clients to achieve shared success and
                lasting impact.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every project, delivering solutions that exceed expectations and create
                measurable value.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Deep Expertise</h3>
              <p className="text-gray-600 mb-6">
                Our team comprises world-class AI engineers, data scientists, and business strategists with decades
                of combined experience in developing and deploying enterprise-grade AI solutions.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Proven Track Record</h3>
              <p className="text-gray-600 mb-6">
                We've successfully delivered AI solutions for businesses across healthcare, finance, retail,
                manufacturing, and more, driving measurable ROI and operational excellence.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">End-to-End Solutions</h3>
              <p className="text-gray-600 mb-6">
                From initial strategy and proof of concept to full-scale deployment and ongoing optimization, we
                partner with you throughout your entire AI journey.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Client-Centric Approach</h3>
              <p className="text-gray-600">
                We don't believe in one-size-fits-all solutions. Every engagement begins with understanding your
                unique challenges, goals, and vision for success.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-xl text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-purple-600 mb-2">200+</div>
            <div className="text-xl text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-pink-600 mb-2">98%</div>
            <div className="text-xl text-gray-600">Client Satisfaction</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-95">
            Join hundreds of companies that trust Deepiotics to power their AI journey
          </p>
          <a
            href="https://calendly.com/researchmentorclinic1/ai-strategy-call-pre-call-questionnaire"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Schedule Your Free AI Strategy Session
          </a>
        </div>
      </div>
    </div>
  );
}
