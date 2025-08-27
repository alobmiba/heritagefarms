'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import ProductModal from '@/components/ProductModal';
import SearchAndFilter from '@/components/SearchAndFilter';
import { useCart } from '@/context/CartContext';
import { InventoryItem } from '@/types/commerce';
import StructuredData, { createProductSchema } from '@/components/StructuredData';

// Use InventoryItem as Product type
type Product = InventoryItem;

interface ProductGridProps {
  initialProducts: Product[];
}

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Search and filter functions
  const handleSearch = useCallback((query: string) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products]);

  const handleFilterChange = useCallback((filters: {
    category?: string;
    priceRange?: string;
    inStock?: boolean;
    sortBy?: string;
  }) => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => max ? product.price >= min && product.price <= max : product.price >= min);
    }
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }
    switch (filters.sortBy) {
      case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'price': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
    }
    setFilteredProducts(filtered);
  }, [products]);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeProductModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const formatPrice = (price: number, unit: string) => `$${price.toFixed(2)} per ${unit}`;

  const categories = [...new Set(products.map(product => product.category))];
  const priceRanges = [
    { id: '0-5', label: 'Under $5', min: 0, max: 5 },
    { id: '5-10', label: '$5 - $10', min: 5, max: 10 },
    { id: '10-15', label: '$10 - $15', min: 10, max: 15 },
    { id: '15+', label: '$15+', min: 15, max: null }
  ];

  return (
    <>
      {products.map(product => (
        <StructuredData key={product.sku} type="product" data={createProductSchema(product)} />
      ))}
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <SearchAndFilter onSearch={handleSearch} onFilterChange={handleFilterChange} categories={categories} priceRanges={priceRanges} />
        </div>
      </section>

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
                <div key={product.sku} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64">
                    <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover" />
                    {!product.inStock && <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm">Out of Stock</div>}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-gilroy font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-green-600 font-medium mb-2">{product.localName}</p>
                    <p className="text-2xl font-bold text-green-700 mb-4">{formatPrice(product.price, product.priceUnit)}</p>
                    <p className="text-base text-gray-600 line-clamp-3">{product.description}</p>
                    <div className="mt-6 space-y-3">
                      <button onClick={() => openProductModal(product)} className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">View Details</button>
                      <button onClick={() => addToCart({ id: product.sku, name: product.name, localName: product.localName, price: formatPrice(product.price, product.priceUnit), image: product.image })} disabled={!product.inStock} className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 disabled:bg-gray-400">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <ProductModal product={selectedProduct} isOpen={showModal} onClose={closeProductModal} onAddToCart={() => {
          addToCart({ id: selectedProduct.sku, name: selectedProduct.name, localName: selectedProduct.localName, price: formatPrice(selectedProduct.price, selectedProduct.priceUnit), image: selectedProduct.image });
          closeProductModal();
        }} />
      )}
    </>
  );
}
