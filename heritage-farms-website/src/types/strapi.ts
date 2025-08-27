// Strapi Content Types for Heritage Farms

export interface StrapiImage {
  id: number;
  name: string;
  url: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface StrapiSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  metaImage?: StrapiImage;
}

export interface StrapiCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: StrapiImage;
  parentCategory?: StrapiCategory;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiTag {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiProduct {
  id: number;
  sku: string;
  name: string;
  localName: string;
  description?: string;
  cultivar?: string;
  healthBenefits?: string;
  growingMethod?: string;
  maturityTime?: string;
  priceUnit: 'bunch' | 'lb' | 'kg' | 'piece';
  category?: StrapiCategory;
  images?: StrapiImage[];
  featured: boolean;
  tags?: StrapiTag[];
  seo?: StrapiSEO;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface StrapiBlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: StrapiImage;
  author?: StrapiUser;
  categories?: StrapiBlogCategory[];
  tags?: StrapiTag[];
  publishedAt?: string;
  seo?: StrapiSEO;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiBlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiUser {
  id: number;
  username: string;
  email: string;
  firstname?: string;
  lastname?: string;
  avatar?: StrapiImage;
}

export interface StrapiPage {
  id: number;
  title: string;
  slug: string;
  content?: string;
  sections?: any[]; // Dynamic zone components
  seo?: StrapiSEO;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// API Response types
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Hybrid types combining Strapi content with Firebase commerce data
export interface EnrichedProduct extends Omit<StrapiProduct, 'id'> {
  // Content from Strapi (already included via extends)
  
  // Commerce data from Firebase
  price: number;           // cents
  stockQuantity: number;   // available inventory
  active: boolean;         // available for sale
  inStock: boolean;        // calculated field
  firebaseCreatedAt: number;
  firebaseUpdatedAt: number;
}

export interface ProductSearchFilters {
  category?: string;
  tags?: string[];
  featured?: boolean;
  available?: boolean;
  priceRange?: {
    min: number;
    max: number;
  };
  search?: string;
}

export interface ProductSortOptions {
  field: 'name' | 'price' | 'createdAt' | 'updatedAt';
  order: 'asc' | 'desc';
}

// API service types
export interface StrapiApiConfig {
  baseURL: string;
  apiToken?: string;
}

export interface StrapiQueryParams {
  populate?: string | string[];
  filters?: Record<string, any>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  publicationState?: 'live' | 'preview';
  locale?: string;
}

