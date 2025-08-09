import React from 'react';

interface SkeletonProps {
  className?: string;
  lines?: number;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = "h-4", 
  lines = 1, 
  height 
}) => {
  const skeletonClasses = `animate-pulse bg-gray-200 rounded ${height || className}`;
  
  if (lines === 1) {
    return <div className={skeletonClasses}></div>;
  }
  
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className={skeletonClasses}></div>
      ))}
    </div>
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="h-64 bg-gray-200 animate-pulse"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="relative py-20 bg-gradient-to-r from-gray-300 to-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <div className="h-16 bg-gray-200 rounded animate-pulse max-w-2xl mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse max-w-xl mx-auto"></div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse max-w-xs mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export const StatsSkeleton: React.FC = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="h-8 bg-gray-200 rounded animate-pulse max-w-md mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse max-w-lg mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FormSkeleton: React.FC = () => {
  return (
    <div className="bg-[#F8F7F0] rounded-2xl p-8">
      <div className="h-8 bg-gray-200 rounded animate-pulse mb-6"></div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default Skeleton; 