import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { InventoryItem } from '@/types/commerce';
import { fetchApi } from '@/lib/strapi-api';

// Function to fetch products from Strapi
async function getProducts() {
  try {
    const response = await fetchApi<{
      name: string;
      description: string;
      price: number;
      sku: string;
      image: { data: { attributes: { url: string } } } | null; // Strapi media object
      // Add other fields from your Strapi Product content type
    }>('/api/products', { populate: '*' });

    // Map Strapi data to our InventoryItem interface
    const products: InventoryItem[] = response.data.map(item => ({
      sku: item.attributes.sku,
      name: item.attributes.name,
      localName: '', // Add this field to your Strapi model if needed
      price: item.attributes.price,
      priceUnit: 'bunch', // Add this field to your Strapi model if needed
      image: item.attributes.image?.data?.attributes?.url 
        ? `${process.env.STRAPI_API_URL}${item.attributes.image.data.attributes.url}`
        : '/branding/Images/placeholders/placeholder.jpg',
      cultivar: '', // Add this field to your Strapi model if needed
      healthBenefits: '', // Add this field to your Strapi model if needed
      growingMethod: '', // Add this field to your Strapi model if needed
      maturityTime: '', // Add this field to your Strapi model if needed
      description: item.attributes.description,
      category: '', // Add this field to your Strapi model if needed
      active: true, // Add this field to your Strapi model if needed
      inStock: true, // Add this field to your Strapi model if needed
      stockQuantity: 100, // Add this field to your Strapi model if needed
      createdAt: Date.now(), // Add proper timestamp handling
      updatedAt: Date.now(), // Add proper timestamp handling
    }));

    return products;
  } catch (error) {
    console.error("Failed to fetch products from Strapi:", error);
    return []; // Return an empty array on error
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Our Fresh Produce</h1>
          <p className="text-lg">Grown with care, delivered with freshness.</p>
        </div>
      </section>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Could Not Load Products</h2>
          <p className="text-gray-500">There was an issue fetching products from our CMS. Please try again later.</p>
        </div>
      ) : (
        <ProductGrid initialProducts={products} />
      )}

      {/* The ShoppingCart component needs to be managed by its context, so we can leave it in a layout or wrapper */}
      {/* <ShoppingCart /> */}

      <Footer />
    </div>
  );
}

// Optional: Add revalidation to fetch new data from Strapi periodically
export const revalidate = 3600; // Revalidate every hour