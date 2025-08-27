# Strapi Content Types for Heritage Farms

## 1. Product Content Type
```json
{
  "kind": "collectionType",
  "collectionName": "products",
  "info": {
    "singularName": "product",
    "pluralName": "products",
    "displayName": "Product"
  },
  "attributes": {
    "sku": {
      "type": "uid",
      "required": true,
      "unique": true
    },
    "name": {
      "type": "string",
      "required": true
    },
    "localName": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "richtext"
    },
    "cultivar": {
      "type": "string"
    },
    "healthBenefits": {
      "type": "richtext"
    },
    "growingMethod": {
      "type": "string"
    },
    "maturityTime": {
      "type": "string"
    },
    "priceUnit": {
      "type": "enumeration",
      "enum": ["bunch", "lb", "kg", "piece"],
      "default": "bunch"
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category"
    },
    "images": {
      "type": "media",
      "multiple": true,
      "allowedTypes": ["images"]
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "tags": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::tag.tag"
    },
    "seo": {
      "type": "component",
      "component": "shared.seo",
      "required": false
    }
  }
}
```

## 2. Category Content Type
```json
{
  "kind": "collectionType",
  "collectionName": "categories",
  "info": {
    "singularName": "category",
    "pluralName": "categories",
    "displayName": "Category"
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true
    },
    "description": {
      "type": "richtext"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "products": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::product.product",
      "mappedBy": "category"
    },
    "parentCategory": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category"
    }
  }
}
```

## 3. Blog Post Content Type
```json
{
  "kind": "collectionType",
  "collectionName": "blog_posts",
  "info": {
    "singularName": "blog-post",
    "pluralName": "blog-posts",
    "displayName": "Blog Post"
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "excerpt": {
      "type": "text"
    },
    "content": {
      "type": "richtext"
    },
    "featuredImage": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "author": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "plugin::users-permissions.user"
    },
    "categories": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::blog-category.blog-category"
    },
    "tags": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::tag.tag"
    },
    "publishedAt": {
      "type": "datetime"
    },
    "seo": {
      "type": "component",
      "component": "shared.seo"
    }
  }
}
```

## 4. Page Content Type (For About, etc.)
```json
{
  "kind": "collectionType",
  "collectionName": "pages",
  "info": {
    "singularName": "page",
    "pluralName": "pages",
    "displayName": "Page"
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "content": {
      "type": "richtext"
    },
    "sections": {
      "type": "dynamiczone",
      "components": [
        "sections.hero",
        "sections.text-section",
        "sections.image-gallery",
        "sections.testimonials"
      ]
    },
    "seo": {
      "type": "component",
      "component": "shared.seo"
    }
  }
}
```

## 5. Shared Components

### SEO Component
```json
{
  "collectionName": "components_shared_seos",
  "info": {
    "displayName": "SEO",
    "description": "SEO meta information"
  },
  "attributes": {
    "metaTitle": {
      "type": "string"
    },
    "metaDescription": {
      "type": "text"
    },
    "keywords": {
      "type": "string"
    },
    "metaImage": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    }
  }
}
```

## Data Migration Strategy

### From Current System to Strapi:
1. **Products**: Keep commerce-specific fields (price, stockQuantity) in Firebase
2. **Content**: Move descriptive content to Strapi
3. **Sync**: Create API endpoints to sync data between systems

### Hybrid Data Structure:
- **Strapi**: Product catalog, descriptions, images, categories, blog
- **Firebase**: Inventory levels, pricing, orders, customers
- **Sync**: Product SKU as the common identifier

