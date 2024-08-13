import React, { createContext, useState, useEffect, useContext } from 'react';
import Client from '../shopifyConfig';
import Cart from '../components/Cart';
import Alert from '../components/Alert'; // Import the Alert component

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [alert, setAlert] = useState(null); // State for managing alert messages

  useEffect(() => {
    const initializeCart = async () => {
      const savedCartId = localStorage.getItem('shopify_cart_id');
      if (savedCartId) {
        try {
          const fetchedCart = await Client.checkout.fetch(savedCartId);
          setCart(fetchedCart);
        } catch (error) {
          setAlert({ message: 'Error fetching cart. Creating a new one.', type: 'error' });
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
      setAlert({ message: 'Error adding item to cart.', type: 'error' });
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
      setAlert({ message: 'Error updating item quantity.', type: 'error' });
    }
  };

  const removeItem = async (lineItemId) => {
    if (!cart) return;
    try {
      const updatedCart = await Client.checkout.removeLineItems(cart.id, [lineItemId]);
      setCart(updatedCart);
      localStorage.setItem('shopify_cart_id', updatedCart.id);
    } catch (error) {
      setAlert({ message: 'Error removing item from cart.', type: 'error' });
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
      setAlert({ message: 'Error creating checkout.', type: 'error' });
    }
  };

  const addLineItemsToCheckout = async (checkoutId, lineItems) => {
    try {
      const updatedCheckout = await Client.checkout.addLineItems(checkoutId, lineItems);
      return updatedCheckout;
    } catch (error) {
      setAlert({ message: 'Error adding items to checkout.', type: 'error' });
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
      setAlert({ message: 'Error proceeding to checkout.', type: 'error' });
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
      {alert && <Alert message={alert.message} type={alert.type} />} {/* Display alert */}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
