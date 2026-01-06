// API Types and Functions for Storefront Application

// Helper function to build API URLs
export const getStorefrontUrl = (storefrontId: string) => `/api/storefront/${storefrontId}`;
export const getCheckoutUrl = (storefrontId: string) => `/api/storefront/${storefrontId}/checkout`;

// Type definitions
export interface Storefront {
  id: string;
  title: string;
  description: string;
  logo_url: string;
}

export interface Product {
  id: string;
  description: string;
  image_urls: string[];
  metadata: Record<string, unknown>;
  name: string;
  price: number;
  currency: string;
  created_at: number;
  updated_at: number;
}

export interface GetStorefrontResponse {
  storefront: Storefront;
  products: Product[];
}

export interface PostCheckoutRequest {
  product_items: {
    product_id: string;
    quantity: number;
  }[];
}

export interface PostCheckoutResponse {
  checkout_url: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// API Functions
export const fetchStorefrontData = async (storefrontId: string): Promise<GetStorefrontResponse> => {
  const response = await fetch(getStorefrontUrl(storefrontId));
  if (!response.ok) {
    throw new Error(`Failed to fetch storefront data: ${response.statusText}`);
  }
  return response.json();
};

export const postCheckout = async (storefrontId: string, request: PostCheckoutRequest): Promise<PostCheckoutResponse> => {
  const response = await fetch(getCheckoutUrl(storefrontId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    throw new Error(`Checkout failed: ${response.statusText}`);
  }
  
  return response.json();
};

// Business Logic Functions
export const calculateCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const calculateCartItemCount = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const updateQuantityInRecord = (
  quantities: Record<string, number>,
  itemId: string,
  change: number
): Record<string, number> => {
  return {
    ...quantities,
    [itemId]: Math.max(0, (quantities[itemId] || 0) + change),
  };
};

export const addProductToCart = (
  cart: CartItem[],
  product: Product,
  quantity: number
): CartItem[] => {
  const existingItem = cart.find((cartItem) => cartItem.id === product.id);

  if (existingItem) {
    return cart.map((cartItem) =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + quantity }
        : cartItem
    );
  } else {
    return [...cart, { ...product, quantity }];
  }
};

export const resetQuantityForProduct = (
  quantities: Record<string, number>,
  productId: string
): Record<string, number> => {
  return { ...quantities, [productId]: 0 };
};

export const createCheckoutRequest = (cart: CartItem[]): PostCheckoutRequest => {
  return {
    product_items: cart.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
    })),
  };
};