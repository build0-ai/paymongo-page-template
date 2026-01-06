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
   - `useCart()` - Cart state and operations
   - `useStorefront(STOREFRONT_ID)` - Data fetching with React Query
   - `useCheckout(STOREFRONT_ID)` - Checkout mutation
   - `usePageRouter()` - Page navigation state

4. **Use Generic Components**:
   - `DataWrapper` for loading/error state handling
   - `PageRouter` for page navigation
   - `LoadingSpinner`, `ErrorState`, `EmptyState` for specific states

5. **Constraints**:
   - Only import from 'react', 'lucide-react', and local files
   - Use Tailwind CSS for styling
   - Export default App component
   - Focus purely on UI composition and styling

## Example App.tsx Structure

```tsx
const STOREFRONT_ID = "demo-storefront-123";

const App: React.FC = () => {
  // Business logic hooks
  const cart = useCart();
  const router = usePageRouter();
  const checkout = useCheckout(STOREFRONT_ID);
  const { data, isLoading, error } = useStorefront(STOREFRONT_ID);

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