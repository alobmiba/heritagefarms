import {
  StrapiProduct,
  StrapiBlogPost,
  StrapiPage,
  StrapiCategory,
  StrapiResponse,
  StrapiCollectionResponse,
  StrapiQueryParams,
  EnrichedProduct,
  ProductSearchFilters,
  ProductSortOptions
} from '@/types/strapi';
import { InventoryItem } from '@/types/commerce';

class StrapiService {
  private baseURL: string;
  private apiToken?: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    this.apiToken = process.env.STRAPI_API_TOKEN;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.apiToken) {
      headers.Authorization = `Bearer ${this.apiToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private buildQueryString(params: StrapiQueryParams): string {
    const searchParams = new URLSearchParams();

    if (params.populate) {
      const populate = Array.isArray(params.populate) 
        ? params.populate.join(',') 
        : params.populate;
      searchParams.append('populate', populate);
    }

    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (typeof value === 'object') {
          Object.entries(value).forEach(([operator, operatorValue]) => {
            searchParams.append(`filters[${key}][${operator}]`, String(operatorValue));
          });
        } else {
          searchParams.append(`filters[${key}]`, String(value));
        }
      });
    }

    if (params.sort) {
      const sort = Array.isArray(params.sort) ? params.sort.join(',') : params.sort;
      searchParams.append('sort', sort);
    }

    if (params.pagination) {
      Object.entries(params.pagination).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(`pagination[${key}]`, String(value));
        }
      });
    }

    if (params.publicationState) {
      searchParams.append('publicationState', params.publicationState);
    }

    if (params.locale) {
      searchParams.append('locale', params.locale);
    }

    return searchParams.toString();
  }

  // Product methods
  async getProduct(sku: string): Promise<StrapiProduct | null> {
    try {
      const queryString = this.buildQueryString({
        filters: { sku: { $eq: sku } },
        populate: ['images', 'category', 'tags', 'seo']
      });

      const response = await this.request<StrapiCollectionResponse<StrapiProduct>>(
        `/products?${queryString}`
      );

      return response.data[0] || null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  async getProducts(params: StrapiQueryParams = {}): Promise<StrapiProduct[]> {
    try {
      const defaultParams: StrapiQueryParams = {
        populate: ['images', 'category', 'tags'],
        sort: ['createdAt:desc'],
        ...params
      };

      const queryString = this.buildQueryString(defaultParams);
      
      const response = await this.request<StrapiCollectionResponse<StrapiProduct>>(
        `/products?${queryString}`
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getFeaturedProducts(limit: number = 6): Promise<StrapiProduct[]> {
    return this.getProducts({
      filters: { featured: { $eq: true } },
      pagination: { limit }
    });
  }

  async getProductsByCategory(categorySlug: string): Promise<StrapiProduct[]> {
    return this.getProducts({
      filters: { 
        category: { 
          slug: { $eq: categorySlug } 
        } 
      }
    });
  }

  // Category methods
  async getCategories(): Promise<StrapiCategory[]> {
    try {
      const response = await this.request<StrapiCollectionResponse<StrapiCategory>>(
        '/categories?populate=image'
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async getCategory(slug: string): Promise<StrapiCategory | null> {
    try {
      const queryString = this.buildQueryString({
        filters: { slug: { $eq: slug } },
        populate: ['image']
      });

      const response = await this.request<StrapiCollectionResponse<StrapiCategory>>(
        `/categories?${queryString}`
      );

      return response.data[0] || null;
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  }

  // Blog methods
  async getBlogPosts(params: StrapiQueryParams = {}): Promise<StrapiBlogPost[]> {
    try {
      const defaultParams: StrapiQueryParams = {
        populate: ['featuredImage', 'author', 'categories', 'tags', 'seo'],
        sort: ['publishedAt:desc'],
        ...params
      };

      const queryString = this.buildQueryString(defaultParams);
      
      const response = await this.request<StrapiCollectionResponse<StrapiBlogPost>>(
        `/blog-posts?${queryString}`
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  async getBlogPost(slug: string): Promise<StrapiBlogPost | null> {
    try {
      const queryString = this.buildQueryString({
        filters: { slug: { $eq: slug } },
        populate: ['featuredImage', 'author', 'categories', 'tags', 'seo']
      });

      const response = await this.request<StrapiCollectionResponse<StrapiBlogPost>>(
        `/blog-posts?${queryString}`
      );

      return response.data[0] || null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }

  // Page methods
  async getPage(slug: string): Promise<StrapiPage | null> {
    try {
      const queryString = this.buildQueryString({
        filters: { slug: { $eq: slug } },
        populate: ['sections', 'seo']
      });

      const response = await this.request<StrapiCollectionResponse<StrapiPage>>(
        `/pages?${queryString}`
      );

      return response.data[0] || null;
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  }

  // Search methods
  async searchProducts(query: string, filters: ProductSearchFilters = {}): Promise<StrapiProduct[]> {
    const strapiFilters: any = {};

    // Text search
    if (query) {
      strapiFilters.$or = [
        { name: { $containsi: query } },
        { localName: { $containsi: query } },
        { description: { $containsi: query } }
      ];
    }

    // Category filter
    if (filters.category) {
      strapiFilters.category = { slug: { $eq: filters.category } };
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      strapiFilters.tags = { slug: { $in: filters.tags } };
    }

    // Featured filter
    if (filters.featured !== undefined) {
      strapiFilters.featured = { $eq: filters.featured };
    }

    return this.getProducts({
      filters: strapiFilters,
      populate: ['images', 'category', 'tags']
    });
  }
}

// Product service that combines Strapi content with Firebase inventory data
export class ProductService {
  private static strapiService = new StrapiService();

  static async getEnrichedProduct(sku: string): Promise<EnrichedProduct | null> {
    try {
      const [strapiProduct, inventoryData] = await Promise.all([
        this.strapiService.getProduct(sku),
        this.getInventoryData(sku)
      ]);

      if (!strapiProduct || !inventoryData) {
        return null;
      }

      return this.mergeProductData(strapiProduct, inventoryData);
    } catch (error) {
      console.error('Error fetching enriched product:', error);
      return null;
    }
  }

  static async getEnrichedProducts(
    filters: ProductSearchFilters = {},
    sort: ProductSortOptions = { field: 'createdAt', order: 'desc' }
  ): Promise<EnrichedProduct[]> {
    try {
      const strapiProducts = await this.strapiService.getProducts({
        filters: this.buildStrapiFilters(filters),
        sort: [`${sort.field}:${sort.order}`]
      });

      // Get inventory data for all products
      const inventoryPromises = strapiProducts.map(product => 
        this.getInventoryData(product.sku)
      );
      
      const inventoryData = await Promise.all(inventoryPromises);

      // Merge data and filter out products without inventory
      const enrichedProducts = strapiProducts
        .map((strapiProduct, index) => {
          const inventory = inventoryData[index];
          return inventory ? this.mergeProductData(strapiProduct, inventory) : null;
        })
        .filter((product): product is EnrichedProduct => product !== null);

      // Apply inventory-based filters
      return this.applyInventoryFilters(enrichedProducts, filters);
    } catch (error) {
      console.error('Error fetching enriched products:', error);
      return [];
    }
  }

  private static async getInventoryData(sku: string): Promise<InventoryItem | null> {
    try {
      const response = await fetch(`/api/inventory/${sku}`);
      if (!response.ok) return null;
      return response.json();
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      return null;
    }
  }

  private static mergeProductData(
    strapiProduct: StrapiProduct, 
    inventory: InventoryItem
  ): EnrichedProduct {
    return {
      // Content from Strapi
      sku: strapiProduct.sku,
      name: strapiProduct.name,
      localName: strapiProduct.localName,
      description: strapiProduct.description,
      cultivar: strapiProduct.cultivar,
      healthBenefits: strapiProduct.healthBenefits,
      growingMethod: strapiProduct.growingMethod,
      maturityTime: strapiProduct.maturityTime,
      priceUnit: strapiProduct.priceUnit,
      category: strapiProduct.category,
      images: strapiProduct.images,
      featured: strapiProduct.featured,
      tags: strapiProduct.tags,
      seo: strapiProduct.seo,
      createdAt: strapiProduct.createdAt,
      updatedAt: strapiProduct.updatedAt,
      publishedAt: strapiProduct.publishedAt,
      
      // Commerce data from Firebase
      price: inventory.price,
      stockQuantity: inventory.stockQuantity,
      active: inventory.active,
      inStock: inventory.inStock,
      firebaseCreatedAt: inventory.createdAt,
      firebaseUpdatedAt: inventory.updatedAt,
    };
  }

  private static buildStrapiFilters(filters: ProductSearchFilters): any {
    const strapiFilters: any = {};

    if (filters.category) {
      strapiFilters.category = { slug: { $eq: filters.category } };
    }

    if (filters.tags && filters.tags.length > 0) {
      strapiFilters.tags = { slug: { $in: filters.tags } };
    }

    if (filters.featured !== undefined) {
      strapiFilters.featured = { $eq: filters.featured };
    }

    if (filters.search) {
      strapiFilters.$or = [
        { name: { $containsi: filters.search } },
        { localName: { $containsi: filters.search } },
        { description: { $containsi: filters.search } }
      ];
    }

    return strapiFilters;
  }

  private static applyInventoryFilters(
    products: EnrichedProduct[], 
    filters: ProductSearchFilters
  ): EnrichedProduct[] {
    let filtered = [...products];

    // Filter by availability
    if (filters.available !== undefined) {
      filtered = filtered.filter(product => 
        filters.available ? (product.active && product.inStock) : true
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      filtered = filtered.filter(product => 
        product.price >= min && product.price <= max
      );
    }

    return filtered;
  }
}

export default new StrapiService();

