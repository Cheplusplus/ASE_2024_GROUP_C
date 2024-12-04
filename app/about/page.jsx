"use client"

import Image from "next/image";
import Link from "next/link";
import { 
  Github, 
  Linkedin,  
  Mail,
  ArrowLeft,
  Star,
  Globe,
  Layers,
  Target,
  Zap
} from "lucide-react";
import { useRouter } from 'next/navigation';

const teamMembers = [
    { 
      name: "Karabo Radebe", 
      image: "/teamMembers/KaraboRadebe.jpg", 
      role: "Lead Developer",
      bio: "Passionate full-stack developer with experience in creating innovative web applications.",
      links: {
        github: "https://github.com/Karabo-M-Radebe" ,
        linkedin: "https://www.linkedin.com/in/karabo-m-radebe/",
        mail: "mailto:kaymesuliradebe@gmail.com"
      }
    },
    { 
      name: "Nomusa Mtshali", 
      image: "/teamMembers/NomusaMtshali.jpg", 
      role: "UI Designer",
      bio: "Design enthusiast creating visually stunning and user-friendly interfaces.",
      links: {
          github: "https://github.com/nomusamtshali",
        linkedin: "https://www.linkedin.com/in/nomusa-mtshali/", 
        mail: "mailto:kelebogilemtshali17@gmail.com"
      }
    },
    { 
      name: "Phillip Bogopane", 
      image: "/teamMembers/PhillipBogopane.png", 
      role: "Backend Developer",
      bio: "Expert in building scalable and efficient backend systems with a focus on performance.",
      links: {
        github: "https://github.com/Phillip-tech",
        linkedin: "https://linkedin.com/in/username",
        mail: "mailto:pm.bogopane@gmail.com"
      }
    },
    { 
      name: "Angel Ntheledi",
      image: "/teamMembers/KeaNtheledi.jpg", 
      role: "Frontend Developer",
      bio: "React and Next.js specialist passionate about creating responsive and interactive web interfaces.",
      links: {
        github: "https://github.com/Kea-Angel-Ntheledi",
        linkedin: "https://linkedin.com/in/username",
        mail: "mailto:kealebogaangelntheledi@gmail.com"
      }
    },
    { 
      name: "Kutlwano Ramotebele", 
      image: "/teamMembers/KutlwanoRamotebele.jpeg", 
      role: "Product Manager",
      bio: "Strategic product manager with a vision for creating user-centric digital solutions.",
      links: {
        github: "https://github.com/kutlwano10",
        linkedin: "https://www.linkedin.com/in/kutlwano-ramotebele-769461296/",
        mail: "mailto:kutlwano.ramotebele@gmail.com"
      }
    },
    { 
      name: "Koketso Moilwe", 
      image: "/teamMembers/KoketsoMoilwe.jpg", 
      role: "Marketing Specialist",
      bio: "Digital marketing expert who loves connecting food lovers with amazing culinary experiences.",
      links: {
          github: "https://github.com/KoketsoMoilwe20",
        linkedin: "https://www.linkedin.com/in/koketsomoilwe/",
        mail: "mailto:koketsomoilwe2@gmail.com"
      }
    },
    { 
      name: "Kitso Mogale", 
      image: "/teamMembers/KitsoMogale.jpg", 
      role: "DevOps Engineer",
      bio: "Infrastructure wizard ensuring smooth deployments and optimal application performance.",
      links: {
        github: "https://github.com/KitsoMogale",
        linkedin: "https://www.linkedin.com/in/kitso-mogale-200663321/",
        mail: "mailto:kitsomogale19@gmail.com"
      }
    },
    { 
      name: "Mmakgosana Makgaka", 
      image: "/teamMembers/MmakgosanaMakgaka.jpg", 
      role: "UX Designer",
      bio: "Creative UX designer dedicated to crafting intuitive and delightful user experiences.",
      links: {
        github: "https://github.com/Mmakgosana",
        linkedin: "https://www.linkedin.com/in/mmakgosana-makgaka-b32478313/",
        mail: "mailto:makgakammakgosana@gmail.com"
      }
    },
    { 
      name: "Mateo Benzien", 
      image: "/teamMembers/MateoBenzien.jpg", 
      role: "Data Scientist",
      bio: "Data guru transforming recipe insights into personalized culinary recommendations.",
      links: {
        github: "https://github.com/Mateo-Benzien",
       linkedin : "https://www.linkedin.com/in/mateo-benzien-857864302/",
       mail: "mailto:mateobenzien822@gmail.com"
      }
    }
  ];

