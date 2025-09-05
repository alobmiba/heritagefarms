// Service Worker Registration Utility for Heritage Farms

export interface ServiceWorkerConfig {
  onUpdate?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

class ServiceWorkerManager {
  private config: ServiceWorkerConfig;
  private isRegistered = false;

  constructor(config: ServiceWorkerConfig = {}) {
    this.config = config;
  }

  // Register service worker
  async register(): Promise<ServiceWorkerRegistration | null> {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return null;
    }

    if (this.isRegistered) {
      console.log('Service Worker already registered');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      this.isRegistered = true;
      console.log('Service Worker registered successfully:', registration);

      // Handle service worker updates
      this.handleUpdates(registration);

      this.config.onSuccess?.();
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      this.config.onError?.(error as Error);
      return null;
    }
  }

  // Handle service worker updates
  private handleUpdates(registration: ServiceWorkerRegistration): void {
    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker available
            this.config.onUpdate?.();
          }
        });
      }
    });

    // Handle controller change
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Service Worker controller changed');
      window.location.reload();
    });
  }

  // Unregister service worker
  async unregister(): Promise<boolean> {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.unregister();
        this.isRegistered = false;
        console.log('Service Worker unregistered');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Service Worker unregistration failed:', error);
      return false;
    }
  }

  // Check if service worker is supported
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'serviceWorker' in navigator;
  }

  // Get service worker registration
  async getRegistration(): Promise<ServiceWorkerRegistration | null> {
    if (!this.isSupported()) {
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      return registration || null;
    } catch (error) {
      console.error('Failed to get Service Worker registration:', error);
      return null;
    }
  }

  // Send message to service worker
  async sendMessage(message: Record<string, unknown>): Promise<void> {
    if (!this.isSupported()) {
      return;
    }

    try {
      const registration = await this.getRegistration();
      if (registration?.active) {
        registration.active.postMessage(message);
      }
    } catch (error) {
      console.error('Failed to send message to Service Worker:', error);
    }
  }

  // Cache URLs
  async cacheUrls(urls: string[]): Promise<void> {
    await this.sendMessage({
      type: 'CACHE_URLS',
      urls,
    });
  }

  // Skip waiting (force update)
  async skipWaiting(): Promise<void> {
    await this.sendMessage({
      type: 'SKIP_WAITING',
    });
  }
}

// Create global instance
let swManager: ServiceWorkerManager | null = null;

// Initialize service worker
export const initServiceWorker = (config?: ServiceWorkerConfig): ServiceWorkerManager => {
  if (!swManager) {
    swManager = new ServiceWorkerManager(config);
  }
  return swManager;
};

// Get service worker manager instance
export const getServiceWorkerManager = (): ServiceWorkerManager | null => {
  return swManager;
};

// Auto-register service worker in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Register service worker with update notification
  const manager = initServiceWorker({
    onUpdate: () => {
      console.log('New Service Worker available. Reload to update.');
      // You can show a notification to the user here
    },
    onSuccess: () => {
      console.log('Service Worker registered successfully');
    },
    onError: (error) => {
      console.error('Service Worker registration failed:', error);
    },
  });

  manager.register();
}

// Export the class for manual usage
export { ServiceWorkerManager };
export default ServiceWorkerManager;
