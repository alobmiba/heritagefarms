'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ProductModal from '@/components/ProductModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

// Product interface definition
interface Product {
  id: string;
  name: string;
  localName: string;
  price: string;
  image: string;
  cultivar: string;
  healthBenefits: string;
  growingMethod: string;
  maturityTime: string;
  description: string;
}

// Product data with detailed information
const products: Product[] = [
  {
    id: 'fluted-pumpkin-leaves',
    name: 'Fluted Pumpkin Leaves',
    localName: 'Ugwu',
    price: '$5 per bunch',
    image: '/branding/Images/products/fluted-pumpkin-leaves.png',
    cultivar: 'Telfairia occidentalis',
    healthBenefits: 'Rich in vitamins A, C, and E, iron, and calcium. Known for its blood-building properties and immune system support.',
    growingMethod: 'Hydroponically grown in controlled greenhouse environment with organic nutrients and natural pest management.',
    maturityTime: '6-8 weeks from seedling to harvest',
    description: 'Traditional West African leafy green with a mild, slightly nutty flavor. Perfect for soups, stews, and traditional dishes.'
  },
  {
    id: 'callaloo-amaranth',
    name: 'Callaloo - Amaranth',
    localName: 'Efo Tete',
    price: '$5 per bunch',
    image: '/branding/Images/products/callaloo-amaranth.png',
    cultivar: 'Amaranthus viridis',
    healthBenefits: 'Excellent source of protein, iron, and calcium. Contains antioxidants and anti-inflammatory properties.',
    growingMethod: 'Soil-based cultivation in greenhouse with organic compost and natural fertilizers.',
    maturityTime: '4-6 weeks from seed to harvest',
    description: 'Nutritious leafy green with a slightly bitter, earthy taste. Popular in Caribbean and West African cuisine.'
  },
  {
    id: 'yam',
    name: 'Yam',
    localName: 'Yam',
    price: 'Per lb',
    image: '/branding/Images/products/yams.webp',
    cultivar: 'Dioscorea rotundata',
    healthBenefits: 'High in complex carbohydrates, fiber, and potassium. Good source of vitamin C and B vitamins.',
    growingMethod: 'Container-grown in greenhouse with specialized soil mix and controlled temperature conditions.',
    maturityTime: '8-10 months from planting to harvest',
    description: 'Traditional root vegetable with starchy, slightly sweet flesh. Versatile ingredient for various dishes.'
  },
  {
    id: 'water-leaf',
    name: 'Water Leaf',
    localName: 'Gbure',
    price: '$5 per bunch',
    image: '/branding/Images/products/waterleaf-gbure.jpeg',
    cultivar: 'Talinum triangulare',
    healthBenefits: 'High water content, rich in vitamins A and C, and contains beneficial minerals for hydration.',
    growingMethod: 'Hydroponic system with high humidity control and frequent nutrient solution changes.',
    maturityTime: '3-4 weeks from seedling to harvest',
    description: 'Succulent leafy green with a mild, slightly sour taste. Excellent for soups and stews.'
  },
  {
    id: 'clove-basil',
    name: 'Clove Basil - Scent Leaf',
    localName: 'Efirin',
    price: 'Market price',
    image: '/branding/Images/products/scent-leaves.jpeg',
    cultivar: 'Ocimum gratissimum',
    healthBenefits: 'Contains essential oils with antimicrobial properties. Rich in antioxidants and known for digestive benefits.',
    growingMethod: 'Organic soil cultivation with natural pest control and regular pruning for optimal leaf production.',
    maturityTime: '5-6 weeks from seed to harvest',
    description: 'Aromatic herb with a strong, distinctive flavor. Essential ingredient in traditional Nigerian cuisine.'
  },
  {
    id: 'red-onions',
    name: 'Red Onions',
    localName: 'Red Onions',
    price: 'Market price',
    image: '/branding/Images/products/red-onions.jpg',
    cultivar: 'Allium cepa',
    healthBenefits: 'Rich in quercetin, a powerful antioxidant. Contains sulfur compounds that support heart health.',
    growingMethod: 'Container-grown in greenhouse with well-draining soil and controlled irrigation systems.',
    maturityTime: '3-4 months from bulb planting to harvest',
    description: 'Sweet and mild red onions with beautiful color and excellent flavor for cooking and raw consumption.'
  },
  {
    id: 'honey',
    name: 'Raw Honey',
    localName: 'Honey',
    price: '$10 for 250ml',
    image: '/branding/Images/products/raw-honey.jpg',
    cultivar: 'Natural',
    healthBenefits: 'Natural antibacterial and antifungal properties. Rich in antioxidants and enzymes. Soothes sore throats.',
    growingMethod: 'Produced by local bees from our greenhouse flowers and surrounding wildflowers.',
    maturityTime: 'Varies by season',
    description: 'Pure, unprocessed honey with natural sweetness and health benefits. Perfect for tea, cooking, and natural remedies.'
  }
];

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F0]">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#404A3D] to-[#2D3328]">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-gilroy-extrabold font-bold mb-6">
              Specialty Produce
            </h1>
            <p className="text-xl font-gilroy text-white/90 max-w-3xl mx-auto">
              Authentic West African and Caribbean crops, grown with care in our sustainable greenhouses.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-gilroy-extrabold font-bold text-[#404A3D] mb-6">
              Our Heritage Crops
            </h2>
            <p className="text-xl font-gilroy text-gray-600 max-w-3xl mx-auto">
              Traditional varieties cultivated with modern sustainable practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => openProductModal(product)}
              >
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#EDDD5E] text-[#404A3D] px-3 py-1 rounded-full text-sm font-gilroy-extrabold font-semibold">
                    {product.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-gilroy-extrabold font-bold text-[#404A3D] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-lg font-gilroy text-gray-600 mb-2">
                    {product.localName}
                  </p>
                  <p className="text-gray-600 font-gilroy mb-4">
                    {product.description}
                  </p>
                  <div className="space-y-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: product.id,
                          name: product.name,
                          localName: product.localName,
                          price: product.price,
                          image: product.image
                        });
                      }}
                      className="w-full bg-[#5B8C51] text-white font-gilroy-extrabold font-semibold py-2 rounded-full hover:bg-opacity-90 transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                    <button className="w-full bg-[#EDDD5E] text-[#404A3D] font-gilroy-extrabold font-semibold py-2 rounded-full hover:bg-opacity-90 transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeProductModal}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
} 