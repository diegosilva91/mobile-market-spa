import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import type { CartItem, CartItemInput } from '../../features/cart/types/cart.types';
import { Header } from './Header';
import './AppLayout.css';

const CART_ITEMS_STORAGE_KEY = 'cart:items:v1';
const CART_COUNT_STORAGE_KEY = 'cart:count:v1';

function getCartItemKey(productId: string, colorCode: number, storageCode: number) {
  return `${productId}:${colorCode}:${storageCode}`;
}

function formatCurrency(amount: number) {
  return `${amount.toFixed(2)} €`;
}

function getStoredCartItems() {
  if (typeof window === 'undefined') {
    return [] as CartItem[];
  }

  const rawItems = window.localStorage.getItem(CART_ITEMS_STORAGE_KEY);
  if (!rawItems) {
    return [] as CartItem[];
  }

  try {
    const parsedItems = JSON.parse(rawItems) as CartItem[];
    if (!Array.isArray(parsedItems)) {
      window.localStorage.removeItem(CART_ITEMS_STORAGE_KEY);
      return [] as CartItem[];
    }

    return parsedItems.filter((item) => {
      return (
        item &&
        typeof item.key === 'string' &&
        typeof item.productId === 'string' &&
        typeof item.brand === 'string' &&
        typeof item.model === 'string' &&
        typeof item.imageUrl === 'string' &&
        typeof item.priceLabel === 'string' &&
        Number.isFinite(item.unitPrice) &&
        Number.isFinite(item.colorCode) &&
        typeof item.colorName === 'string' &&
        Number.isFinite(item.storageCode) &&
        typeof item.storageName === 'string' &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
      );
    });
  } catch {
    window.localStorage.removeItem(CART_ITEMS_STORAGE_KEY);
    return [] as CartItem[];
  }
}

export type AppLayoutOutletContext = {
  addCartItem: (item: CartItemInput) => void;
  openCart: () => void;
};

export function AppLayout() {
  const [cartItems, setCartItems] = useState<CartItem[]>(getStoredCartItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    window.localStorage.setItem(CART_ITEMS_STORAGE_KEY, JSON.stringify(cartItems));
    window.localStorage.setItem(CART_COUNT_STORAGE_KEY, String(cartCount));
  }, [cartItems, cartCount]);

  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsCartOpen(false);
      }
    }

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isCartOpen]);

  function addCartItem(itemInput: CartItemInput) {
    const quantity = itemInput.quantity ?? 1;
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return;
    }

    const itemKey = getCartItemKey(itemInput.productId, itemInput.colorCode, itemInput.storageCode);

    setCartItems((previousItems) => {
      const existingItem = previousItems.find((item) => item.key === itemKey);
      if (!existingItem) {
        return [
          ...previousItems,
          {
            ...itemInput,
            key: itemKey,
            quantity,
          },
        ];
      }

      return previousItems.map((item) =>
        item.key === itemKey
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item,
      );
    });
  }

  function incrementItem(itemKey: string) {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.key === itemKey
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }

  function decrementItem(itemKey: string) {
    setCartItems((previousItems) =>
      previousItems.flatMap((item) => {
        if (item.key !== itemKey) {
          return item;
        }

        if (item.quantity <= 1) {
          return [];
        }

        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }),
    );
  }

  function removeItem(itemKey: string) {
    setCartItems((previousItems) => previousItems.filter((item) => item.key !== itemKey));
  }

  const cartStatus = cartCount === 0 ? 'Vacío' : 'Con productos';
  const cartTotal = cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

  return (
    <div className="app-layout">
      <Header cartCount={cartCount} isCartOpen={isCartOpen} onCartClick={() => setIsCartOpen(true)} />
      <main className="app-main">
        <Outlet context={{ addCartItem, openCart: () => setIsCartOpen(true) }} />
      </main>
      <div
        className={`cart-sidebar-backdrop${isCartOpen ? ' cart-sidebar-backdrop--visible' : ''}`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="cart-sidebar"
        className={`cart-sidebar${isCartOpen ? ' cart-sidebar--open' : ''}`}
        aria-labelledby="cart-sidebar-title"
        aria-hidden={!isCartOpen}
      >
        <div className="cart-sidebar__header">
          <h2 id="cart-sidebar-title">Carrito</h2>
          <button type="button" onClick={() => setIsCartOpen(false)} aria-label="Cerrar carrito">
            ✕
          </button>
        </div>
        <div className="cart-sidebar__content">
          <p>
            <strong>Estado:</strong> {cartStatus}
          </p>
          <p>
            <strong>Unidades:</strong> {cartCount}
          </p>
          {cartItems.length === 0 && <p className="cart-sidebar__empty">Tu carrito está vacío.</p>}
          {cartItems.length > 0 && (
            <>
              <ul className="cart-sidebar__items" aria-label="Productos del carrito">
                {cartItems.map((item) => (
                  <li key={item.key} className="cart-sidebar__item">
                    <img src={item.imageUrl} alt={`${item.brand} ${item.model}`} />
                    <div className="cart-sidebar__item-content">
                      <h3>
                        {item.brand} {item.model}
                      </h3>
                      <p>
                        {item.colorName} · {item.storageName}
                      </p>
                      <p>Precio unitario: {item.priceLabel}</p>
                      <p>Subtotal: {formatCurrency(item.unitPrice * item.quantity)}</p>
                      <div className="cart-sidebar__item-actions">
                        <button
                          type="button"
                          onClick={() => decrementItem(item.key)}
                          aria-label={`Quitar una unidad de ${item.brand} ${item.model}`}
                        >
                          −
                        </button>
                        <span aria-label={`Unidades de ${item.brand} ${item.model}`}>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => incrementItem(item.key)}
                          aria-label={`Añadir una unidad de ${item.brand} ${item.model}`}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="cart-sidebar__remove"
                          onClick={() => removeItem(item.key)}
                          aria-label={`Eliminar ${item.brand} ${item.model} del carrito`}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="cart-sidebar__total">
                <strong>Total:</strong> {formatCurrency(cartTotal)}
              </p>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
