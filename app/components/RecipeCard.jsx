import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MAX_VISIBLE_TAGS = 2;

// SVG Icons as constants for reusability and improved readability
const ClockIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const LightningIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const PeopleIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const RecipeCard = ({ recipe: { _id, title, images, prep, cook, servings, tags = [] } }) => {
  const remainingTags = tags.length - MAX_VISIBLE_TAGS;

  return (
    <Link href={`/recipes/${_id}`} className="block">
      <div className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Main Image Container */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={images[0]}
            alt={title}
            width={555}
            height={416}
            style={{ objectFit: 'cover' }}
            className="transform transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content Container */}
        <div className="p-6">
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
            {title}
          </h2>
          
          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              {ClockIcon}
              <span>Prep: {prep} mins</span>
            </div>
            <div className="flex items-center gap-1">
              {LightningIcon}
              <span>Cook: {cook} mins</span>
            </div>
            <div className="flex items-center gap-1">
              {PeopleIcon}
              <span>{servings} servings</span>
            </div>
          </div>

          {/* Tags with "more" indicator */}
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {tags.slice(0, MAX_VISIBLE_TAGS).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {remainingTags > 0 && (
                <span className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                  +{remainingTags} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
