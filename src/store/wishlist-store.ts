'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WishlistState = {
  productIds: string[];

  // Actions
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  clearWishlist: () => void;

  // Getters
  hasItem: (productId: string) => boolean;
  getItemCount: () => number;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],

      addItem: (productId) => {
        set((state) => {
          if (state.productIds.includes(productId)) return state;
          return { productIds: [...state.productIds, productId] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          productIds: state.productIds.filter((id) => id !== productId),
        }));
      },

      toggleItem: (productId) => {
        const has = get().hasItem(productId);
        if (has) {
          get().removeItem(productId);
        } else {
          get().addItem(productId);
        }
      },

      clearWishlist: () => {
        set({ productIds: [] });
      },

      hasItem: (productId) => {
        return get().productIds.includes(productId);
      },

      getItemCount: () => {
        return get().productIds.length;
      },
    }),
    {
      name: 'driftwear_wishlist',
      partialize: (state) => ({
        productIds: state.productIds,
      }),
    }
  )
);