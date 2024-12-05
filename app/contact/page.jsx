"use client"

import Link from "next/link";
import { 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Send,
  Slack,
  MessageCircle,
  ArrowLeft,
  MapPin,
  Phone
} from "lucide-react";
import { useRouter } from 'next/navigation';

export default function Contact() {
  const router = useRouter();

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Direct communication with our team",
      link: "mailto:support@reciperush.com",
      linkText: "support@reciperush.com"
    },
    {
      icon: Slack,
      title: "Slack Community",
      description: "Real-time cooking conversations",
      link: "https://join.slack.com/t/recipeRush/shared_invite/your-invite-link",
      linkText: "Join Slack Channel"
    },
    {
      icon: Github,
      title: "Open Source",
      description: "Contribute to our project",
      link: "https://github.com/Cheplusplus/ASE_2024_GROUP_C.git",
      linkText: "RecipeRush GitHub"
    },
    {
      icon: Linkedin,
      title: "Professional Network",
      description: "Connect and collaborate",
      link: "https://www.linkedin.com/company/recipeRush",
      linkText: "RecipeRush LinkedIn"
    },
    {
      icon: Twitter,
      title: "Social Media",
      description: "Updates and food inspiration",
      link: "https://twitter.com/RecipeRush",
      linkText: "@RecipeRush"
    },
    {
      icon: MessageCircle,
      title: "Discord Community",
      description: "Join culinary discussions",
      link: "https://discord.gg/recipeRush",
      linkText: "RecipeRush Discord"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f4f4] to-[#e0e0e0] dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Back Button*/}
      <div className="max-w-7xl mx-auto mb-8">
        <button 
          onClick={() => router.back()} 
          className="flex items-center group text-gray-700 dark:text-gray-300 hover:text-[#26442a] dark:hover:text-[#26442a] transition-all duration-300"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="group-hover:underline">Back</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl mb-16 overflow-hidden">
          <div className="p-12 text-center relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-10 -left-10 w-96 h-96 bg-[#26442a]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-[#26442a]/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#26442a] to-green-700 mb-4 animate-gradient-x">
                Connect with Recipe Rush
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We&#39;re here to help, collaborate, and inspire your culinary journey
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method) => (
            <div 
              key={method.title}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <method.icon className="w-12 h-12 text-[#26442a] mr-4 bg-[#26442a]/10 p-2 rounded-full" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {method.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {method.description}
                </p>
                <Link
                  href={method.link}
                  target="_blank"
                  className="inline-flex items-center text-[#26442a] hover:text-green-700 transition-colors group"
                >
                  <Send className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  {method.linkText}
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Contact Form with Advanced Design */}
        <section className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10">
            <h3 className="text-3xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#26442a] to-green-700">
              Send us a Message
            </h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#26442a]/50 dark:bg-gray-700 dark:text-white transition-all duration-300"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#26442a]/50 dark:bg-gray-700 dark:text-white transition-all duration-300"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea 
                  id="message" 
                  rows="5" 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#26442a]/50 dark:bg-gray-700 dark:text-white transition-all duration-300"
                  placeholder="Share your thoughts, feedback, or questions..."
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#26442a] text-white py-4 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Company Information */}
          <div className="bg-gradient-to-br from-[#26442a] to-green-700 text-white rounded-2xl shadow-2xl p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-black mb-6">
                Recipe Rush HQ
              </h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <MapPin className="w-8 h-8 mr-4" />
                  <div>
                    <p className="font-bold">Office Address</p>
                    <p>123 Recipe Street, Foodville</p>
                    <p>Johannesburg, South Africa</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-8 h-8 mr-4" />
                  <div>
                    <p className="font-bold">Contact Number</p>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-8 h-8 mr-4" />
                  <div>
                    <p className="font-bold">General Inquiries</p>
                    <p>contact@reciperush.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-white/20 pt-6">
              <p className="text-sm opacity-70">
                Business Hours: Monday - Friday, 9 AM - 5 PM GMT+2
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}