'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import ProductModal from '@/components/ProductModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import Wishlist from '@/components/Wishlist';
import SearchAndFilter from '@/components/SearchAndFilter';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/components/Wishlist';
import { CartItem } from '@/types/commerce';
import StructuredData, { createProductSchema } from '@/components/StructuredData';

// Product interface definition
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, isCartOpen, setIsCartOpen } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/inventory');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const productsData = data.items || [];
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search and filter functions
  const handleSearch = useCallback((query: string) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products]);

  const handleFilterChange = useCallback((filters: any) => {
    let filtered = [...products];

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        }
        return product.price >= min;
      });
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sort
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products]);

  const handleCheckout = async (items: CartItem[]) => {
    // This will be handled by the ShoppingCart component
    console.log('Checkout items:', items);
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeProductModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const formatPrice = (price: number, unit: string) => {
    return `$${price.toFixed(2)} per ${unit}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Prepare data for search and filter
  const categories = [...new Set(products.map(product => product.category))];
  const priceRanges = [
    { id: '0-5', label: 'Under $5', min: 0, max: 5 },
    { id: '5-10', label: '$5 - $10', min: 5, max: 10 },
    { id: '10-15', label: '$10 - $15', min: 10, max: 15 },
    { id: '15+', label: '$15+', min: 15, max: null }
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>Error loading products: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Structured Data for Products */}
      {products.map(product => (
        <StructuredData
          key={product.id}
          type="product"
          data={createProductSchema(product)}
        />
      ))}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <SearchAndFilter
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            categories={categories}
            priceRanges={priceRanges}
          />
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">No Products Found</h2>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div 
                  key={product.sku} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover"
                    />
                    {!product.inStock && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-gilroy font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-green-600 font-medium mb-2">
                      {product.localName}
                    </p>
                    <p className="text-2xl font-bold text-green-700 mb-4">
                      {formatPrice(product.price, product.priceUnit)}
                    </p>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {product.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {product.category}
                        </span>
                        {product.inStock && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            In Stock: {product.stockQuantity}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openProductModal(product)}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => addToCart({
                            id: product.id,
                            name: product.name,
                            localName: product.localName,
                            price: formatPrice(product.price, product.priceUnit),
                            image: product.image
                          })}
                          disabled={!product.inStock}
                          className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                          Add to Cart
                        </button>
                      </div>
                      
                      {/* Wishlist Button */}
                      <button
                        onClick={() => {
                          if (isInWishlist(product.id)) {
                            removeFromWishlist(product.id);
                          } else {
                            addToWishlist({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              priceUnit: product.priceUnit,
                              image: product.image,
                              sku: product.sku
                            });
                          }
                        }}
                        className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-[#EDDD5E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#EDDD5E] focus:ring-offset-2 rounded-lg py-2"
                        aria-label={isInWishlist(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                      >
                        <svg
                          className={`w-5 h-5 ${isInWishlist(product.id) ? 'text-[#EDDD5E] fill-current' : 'text-gray-400'}`}
                          fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span className="text-sm font-gilroy">
                          {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={showModal}
          onClose={closeProductModal}
                     onAddToCart={() => {
             addToCart({
               id: selectedProduct.sku,
               name: selectedProduct.name,
               localName: selectedProduct.localName,
               price: formatPrice(selectedProduct.price, selectedProduct.priceUnit),
               image: selectedProduct.image
             });
             closeProductModal();
           }}
        />
      )}

      {/* Shopping Cart */}
      <ShoppingCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <Footer />
    </div>
  );
} 