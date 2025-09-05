'use client';

import { useEffect } from 'react';

interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    "@type": "PostalAddress";
    addressCountry: string;
    addressRegion: string;
    addressLocality: string;
  };
  contactPoint: {
    "@type": "ContactPoint";
    telephone: string;
    contactType: string;
  };
  sameAs: string[];
}

interface LocalBusinessSchema {
  "@context": "https://schema.org";
  "@type": "LocalBusiness";
  name: string;
  description: string;
  url: string;
  logo: string;
  image: string[];
  address: {
    "@type": "PostalAddress";
    addressCountry: string;
    addressRegion: string;
    addressLocality: string;
  };
  geo: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  openingHours: string;
  telephone: string;
  priceRange: string;
  servesCuisine: string[];
  areaServed: string[];
}

interface ProductSchema {
  "@context": "https://schema.org";
  "@type": "Product";
  name: string;
  description: string;
  image: string;
  sku: string;
  brand: {
    "@type": "Brand";
    name: string;
  };
  offers: {
    "@type": "Offer";
    price: number;
    priceCurrency: string;
    availability: string;
    seller: {
      "@type": "Organization";
      name: string;
    };
  };
  category: string;
}

interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

interface StructuredDataProps {
  type: 'organization' | 'localBusiness' | 'product' | 'breadcrumb';
  data: OrganizationSchema | LocalBusinessSchema | ProductSchema | BreadcrumbSchema;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    // Remove existing structured data
    const existingScript = document.querySelector('script[data-structured-data]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-structured-data', type);
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [type, data]);

  return null;
}

// Predefined schemas for common use cases
export const organizationSchema: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Heritage Farms",
  url: "https://heritagefarms.ca",
  logo: "https://heritagefarms.ca/branding/Logo/PNG/HF%20full%20colour.png",
  description: "Ontario's first Black-led farm specializing in year-round West African and Caribbean greens using sustainable greenhouse technology.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CA",
    addressRegion: "ON",
    addressLocality: "Ontario"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-XXX-XXX-XXXX",
    contactType: "customer service"
  },
  sameAs: [
    "https://www.instagram.com/heritagefarms.ca",
    "https://www.youtube.com/@HeritageFields"
  ]
};

export const localBusinessSchema: LocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Heritage Farms",
  description: "Ontario's first Black-led farm specializing in year-round West African and Caribbean greens using sustainable greenhouse technology.",
  url: "https://heritagefarms.ca",
  logo: "https://heritagefarms.ca/branding/Logo/PNG/HF%20full%20colour.png",
  image: [
    "https://heritagefarms.ca/branding/Images/banner/optimized/homebanner.webp",
    "https://heritagefarms.ca/branding/Images/banner/optimized/homebanner2.webp"
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "CA",
    addressRegion: "ON",
    addressLocality: "Ontario"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.6532,
    longitude: -79.3832
  },
  openingHours: "Mo-Su 09:00-18:00",
  telephone: "+1-XXX-XXX-XXXX",
  priceRange: "$$",
  servesCuisine: ["West African", "Caribbean"],
  areaServed: ["Ontario", "Greater Toronto Area"]
};

export const createProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  sku: string;
  price: number;
  inStock: boolean;
  category: string;
}): ProductSchema => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: product.image,
  sku: product.sku,
  brand: {
    "@type": "Brand",
    name: "Heritage Farms"
  },
  offers: {
    "@type": "Offer",
    price: product.price,
    priceCurrency: "CAD",
    availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    seller: {
      "@type": "Organization",
      name: "Heritage Farms"
    }
  },
  category: product.category
});

export const createBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>): BreadcrumbSchema => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((breadcrumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: breadcrumb.name,
    item: breadcrumb.url
  }))
});
