import React from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Store,
  Undo2,
  Trash2,
  PhilippinePeso,
} from "lucide-react";
import { type Storefront, type Product, type CartItem } from "./helpers.tsx";
import {
  useCart,
  useStorefront,
  useCheckout,
  usePageRouter,
} from "./hooks.tsx";
import LoadingSpinner from "./LoadingSpinner.tsx";
import ErrorState from "./ErrorState.tsx";
import EmptyState from "./EmptyState.tsx";
import PageRouter from "./PageRouter.tsx";
import DataWrapper from "./DataWrapper.tsx";

// UI Components
const Header: React.FC<{
  storefront: Storefront | null;
  onCartClick?: () => void;
  onBackClick?: () => void;
  cartItemCount?: number;
  showBackButton?: boolean;
}> = ({
  storefront,
  onCartClick,
  onBackClick,
  cartItemCount = 0,
  showBackButton = false,
}) => (
  <nav className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            {storefront?.logo_url ? (
              <img
                src={storefront.logo_url}
                alt={storefront.title}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <Store className="h-6 w-6 text-white" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight leading-tight">
              {storefront?.title || "Your Store"}
            </h1>
          </div>
        </div>

        {showBackButton ? (
          <button
            onClick={onBackClick}
            type="button"
            className="relative flex items-center space-x-3 text-black px-4 py-3 rounded-full hover:bg-neutral-200 transition-all duration-200"
          >
            <Undo2 className="w-5 h-5" />
            <span className="font-medium hidden md:block">
              Back to Products
            </span>
          </button>
        ) : (
          <button
            onClick={onCartClick}
            type="button"
            className="relative flex items-center space-x-3 bg-black text-white px-4 py-3 rounded-full hover:bg-neutral-800 transition-all duration-200 shadow-sm"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="font-medium hidden md:block">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  </nav>
);

const HeroSection: React.FC<{ storefront: Storefront | null }> = ({
  storefront,
}) => (
  <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-black text-white py-24">
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center">
      <h2 className="text-5xl lg:text-6xl font-light mb-6 tracking-wide leading-tight">
        {storefront?.title ? (
          <>
            Welcome to{" "}
            <span className="font-semibold tracking-normal">
              {storefront.title}
            </span>
          </>
        ) : (
          <>
            Quality{" "}
            <span className="font-semibold tracking-normal">Products</span>
          </>
        )}
      </h2>
      <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed tracking-wide">
        {storefront?.description ||
          "Discover our carefully curated selection of premium products, chosen with attention to quality and craftsmanship."}
      </p>
    </div>
  </section>
);

const ProductCard: React.FC<{
  product: Product;
  quantity: number;
  onUpdateQuantity: (productId: string, change: number) => void;
  onAddToCart: (product: Product) => void;
}> = ({ product, quantity, onUpdateQuantity, onAddToCart }) => (
  <div className="group">
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="relative overflow-hidden">
        <img
          src={product.image_urls[0] || ""}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-3 space-x-3">
          <h4 className="text-xl font-medium text-neutral-900 tracking-tight leading-snug">
            {product.name}
          </h4>
          <span className="text-xl font-semibold text-neutral-900 tracking-tight flex items-center gap-1">
            <PhilippinePeso className="h-4 w-4" />
            {product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-neutral-600 mb-8 leading-relaxed font-normal">
          {product.description}
        </p>

        <div className="flex items-center justify-between space-x-3">
          <div className="flex items-center bg-neutral-100 rounded-full p-1">
            <button
              onClick={() => onUpdateQuantity(product.id, -1)}
              type="button"
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-neutral-200 transition-colors text-neutral-600"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-medium text-lg px-4 min-w-[3rem] text-center text-neutral-900">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(product.id, 1)}
              type="button"
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-neutral-200 transition-colors text-neutral-600"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            disabled={!quantity}
            type="button"
            className={`py-3 px-4 rounded-xl flex items-center space-x-2 font-medium transition-all duration-200 ${
              quantity
                ? "bg-black text-white hover:bg-neutral-800 shadow-sm transform hover:scale-105"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const CartItemCard: React.FC<{
  item: CartItem;
  isLast: boolean;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemove: (productId: string) => void;
}> = ({ item, isLast, onUpdateQuantity, onRemove }) => (
  <div
    className={`flex flex-col sm:flex-row items-start sm:items-center p-6 sm:p-8 gap-4 ${
      !isLast ? "border-b border-neutral-100" : ""
    }`}
  >
    <div className="relative">
      <img
        src={item.image_urls[0] || ""}
        alt={item.name}
        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl"
      />
    </div>
    <div className="flex-1 sm:ml-6 w-full">
      <h4 className="text-lg sm:text-xl font-medium text-neutral-900 mb-1">
        {item.name}
      </h4>
      <p className="text-neutral-600 text-sm sm:text-base mb-2">
        {item.description}
      </p>
      <p className="text-sm text-neutral-500 flex items-center gap-1">
        <PhilippinePeso className="h-3 w-3" />
        {item.price.toFixed(2)} each
      </p>
    </div>
    <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4 sm:gap-6 mt-1 sm:mt-0">
      <div className="flex items-center bg-neutral-100 rounded-full p-1">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          type="button"
          className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-neutral-200 transition-colors text-neutral-600"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="font-medium text-base px-3 min-w-[2.5rem] text-center text-neutral-900">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          type="button"
          className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-neutral-200 transition-colors text-neutral-600"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="text-right">
        <p className="text-lg sm:text-xl font-semibold text-neutral-900 flex items-center gap-1">
          <PhilippinePeso className="h-4 w-4" />
          {(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        type="button"
        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
        aria-label="Remove item"
        title="Remove item"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  </div>
);

const MenuPage: React.FC<{
  storefront: Storefront | null;
  products: Product[];
  cart: ReturnType<typeof useCart>;
  router: ReturnType<typeof usePageRouter>;
}> = ({ storefront, products, cart, router }) => (
  <div className="min-h-screen bg-neutral-50">
    <Header
      storefront={storefront}
      onCartClick={router.goToCart}
      cartItemCount={cart.getCartItemCount()}
    />

    <HeroSection storefront={storefront} />

    <section id="products-section" className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-light text-neutral-900 mb-4 tracking-wide leading-snug">
            Our Products
          </h3>
          <div className="w-16 h-px bg-neutral-900 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart.cartQuantities[product.id] || 0}
              onUpdateQuantity={cart.updateQuantity}
              onAddToCart={cart.addToCart}
            />
          ))}
        </div>
      </div>
    </section>
  </div>
);

const CartPage: React.FC<{
  storefront: Storefront | null;
  cart: ReturnType<typeof useCart>;
  router: ReturnType<typeof usePageRouter>;
  checkout: ReturnType<typeof useCheckout>;
}> = ({ storefront, cart, router, checkout }) => (
  <div className="min-h-screen bg-neutral-50">
    <Header
      storefront={storefront}
      onBackClick={router.goToMenu}
      showBackButton
    />

    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-light text-neutral-900 mb-4">
          Your Order
        </h2>
        <div className="w-16 h-px bg-neutral-900 mx-auto"></div>
      </div>

      {cart.cart.length === 0 ? (
        <EmptyState
          icon={<ShoppingCart className="h-12 w-12 text-neutral-400" />}
          title="Your cart is empty"
          subtitle="Discover our carefully curated selection of quality products"
          actionText="Browse Products"
          onAction={router.goToMenu}
        />
      ) : (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            {cart.cart.map((item: CartItem, index: number) => (
              <CartItemCard
                key={item.id}
                item={item}
                isLast={index === cart.cart.length - 1}
                onUpdateQuantity={cart.updateCartItemQuantity}
                onRemove={cart.removeFromCart}
              />
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8">
            <div className="border-b border-neutral-100 pb-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg text-neutral-600">Subtotal</span>
                <span className="text-lg font-medium text-neutral-900 flex items-center gap-1">
                  <PhilippinePeso className="h-4 w-4" />
                  {cart.getCartTotal().toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-2xl font-semibold text-neutral-900 mb-8">
              <span>Total</span>
              <span className="flex items-center gap-1">
                <PhilippinePeso className="h-5 w-5" />
                {cart.getCartTotal().toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => checkout.mutate(cart.cart)}
              disabled={checkout.isPending || cart.cart.length === 0}
              type="button"
              className="w-full bg-black text-white py-4 rounded-full font-medium text-lg hover:bg-neutral-800 transition-all duration-200 shadow-sm transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {checkout.isPending ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);

const App: React.FC = () => {
  // Business logic hooks
  const cart = useCart();
  const router = usePageRouter();
  const checkout = useCheckout();
  const { data, isLoading, error } = useStorefront();

  // Extract data
  const storefront = data?.storefront || null;
  const products = data?.products || [];

  // Define pages
  const pages = {
    menu: (
      <MenuPage
        storefront={storefront}
        products={products}
        cart={cart}
        router={router}
      />
    ),
    cart: (
      <CartPage
        storefront={storefront}
        cart={cart}
        router={router}
        checkout={checkout}
      />
    ),
  };

  return (
    <div className="font-inter">
      <DataWrapper
        isLoading={isLoading}
        error={error}
        loadingComponent={
          <LoadingSpinner
            icon={<Store className="h-8 w-8 text-white animate-pulse" />}
            title="Loading Storefront..."
            subtitle="Please wait while we prepare your experience"
          />
        }
        errorComponent={
          <ErrorState
            error={error!}
            icon={<Store className="h-8 w-8 text-red-600" />}
            title="Unable to Load Storefront"
          />
        }
      >
        <PageRouter currentPage={router.currentPage} pages={pages} />
      </DataWrapper>
    </div>
  );
};

export default App;
