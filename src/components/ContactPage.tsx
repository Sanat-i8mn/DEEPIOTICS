import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Linkedin, Twitter, Facebook, Instagram, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const googleSheetsUrl = new URL('https://script.google.com/macros/s/AKfycbwF64LxEQZ7qdsb-DxeGfR3MVPqEoowpXU5ZcVjAKwWX2ja2zTCvT2qoxKx2QM2NC4/exec');
      googleSheetsUrl.searchParams.append('name', formData.name);
      googleSheetsUrl.searchParams.append('email', formData.email);
      googleSheetsUrl.searchParams.append('company', formData.company);
      googleSheetsUrl.searchParams.append('phone', formData.phone);
      googleSheetsUrl.searchParams.append('subject', formData.subject);
      googleSheetsUrl.searchParams.append('message', formData.message);

      fetch(googleSheetsUrl.toString(), {
        method: 'GET',
        mode: 'no-cors',
      }).catch(() => {});

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact-form`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        const errorData = await response.text();
        console.error('Response error:', response.status, errorData);
        alert('Failed to send message. Please try again or contact us directly via email.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Failed to send message. Please try again or contact us directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let's discuss how we can help transform your business with AI
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Send us an email and we'll respond within 24 hours</p>
            <a href="mailto:ai-experts@deepiotics.com" className="text-blue-600 font-medium hover:underline">
              ai-experts@deepiotics.com
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Speak directly with our team</p>
            <a href="tel:+919826324365" className="text-blue-600 font-medium hover:underline">
              +91 9826324365
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-4">Come say hello at our office</p>
            <p className="text-blue-600 font-medium">
              Atulya IT Park<br />
              Indore, MP 452016<br />
              India
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 9826324365"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your project and requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Schedule a Free Consultation</h2>
              <p className="text-base opacity-95 mb-6">
                Book a 30-minute AI strategy call with our experts to discuss your specific needs and
                explore how AI can transform your business.
              </p>
              <a
                href="https://calendly.com/researchmentorclinic1/ai-strategy-call-pre-call-questionnaire"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Book Your Free Session
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Monday - Friday</p>
                    <p className="text-gray-600 text-sm">9:00 AM - 6:00 PM PST</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Saturday</p>
                    <p className="text-gray-600 text-sm">10:00 AM - 4:00 PM PST</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Sunday</p>
                    <p className="text-gray-600 text-sm">Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/deepiotics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-blue-600" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center hover:bg-sky-200 transition-colors"
                >
                  <Twitter className="w-6 h-6 text-sky-600" />
                </a>
                <a
                  href="https://share.google/T98ArPPYIYaTLTVZ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                >
                  <Facebook className="w-6 h-6 text-blue-700" />
                </a>
                <a
                  href="https://share.google/SHS9rC3Rumrp9DahO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center hover:bg-pink-200 transition-colors"
                >
                  <Instagram className="w-6 h-6 text-pink-600" />
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
              <MessageSquare className="w-10 h-10 mb-3" />
              <h3 className="text-xl font-bold mb-2">Need Immediate Help?</h3>
              <p className="opacity-95 mb-3 text-sm">
                Our AI-powered chatbot is available 24/7 to answer your questions and provide instant assistance.
              </p>
              <p className="text-xs opacity-90">
                Look for the chat widget in the bottom right corner of your screen!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">What is the typical timeline for an AI project?</h3>
              <p className="text-gray-600">
                Project timelines vary based on complexity, but most projects range from 3-6 months from initial
                consultation to deployment. We provide detailed timelines during the discovery phase.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do you work with startups or only enterprises?</h3>
              <p className="text-gray-600">
                We work with organizations of all sizes, from startups to Fortune 500 companies. Our solutions
                are tailored to your specific needs and budget.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">What industries do you specialize in?</h3>
              <p className="text-gray-600">
                We have experience across 15+ industries including healthcare, finance, retail, manufacturing,
                logistics, and more. Our team adapts to industry-specific requirements.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do you provide ongoing support after deployment?</h3>
              <p className="text-gray-600">
                Yes! We offer comprehensive support and maintenance packages to ensure your AI solutions continue
                to perform optimally and evolve with your business needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
