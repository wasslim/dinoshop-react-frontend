// src/contexts/CartContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import Client from '../shopifyConfig';
import Cart from '../components/Cart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const initializeCart = async () => {
      const savedCartId = localStorage.getItem('shopify_cart_id');
      if (savedCartId) {
        try {
          const fetchedCart = await Client.checkout.fetch(savedCartId);
          setCart(fetchedCart);
        } catch (error) {
          console.error('Error fetching cart:', error);
          const newCart = await Client.checkout.create();
          localStorage.setItem('shopify_cart_id', newCart.id);
          setCart(newCart);
        }
      } else {
        const newCart = await Client.checkout.create();
        localStorage.setItem('shopify_cart_id', newCart.id);
        setCart(newCart);
      }
      setLoading(false);
    };

    initializeCart();
  }, []);

  const addToCart = async (variantId, quantity) => {
    if (!cart) return;
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    try {
      const updatedCart = await Client.checkout.addLineItems(cart.id, lineItemsToAdd);
      setCart(updatedCart);
      localStorage.setItem('shopify_cart_id', updatedCart.id);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (lineItemId, quantity) => {
    if (!cart) return;
    const lineItemsToUpdate = [
      {
        id: lineItemId,
        quantity: parseInt(quantity, 10),
      },
    ];
    try {
      const updatedCart = await Client.checkout.updateLineItems(cart.id, lineItemsToUpdate);
      setCart(updatedCart);
      localStorage.setItem('shopify_cart_id', updatedCart.id);
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const removeItem = async (lineItemId) => {
    if (!cart) return;
    try {
      const updatedCart = await Client.checkout.removeLineItems(cart.id, [lineItemId]);
      setCart(updatedCart);
      localStorage.setItem('shopify_cart_id', updatedCart.id);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartQuantity = cart?.lineItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  const createCheckout = async () => {
    try {
      const checkout = await Client.checkout.create();
      return checkout;
    } catch (error) {
      console.error('Error creating checkout:', error);
    }
  };

  const addLineItemsToCheckout = async (checkoutId, lineItems) => {
    try {
      const updatedCheckout = await Client.checkout.addLineItems(checkoutId, lineItems);
      return updatedCheckout;
    } catch (error) {
      console.error('Error adding line items to checkout:', error);
    }
  };

  const proceedToCheckout = async () => {
    try {
      const checkout = await createCheckout();
      const lineItems = cart.lineItems.map(item => ({
        variantId: item.variant.id,
        quantity: item.quantity
      }));
      const updatedCheckout = await addLineItemsToCheckout(checkout.id, lineItems);
      window.location.href = updatedCheckout.webUrl; // Redirect to Shopify checkout
    } catch (error) {
      console.error('Error proceeding to checkout:', error);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeItem,
      loading,
      isCartOpen,
      openCart,
      closeCart,
      cartQuantity,
      proceedToCheckout
    }}>
      {children}
      <Cart />
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
