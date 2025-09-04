'use client';

import React from 'react';
import Wishlist from '@/components/Wishlist';
import { useWishlistModal } from '@/context/WishlistContext';

export default function WishlistWrapper() {
  const { isWishlistOpen, closeWishlist } = useWishlistModal();

  return (
    <Wishlist
      isOpen={isWishlistOpen}
      onClose={closeWishlist}
    />
  );
}
