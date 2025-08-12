'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WishlistContextType {
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  openWishlist: () => void;
  closeWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlistModal = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlistModal must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);

  return (
    <WishlistContext.Provider value={{
      isWishlistOpen,
      setIsWishlistOpen,
      openWishlist,
      closeWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
