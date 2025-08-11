const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config({ path: '.env.local' });

// Initialize Firebase Admin
const adminApp = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore(adminApp);

// Inventory data from the products page
const inventoryData = [
  {
    sku: 'FPUMPKIN-001',
    name: 'Fluted Pumpkin Leaves',
    localName: 'Ugwu',
    price: 5.00,
    priceUnit: 'bunch',
    image: '/branding/Images/products/fluted-pumpkin-leaves.png',
    cultivar: 'Telfairia occidentalis',
    healthBenefits: 'Rich in vitamins A, C, and E, iron, and calcium. Known for its blood-building properties and immune system support.',
    growingMethod: 'Hydroponically grown in controlled greenhouse environment with organic nutrients and natural pest management.',
    maturityTime: '6-8 weeks from seedling to harvest',
    description: 'Traditional West African leafy green with a mild, slightly nutty flavor. Perfect for soups, stews, and traditional dishes.',
    category: 'leafy-greens',
    active: true,
    inStock: true,
    stockQuantity: 50,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    sku: 'CALLALOO-001',
    name: 'Callaloo - Amaranth',
    localName: 'Efo Tete',
    price: 5.00,
    priceUnit: 'bunch',
    image: '/branding/Images/products/callaloo-amaranth.png',
    cultivar: 'Amaranthus viridis',
    healthBenefits: 'Excellent source of protein, iron, and calcium. Contains antioxidants and anti-inflammatory properties.',
    growingMethod: 'Soil-based cultivation in greenhouse with organic compost and natural fertilizers.',
    maturityTime: '4-6 weeks from seed to harvest',
    description: 'Nutritious leafy green with a slightly bitter, earthy taste. Popular in Caribbean and West African cuisine.',
    category: 'leafy-greens',
    active: true,
    inStock: true,
    stockQuantity: 40,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    sku: 'YAM-001',
    name: 'Yam',
    localName: 'Yam',
    price: 3.50,
    priceUnit: 'lb',
    image: '/branding/Images/products/yams.webp',
    cultivar: 'Dioscorea rotundata',
    healthBenefits: 'High in complex carbohydrates, fiber, and potassium. Good source of vitamin C and B vitamins.',
    growingMethod: 'Container-grown in greenhouse with specialized soil mix and controlled temperature conditions.',
    maturityTime: '8-10 months from planting to harvest',
    description: 'Traditional root vegetable with starchy, slightly sweet flesh. Versatile ingredient for various dishes.',
    category: 'root-vegetables',
    active: true,
    inStock: true,
    stockQuantity: 100,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    sku: 'WATERLEAF-001',
    name: 'Water Leaf',
    localName: 'Gbure',
    price: 5.00,
    priceUnit: 'bunch',
    image: '/branding/Images/products/waterleaf-gbure.jpeg',
    cultivar: 'Talinum triangulare',
    healthBenefits: 'High water content, rich in vitamins A and C, and contains beneficial minerals for hydration.',
    growingMethod: 'Hydroponic system with high humidity control and frequent nutrient solution changes.',
    maturityTime: '3-4 weeks from seedling to harvest',
    description: 'Succulent leafy green with a mild, slightly sour taste. Excellent for soups and stews.',
    category: 'leafy-greens',
    active: true,
    inStock: true,
    stockQuantity: 30,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    sku: 'CLOVEBASIL-001',
    name: 'Clove Basil - Scent Leaf',
    localName: 'Efirin',
    price: 4.00,
    priceUnit: 'bunch',
    image: '/branding/Images/products/scent-leaves.jpeg',
    cultivar: 'Ocimum gratissimum',
    healthBenefits: 'Contains essential oils with antimicrobial properties. Rich in antioxidants and known for digestive benefits.',
    growingMethod: 'Organic soil cultivation with natural pest control and regular pruning for optimal leaf production.',
    maturityTime: '5-6 weeks from seed to harvest',
    description: 'Aromatic herb with a strong, distinctive flavor. Essential ingredient in traditional Nigerian cuisine.',
    category: 'herbs',
    active: true,
    inStock: true,
    stockQuantity: 25,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    sku: 'REDONIONS-001',
    name: 'Red Onions',
    localName: 'Red Onions',
    price: 2.50,
    priceUnit: 'lb',
    image: '/branding/Images/products/red-onions.jpg',
    cultivar: 'Allium cepa',
    healthBenefits: 'Rich in quercetin, a powerful antioxidant. Contains sulfur compounds that support heart health.',
    growingMethod: 'Container-grown in greenhouse with well-draining soil and controlled irrigation systems.',
    maturityTime: '3-4 months from bulb planting to harvest',
    description: 'Sweet and mild red onions with beautiful color and excellent flavor for cooking and raw consumption.',
    category: 'vegetables',
    active: true,
    inStock: true,
    stockQuantity: 80,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    sku: 'HONEY-001',
    name: 'Raw Honey',
    localName: 'Raw Honey',
    price: 12.00,
    priceUnit: 'jar',
    image: '/branding/Images/products/raw-honey.jpg',
    cultivar: 'Wildflower',
    healthBenefits: 'Natural antibacterial properties, rich in antioxidants, and contains trace minerals and enzymes.',
    growingMethod: 'Harvested from local beehives with sustainable beekeeping practices.',
    maturityTime: 'Varies by season',
    description: 'Pure, unprocessed honey with natural flavors and health benefits. Perfect for sweetening and medicinal use.',
    category: 'honey',
    active: true,
    inStock: true,
    stockQuantity: 20,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    sku: 'JUTELEAVES-001',
    name: 'Jute Leaves',
    localName: 'Ewedu',
    price: 5.00,
    priceUnit: 'bunch',
    image: '/branding/Images/products/jute_leaves.webp',
    cultivar: 'Corchorus olitorius',
    healthBenefits: 'High in fiber, vitamins A and C, and minerals. Known for its mucilaginous properties that aid digestion.',
    growingMethod: 'Hydroponic cultivation with high humidity and frequent harvesting for tender leaves.',
    maturityTime: '4-5 weeks from seed to harvest',
    description: 'Traditional leafy green with a unique slimy texture when cooked. Essential ingredient in Nigerian cuisine.',
    category: 'leafy-greens',
    active: true,
    inStock: true,
    stockQuantity: 35,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

async function populateInventory() {
  try {
    console.log('Starting inventory population...');
    
    const batch = db.batch();
    
    inventoryData.forEach((item) => {
      const docRef = db.collection('inventory').doc(item.sku);
      batch.set(docRef, item);
    });
    
    await batch.commit();
    console.log(`✅ Successfully populated ${inventoryData.length} inventory items`);
    
    // Verify the data was added
    const snapshot = await db.collection('inventory').get();
    console.log(`📊 Total inventory items in database: ${snapshot.size}`);
    
  } catch (error) {
    console.error('❌ Error populating inventory:', error);
  } finally {
    process.exit(0);
  }
}

populateInventory();
