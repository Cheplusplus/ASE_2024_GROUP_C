import { AiOutlineArrowRight } from 'react-icons/ai'; // Correct icon import for ArrowRight
import { FaUtensils, FaEnvelope, FaPhone, FaMapPin, FaTwitter, FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa'; // Correct icon imports
import Link from 'next/link'; // Corrected import for Link

const Footer = () => {
    const socialLinks = [
      { 
        icon: FaTwitter, 
        href: 'https://twitter.com', 
        color: 'hover:text-[#1DA1F2] transition-colors duration-300',
        label: 'Twitter'
      },
      { 
        icon: FaYoutube, 
        href: 'https://youtube.com', 
        color: 'hover:text-[#FF0000] transition-colors duration-300',
        label: 'YouTube'
      },
      { 
        icon: FaFacebook, 
        href: 'https://facebook.com', 
        color: 'hover:text-[#4267B2] transition-colors duration-300',
        label: 'Facebook'
      },
      { 
        icon: FaInstagram, 
        href: 'https://instagram.com', 
        color: 'hover:text-[#E1306C] transition-colors duration-300',
        label: 'Instagram'
      },
    ];
  
    const quickLinks = [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Recipe Index', href: '/recipes' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ];
  
    return (
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
            {/* About Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center">
                <FaUtensils className="h-6 w-6 mr-2" />
                Recipe Rush
              </h3>
              <p className="text-gray-400">
                Discover and share delicious recipes from around the world.
              </p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white flex items-center group"
                    >
                      <AiOutlineArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <FaEnvelope className="h-4 w-4 mr-2" />
                  contact@reciperush.com
                </li>
                <li className="flex items-center">
                  <FaPhone className="h-4 w-4 mr-2" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <FaMapPin className="h-4 w-4 mr-2" />
                  123 Recipe Street, Foodville
                </li>
              </ul>
            </div>
  
            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe for new recipes and cooking tips.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition duration-300">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
  
          {/* Social Links */}
          <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} Recipe Rush. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;

