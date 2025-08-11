'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  sku: string;
  name: string;
  localName: string;
  price: number;
  priceUnit: string;
  image: string;
  cultivar: string;
  healthBenefits: string;
  growingMethod: string;
  maturityTime: string;
  description: string;
  category: string;
  active: boolean;
  inStock: boolean;
  stockQuantity: number;
}

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Section */}
          <div className="relative h-96 lg:h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none"
            />
            <div className="absolute top-4 left-4 bg-[#EDDD5E] text-[#404A3D] px-4 py-2 rounded-full text-sm font-gilroy font-semibold">
              ${product.price.toFixed(2)} per {product.priceUnit}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-12">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-3xl font-gilroy font-bold text-[#404A3D] mb-2">
                  {product.name}
                </h2>
                                 <p className="text-xl font-gilroy text-gray-600 mb-4">
                   {product.localName}
                 </p>
                                 <p className="text-gray-600 font-gilroy">
                   {product.description}
                 </p>
              </div>

              {/* Cultivar */}
              <div>
                <h3 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">
                  Cultivar
                </h3>
                                 <p className="text-gray-600 font-gilroy italic">
                   {product.cultivar}
                 </p>
              </div>

              {/* Health Benefits */}
              <div>
                <h3 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">
                  Health Benefits
                </h3>
                                 <p className="text-gray-600 font-gilroy">
                   {product.healthBenefits}
                 </p>
              </div>

              {/* Growing Method */}
              <div>
                <h3 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">
                  How It&apos;s Grown
                </h3>
                                 <p className="text-gray-600 font-gilroy">
                   {product.growingMethod}
                 </p>
              </div>

              {/* Maturity Time */}
              <div>
                <h3 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">
                  Maturity Time
                </h3>
                                 <p className="text-gray-600 font-gilroy">
                   {product.maturityTime}
                 </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button 
                  onClick={onAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-[#EDDD5E] text-[#404A3D] font-gilroy font-semibold py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 