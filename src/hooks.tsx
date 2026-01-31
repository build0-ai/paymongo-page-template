// Custom hooks for storefront functionality

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  type Product,
  type CartItem,
  fetchStorefrontData,
  postCheckout,
  calculateCartTotal,
  calculateCartItemCount,
  updateQuantityInRecord,
  addProductToCart,
  resetQuantityForProduct,
  createCheckoutRequest,
} from "./helpers.tsx";
import { STOREFRONT_ID } from "./constants.tsx";

// Hook for managing cart state and operations
export const useCart = (onNavigateToCart?: () => void) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({});

  const updateQuantity = (itemId: string, change: number) => {
    setCartQuantities((prev) => updateQuantityInRecord(prev, itemId, change));
  };

  const addToCart = (product: Product) => {
    const quantity = cartQuantities[product.id] || 1;
    setCart((prevCart) => addProductToCart(prevCart, product, quantity));
    setCartQuantities((prev) => resetQuantityForProduct(prev, product.id));
    toast.success(`${product.name} added to cart`, {
      description: `Quantity: ${quantity}`,
      action: onNavigateToCart
        ? { label: "View Cart", onClick: onNavigateToCart }
        : undefined,
    });
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((item) => item.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    if (item) {
      toast.success(`${item.name} removed from cart`);
    }
  };

  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getCartTotal = () => calculateCartTotal(cart);
  const getCartItemCount = () => calculateCartItemCount(cart);

  return {
    cart,
    cartQuantities,
    updateQuantity,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getCartTotal,
    getCartItemCount,
  };
};

// Hook for fetching storefront data
export const useStorefront = () => {
  return useQuery({
    queryKey: ["storefront", STOREFRONT_ID],
    queryFn: () => fetchStorefrontData(STOREFRONT_ID),
  });
};

// Hook for checkout functionality
export const useCheckout = () => {
  return useMutation({
    mutationFn: (cart: CartItem[]) =>
      postCheckout(STOREFRONT_ID, createCheckoutRequest(cart)),
    onSuccess: (data) => {
      // Redirect to checkout URL
      globalThis.location.href = data.checkout_url;
    },
    onError: (error) => {
      console.error('Checkout failed:', error);
      alert(`Checkout failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });
};

// Hook for simple page navigation
export const usePageRouter = (initialPage: string = "menu") => {
  const [currentPage, setCurrentPage] = useState<string>(initialPage);

  const goToPage = (page: string) => setCurrentPage(page);
  const goToMenu = () => setCurrentPage("menu");
  const goToCart = () => setCurrentPage("cart");

  return {
    currentPage,
    goToPage,
    goToMenu,
    goToCart,
  };
};

// Hook for handling data loading states with UI components
export const useDataState = <T,>(
  data: T | undefined,
  isLoading: boolean,
  error: Error | null,
  loadingComponent: React.ReactNode,
  errorComponent: React.ReactNode
) => {
  const render = () => {
    if (isLoading) return loadingComponent;
    if (error) return errorComponent;
    return null; // Return null when data is ready, let parent handle rendering
  };

  return {
    render,
    data: data || null,
  };
};