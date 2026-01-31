# Template Source Architecture

This directory contains the React template source code that serves as the base for AI-generated storefronts.

## File Structure

- **App.tsx** - Main application component (AI-generated, replace this file)
- **helpers.tsx** - API functions, types, and business logic (DO NOT modify)
- **hooks.tsx** - Custom React hooks for business logic (DO NOT modify)
- **main.tsx** - Application entry point with QueryClient setup (DO NOT modify)
- **LoadingSpinner.tsx** - Generic loading component (DO NOT modify)
- **ErrorState.tsx** - Generic error component (DO NOT modify)
- **EmptyState.tsx** - Generic empty state component (DO NOT modify)
- **PageRouter.tsx** - Simple page navigation component (DO NOT modify)
- **DataWrapper.tsx** - Data loading/error state wrapper (DO NOT modify)

## AI Generation Guidelines

When generating new App.tsx files:

1. **Import Required Dependencies**:
   ```tsx
   import React from "react";
   import { ShoppingCart, Plus, Minus, Store, Undo2 } from "lucide-react";
   import { type Storefront, type Product, type CartItem } from "./helpers.tsx";
   import { useCart, useStorefront, useCheckout, usePageRouter } from "./hooks.tsx";
   import LoadingSpinner from "./LoadingSpinner.tsx";
   import ErrorState from "./ErrorState.tsx";
   import EmptyState from "./EmptyState.tsx";
   import PageRouter from "./PageRouter.tsx";
   import DataWrapper from "./DataWrapper.tsx";
   ```

2. **Set Storefront ID**:
   ```tsx
   const STOREFRONT_ID = "your-storefront-id-here";
   ```

3. **Use Custom Hooks for Business Logic**:
   - `usePageRouter()` - Page navigation state (call this first)
   - `useCart(router.goToCart)` - Cart state and operations (pass goToCart for "View Cart" button in toast)
   - `useStorefront()` - Data fetching with React Query
   - `useCheckout()` - Checkout mutation

4. **Use Generic Components**:
   - `DataWrapper` for loading/error state handling
   - `PageRouter` for page navigation
   - `LoadingSpinner`, `ErrorState`, `EmptyState` for specific states

5. **Constraints**:
   - Only import from 'react', 'lucide-react', and local files
   - Use Tailwind CSS v4 for styling
   - Export default App component
   - Focus purely on UI composition and styling

Note: Toast notifications are handled automatically by the hooks (addToCart, removeFromCart). No need to import or call `toast` in App.tsx.

## Example App.tsx Structure

```tsx
const STOREFRONT_ID = "demo-storefront-123";

const App: React.FC = () => {
  // Business logic hooks
  const router = usePageRouter();
  const cart = useCart(router.goToCart);
  const checkout = useCheckout();
  const { data, isLoading, error } = useStorefront();

  // Extract data
  const storefront = data?.storefront || null;
  const products = data?.products || [];

  // Define pages
  const pages = {
    menu: <MenuPage storefront={storefront} products={products} cart={cart} router={router} />,
    cart: <CartPage storefront={storefront} cart={cart} router={router} checkout={checkout} />,
  };

  return (
    <DataWrapper
      isLoading={isLoading}
      error={error}
      loadingComponent={<LoadingSpinner /* props */ />}
      errorComponent={<ErrorState error={error!} /* props */ />}
    >
      <PageRouter currentPage={router.currentPage} pages={pages} />
    </DataWrapper>
  );
};

export default App;
```

## Key Benefits

- **Pure UI Focus**: App.tsx contains only styling, UI composition, and rendering logic
- **Reusable Hooks**: All business logic is abstracted into reusable custom hooks
- **Generic Components**: Common patterns (loading, errors, empty states) are componentized
- **Flexible Navigation**: Simple page router supports different app structures
- **Type Safety**: Proper TypeScript types throughout the application
- **Maintainable**: Clear separation of concerns makes code easy to understand and modify