export default function About() {
  const router = useRouter();

  const renderSocialLinks = (links) => {
    const socialIcons = {
      github: Github,
      linkedin: Linkedin,
      mail: Mail
    };

    return Object.entries(links).map(([platform, url]) => {
      const linkUrl = platform === 'mail' ? `mailto:${url}` : url;
      const Icon = socialIcons[platform];
      
      return (
        <Link 
          key={platform} 
          href={linkUrl} 
          target="_blank" 
          className="text-gray-600 hover:text-[#26442a] dark:text-gray-400 dark:hover:text-[#26442a] transition-all duration-300 transform hover:scale-110"
        >
          <Icon className="w-6 h-6" />
        </Link>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f4f4] to-[#e0e0e0] dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      {/* Back Button with Enhanced Design */}
      <div className="max-w-7xl mx-auto mb-8">
        <button 
          onClick={() => router.back()} 
          className="flex items-center group text-gray-700 dark:text-gray-300 hover:text-[#26442a] dark:hover:text-[#26442a] transition-all duration-300"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="group-hover:underline">Back</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section with Dynamic Background */}
        <section className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -left-10 w-96 h-96 bg-[#26442a]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-[#26442a]/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 p-12 text-center">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#26442a] to-green-700 mb-4 animate-gradient-x">
              Recipe Rush
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Transforming Culinary Experiences Through Technology and Passion
            </p>
          </div>
        </section>

        {/* Mission Section with Icons */}
        <section className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Our Mission",
              description: "Empower home cooks with intuitive, inspiring recipe discovery and sharing tools."
            },
            {
              icon: Zap,
              title: "Our Vision",
              description: "Create a global community where cooking becomes an accessible, enjoyable experience for everyone."
            },
            {
              icon: Layers,
              title: "Our Approach",
              description: "Blend cutting-edge technology with culinary creativity to revolutionize how people interact with food."
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <item.icon className="w-12 h-12 text-[#26442a] mr-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </section>

           {/* Team Section with Circular Portraits */}
      <section className="mt-16">
        <h2 className="text-4xl font-black text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#26442a] to-green-700">
          Meet Our Passionate Team
        </h2>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-12 relative z-10">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name} 
                className="flex flex-col items-center group"
              >
                <div className="relative w-48 h-48 mb-4 transform transition-all duration-300 
                  hover:scale-105 hover:rotate-6 
                  group-hover:brightness-75 
                  rounded-full overflow-hidden border-4 border-white shadow-lg
                  dark:border-gray-700"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover absolute inset-0"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {member.bio}
                  </p>
                  <div className="flex justify-center space-x-3">
                    {renderSocialLinks(member.links)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#26442a]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
        </section>

        {/* Technology Stack with Animated Gradient */}
        <section className="bg-gradient-to-r from-[#26442a] to-green-700 text-white rounded-2xl p-12 shadow-2xl">
          <h2 className="text-4xl font-black text-center mb-12">
            Our Technology Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend",
                technologies: [
                  "Next.js",
                  "React",
                  "Tailwind CSS"
                ]
              },
              {
                title: "Backend",
                technologies: [
                  "Node.js",
                  "MongoDB",
                  "NextAuth.js"
                ]
              },
              {
                title: "DevOps",
                technologies: [
                  "Vercel",
                  "GitHub Actions"
                ]
              }
            ].map((stack, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-white/20">
                  {stack.title}
                </h3>
                <ul className="space-y-2">
                  {stack.technologies.map((tech, techIndex) => (
                    <li 
                      key={techIndex} 
                      className="flex items-center text-white/80 hover:text-white transition-colors"
                    >
                      <Star className="w-4 h-4 mr-2 text-yellow-400" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg">
            <h2 className="text-4xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#26442a] to-green-700">
              Join Our Culinary Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're a home cook, professional chef, or food enthusiast, 
              Recipe Rush is your platform to explore, create, and share amazing recipes.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-[#26442a] text-white px-10 py-4 rounded-full text-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}