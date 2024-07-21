import React from 'react';
import { Offcanvas, Stack, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utilities/formatCurrency';

const CartItem = ({ item, updateQuantity, removeItem }) => (
  <div className="d-flex align-items-center">
    {item.variant.image && (
      <img src={item.variant.image.src} alt={item.title} className="w-25 rounded-lg" />
    )}
    <div className="ms-3 flex-grow-1">
      <h5 className="mb-1">{item.title}</h5>
      {item.variant.selectedOptions && item.variant.selectedOptions.length > 0 && (
        <p className="mb-1">
          {item.variant.selectedOptions.map(option => (
            <span key={option.name}>{option.name}: {option.value}</span>
          )).reduce((prev, curr) => [prev, ' ', curr])}
        </p>
      )}
      <div className="d-flex align-items-center">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          -
        </Button>
        <span className="mx-2">{item.quantity}</span>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          className="ms-3"
          onClick={() => removeItem(item.id)}
        >
          Verwijder
        </Button>
      </div>
    </div>
    {item.variant && (
      <div className="text-end ms-3">
        <span>{formatCurrency(item.variant.price.amount)}</span>
      </div>
    )}
  </div>
);

const Cart = () => {
  const { cart, isCartOpen, closeCart, updateQuantity, removeItem, proceedToCheckout } = useCart();

  if (!cart) {
    return <div>Loading cart...</div>;
  }

  return (
    <Offcanvas show={isCartOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Winkelwagen</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cart.lineItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total: {formatCurrency(cart.totalPrice.amount)}
          </div>
          <Button variant="primary" onClick={proceedToCheckout}>
            Ga naar checkout
          </Button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
