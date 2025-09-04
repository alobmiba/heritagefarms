import { cert, getApps, initializeApp, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

// Check if required environment variables are present
const getRequiredEnvVars = () => ({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
});

// Validate environment variables
const validateEnvVars = () => {
  const requiredEnvVars = getRequiredEnvVars();
  const missingVars = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    console.warn(`Missing Firebase Admin environment variables: ${missingVars.join(', ')}`);
    return false;
  }
  return true;
};

// Lazy initialization of Firebase Admin
let adminApp: App | null = null;
let db: Firestore | null = null;

const initializeFirebaseAdmin = (): App | null => {
  if (adminApp) return adminApp;

  // Only initialize if we're in a runtime environment (not during build)
  if (typeof window !== 'undefined') {
    console.warn('Firebase Admin should not be initialized on the client side');
    return null;
  }

  // Check if all required environment variables are present
  if (!validateEnvVars()) {
    console.warn('Firebase Admin initialization skipped due to missing environment variables');
    return null;
  }

  try {
    const requiredEnvVars = getRequiredEnvVars();
    const apps = getApps();

    if (apps.length === 0) {
      adminApp = initializeApp({
        credential: cert({
          projectId: requiredEnvVars.projectId!,
          clientEmail: requiredEnvVars.clientEmail!,
          privateKey: requiredEnvVars.privateKey!.replace(/\\n/g, "\n"),
        }),
      });
      db = getFirestore(adminApp);
    } else {
      adminApp = apps[0];
      db = getFirestore(adminApp);
    }

    return adminApp;
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    return null;
  }
};

// Helper function to check if Firebase Admin is available
export const isFirebaseAdminAvailable = (): boolean => {
  if (!adminApp) {
    initializeFirebaseAdmin();
  }
  return adminApp !== null && db !== null;
};

// Helper function to get db with error handling
export const getDb = (): Firestore => {
  if (!isFirebaseAdminAvailable()) {
    throw new Error('Firebase Admin is not available. Check environment variables.');
  }
  return db!;
};

// Export for backward compatibility
export { adminApp, db };
