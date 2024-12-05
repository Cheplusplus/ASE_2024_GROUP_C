"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import Link from "next/link";

// Team Members Data
const teamMembers = [
  { 
    name: "Karabo", 
    image: "/teamMembers/KaraboRadebe.jpg", 
    role: "Lead Developer",
  },
  { 
    name: "Nomusa", 
    image: "/teamMembers/NomusaMtshali.jpg", 
    role: "UI Designer",
  },
  { 
    name: "Phillip", 
    image: "/teamMembers/PhillipBogopane.png", 
    role: "Backend Developer",
  },
  { 
    name: "Angel",
    image: "/teamMembers/KeaNtheledi.jpg", 
    role: "Frontend Developer",
  },
  { 
    name: "Kutlwano", 
    image: "/teamMembers/KutlwanoRamotebele.jpeg", 
    role: "Product Manager",
  },
  { 
    name: "Koketso", 
    image: "/teamMembers/KoketsoMoilwe.jpg", 
    role: "Marketing Specialist",
  },
  { 
    name: "Kitso", 
    image: "/teamMembers/KitsoMogale.jpg", 
    role: "DevOps Engineer",
  },
  { 
    name: "Mmakgosana", 
    image: "/teamMembers/MmakgosanaMakgaka.jpg", 
    role: "UX Designer",
  },
  { 
    name: "Mateo", 
    image: "/teamMembers/MateoBenzien.jpg", 
    role: "Data Scientist",
  }
];

const TeamCarousel = ({ heading = "Meet Our Team" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleImageError = (index) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  // Calculate how many members to display (3 at a time)
  const displayedMembers = teamMembers.slice(currentIndex, currentIndex + 3)
    .concat(teamMembers.slice(0, Math.max(0, currentIndex + 3 - teamMembers.length)));

  return (
    <div>
      <h2 className="text-center text-3xl font-semibold mb-10">{heading}</h2>

      {/* Carousel Container */}
      <div className="flex justify-center items-center overflow-hidden">
        <div className="flex space-x-80 transition-transform duration-500 ease-in-out">
          {displayedMembers.map((member, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[150x] text-center"
            >
              <Link href="/about" className="block">
              <div className="relative w-[150px] h-[150px] mx-auto mb-2">
                {imageErrors[index] || !member.image ? (
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-500" />
                  </div>
                ) : (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    onError={() => handleImageError(index)}
                    sizes="(max-width: 768px) 100px, (max-width: 1024px) 150px, 150px"
                    className="object-cover rounded-full"
                  />
                )}
              </div>
              </Link>
              <div>
                <p className="font-semibold text-md">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-8 space-x-4">
        {teamMembers.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamCarousel;