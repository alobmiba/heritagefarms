'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ProductModal from '@/components/ProductModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import { useCart } from '@/context/CartContext';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, cartItems, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useCart();
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
        setProducts(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCheckout = async (items: any[]) => {
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
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-gilroy font-bold mb-4">
            Our Fresh Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover our selection of fresh, locally grown West African vegetables and herbs, 
            cultivated with care in our sustainable greenhouse.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">No Products Available</h2>
              <p className="text-gray-500">Check back soon for our fresh products!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div 
                  key={product.sku} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
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
                    
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => openProductModal(product)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        View Details
                      </button>
                                             <button
                         onClick={() => addToCart({
                           id: product.sku,
                           name: product.name,
                           localName: product.localName,
                           price: formatPrice(product.price, product.priceUnit),
                           image: product.image
                         })}
                         disabled={!product.inStock}
                         className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                       >
                         Add to Cart
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