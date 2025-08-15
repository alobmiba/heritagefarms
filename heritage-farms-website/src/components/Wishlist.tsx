'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  priceUnit: string;
  image: string;
  sku: string;
}

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Wishlist({ isOpen, onClose }: WishlistProps) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { addToCart } = useCart();

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('heritage-farms-wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('heritage-farms-wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const moveToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      localName: item.name, // Use name as localName since WishlistItem doesn't have localName
      price: item.price.toString(),
      image: item.image,
    });
    removeFromWishlist(item.id);
  };

  const formatPrice = (price: number, unit: string) => {
    return `$${price.toFixed(2)} per ${unit}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Wishlist Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-gilroy font-semibold text-[#404A3D]">
              Wishlist
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00312D] rounded-full"
              aria-label="Close wishlist"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                <p className="mt-2 text-gray-500">
                  Start adding products to your wishlist to save them for later.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 inline-flex items-center px-4 py-2 bg-[#00312D] text-[#EAFDE7] font-gilroy font-semibold rounded-lg hover:bg-[#002A26] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00312D] focus:ring-offset-2"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image || '/branding/Images/products/placeholder.png'}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-gilroy font-medium text-[#404A3D] truncate">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 font-gilroy">
                        {formatPrice(item.price, item.priceUnit)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => moveToCart(item)}
                        className="px-3 py-1 bg-[#00312D] text-[#EAFDE7] text-sm font-gilroy font-medium rounded hover:bg-[#002A26] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00312D] focus:ring-offset-1"
                        aria-label={`Add ${item.name} to cart`}
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="px-3 py-1 text-red-600 text-sm font-gilroy font-medium hover:bg-red-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistItems.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-gilroy">
                  {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}
                </span>
                <button
                  onClick={() => {
                    wishlistItems.forEach(item => moveToCart(item));
                  }}
                  className="px-6 py-3 bg-[#00312D] text-[#EAFDE7] font-gilroy font-semibold rounded-lg hover:bg-[#002A26] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00312D] focus:ring-offset-2"
                >
                  Add All to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Hook to manage wishlist
export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('heritage-farms-wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  const addToWishlist = (item: WishlistItem) => {
    // Validate and sanitize item before adding
    if (!item.id || !item.name || !item.image || !item.sku) {
      console.error('Invalid wishlist item:', item);
      return;
    }

    // Sanitize item data
    const sanitizedItem: WishlistItem = {
      ...item,
      name: item.name.trim().replace(/[<>]/g, '').substring(0, 200),
      image: item.image || '/branding/Images/products/placeholder.png',
      sku: item.sku.trim().substring(0, 50)
    };

    setWishlistItems(prev => {
      const exists = prev.find(wishlistItem => wishlistItem.id === sanitizedItem.id);
      if (!exists) {
        const newWishlist = [...prev, sanitizedItem];
        localStorage.setItem('heritage-farms-wishlist', JSON.stringify(newWishlist));
        return newWishlist;
      }
      return prev;
    });
  };

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(prev => {
      const newWishlist = prev.filter(item => item.id !== itemId);
      localStorage.setItem('heritage-farms-wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  const isInWishlist = (itemId: string) => {
    return wishlistItems.some(item => item.id === itemId);
  };

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };
};
