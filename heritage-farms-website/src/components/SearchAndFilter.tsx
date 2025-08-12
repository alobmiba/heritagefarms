'use client';

import React, { useState, useEffect } from 'react';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  categories: string[];
  priceRanges: PriceRange[];
}

interface FilterOptions {
  category: string;
  priceRange: string;
  inStock: boolean;
  sortBy: string;
}

interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number | null;
}

export default function SearchAndFilter({ 
  onSearch, 
  onFilterChange, 
  categories, 
  priceRanges 
}: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    priceRange: '',
    inStock: false,
    sortBy: 'name'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleFilterChange = (key: keyof FilterOptions, value: string | boolean) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      inStock: false,
      sortBy: 'name'
    });
    setSearchQuery('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EDDD5E] focus:border-transparent outline-none"
            aria-label="Search products"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Filter Toggle for Mobile */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#EDDD5E]"
          aria-expanded={isFilterOpen}
          aria-controls="filter-panel"
        >
          <span className="font-medium">Filters</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filter Panel */}
      <div
        id="filter-panel"
        className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Category Filter */}
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category-filter"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EDDD5E] focus:border-transparent outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label htmlFor="price-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <select
              id="price-filter"
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EDDD5E] focus:border-transparent outline-none"
            >
              <option value="">All Prices</option>
              {priceRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label htmlFor="sort-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              id="sort-filter"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EDDD5E] focus:border-transparent outline-none"
            >
              <option value="name">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="price">Price Low to High</option>
              <option value="price-desc">Price High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* Stock Filter */}
          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                className="w-4 h-4 text-[#EDDD5E] border-gray-300 rounded focus:ring-[#EDDD5E] focus:ring-2"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                In Stock Only
              </span>
            </label>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#EDDD5E]"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
}
