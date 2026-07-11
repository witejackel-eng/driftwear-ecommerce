const isBrowser = typeof window !== 'undefined';

const STORAGE_KEYS = {
  CART: 'driftwear_cart',
  WISHLIST: 'driftwear_wishlist',
  NEWSLETTER: 'driftwear_newsletter',
  ORDERS: 'driftwear_orders',
  RECENTLY_VIEWED: 'driftwear_recently_viewed',
  PROMO_CODE: 'driftwear_promo_code',
} as const;

function safeGetItem<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSetItem(key: string, value: unknown): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

function safeRemoveItem(key: string): void {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Fail silently
  }
}

// ─── Cart Storage ──────────────────────────────────────────────────────────
export const cartStorage = {
  get: () => safeGetItem<unknown[]>(STORAGE_KEYS.CART, []),
  set: (items: unknown[]) => safeSetItem(STORAGE_KEYS.CART, items),
  clear: () => safeRemoveItem(STORAGE_KEYS.CART),
};

// ─── Wishlist Storage ──────────────────────────────────────────────────────
export const wishlistStorage = {
  get: () => safeGetItem<string[]>(STORAGE_KEYS.WISHLIST, []),
  set: (items: string[]) => safeSetItem(STORAGE_KEYS.WISHLIST, items),
  clear: () => safeRemoveItem(STORAGE_KEYS.WISHLIST),
};

// ─── Newsletter Storage ────────────────────────────────────────────────────
export const newsletterStorage = {
  get: () => safeGetItem<{ email: string; subscribedAt: string } | null>(STORAGE_KEYS.NEWSLETTER, null),
  set: (data: { email: string; subscribedAt: string }) =>
    safeSetItem(STORAGE_KEYS.NEWSLETTER, data),
  clear: () => safeRemoveItem(STORAGE_KEYS.NEWSLETTER),
  isSubscribed: () => {
    const data = safeGetItem<{ email: string; subscribedAt: string } | null>(STORAGE_KEYS.NEWSLETTER, null);
    return data !== null;
  },
};

// ─── Orders Storage ────────────────────────────────────────────────────────
export type StoredOrder = {
  id: string;
  items: unknown[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
};

export const ordersStorage = {
  get: () => safeGetItem<StoredOrder[]>(STORAGE_KEYS.ORDERS, []),
  set: (orders: StoredOrder[]) => safeSetItem(STORAGE_KEYS.ORDERS, orders),
  add: (order: StoredOrder) => {
    const orders = safeGetItem<StoredOrder[]>(STORAGE_KEYS.ORDERS, []);
    orders.unshift(order);
    safeSetItem(STORAGE_KEYS.ORDERS, orders);
  },
  clear: () => safeRemoveItem(STORAGE_KEYS.ORDERS),
};

// ─── Recently Viewed Storage ───────────────────────────────────────────────
export const recentlyViewedStorage = {
  get: () => safeGetItem<string[]>(STORAGE_KEYS.RECENTLY_VIEWED, []),
  add: (slug: string) => {
    const items = safeGetItem<string[]>(STORAGE_KEYS.RECENTLY_VIEWED, []);
    const filtered = items.filter((s) => s !== slug);
    filtered.unshift(slug);
    safeSetItem(STORAGE_KEYS.RECENTLY_VIEWED, filtered.slice(0, 10));
  },
  clear: () => safeRemoveItem(STORAGE_KEYS.RECENTLY_VIEWED),
};

// ─── Promo Code Storage ────────────────────────────────────────────────────
export const promoStorage = {
  get: () => safeGetItem<{ code: string; discount: number } | null>(STORAGE_KEYS.PROMO_CODE, null),
  set: (data: { code: string; discount: number }) =>
    safeSetItem(STORAGE_KEYS.PROMO_CODE, data),
  clear: () => safeRemoveItem(STORAGE_KEYS.PROMO_CODE),
};

export { STORAGE_KEYS };