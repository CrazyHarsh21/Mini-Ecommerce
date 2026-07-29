import { useCart } from '../context/CartContext';
import { Container, Row, Col, ListGroup, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, updateItem, removeItem } = useCart();

  const handleQuantityChange = (item, newQty) => {
    if (newQty <= 0) {
      removeItem(item.cart_item_id);
    } else {
      updateItem(item.cart_item_id, newQty);
    }
  };

  if (cart.items.length === 0) {
    return (
      <Container className="text-center py-5">
        <h3>Your cart is empty</h3>
        <Link to="/products">Continue Shopping</Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2>Shopping Cart</h2>
      <Row>
        <Col md={8}>
          <ListGroup>
            {cart.items.map(item => (
              <ListGroup.Item key={item.cart_item_id} className="d-flex align-items-center gap-3">
                <Image src={item.image_url || 'https://via.placeholder.com/60'} width={60} height={60} rounded />
                <div className="flex-grow-1">
                  <h5>{item.product_name}</h5>
                  <p className="mb-0">${item.price}</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item, item.quantity - 1)}>-</Button>
                  <span className="fw-bold">{item.quantity}</span>
                  <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item, item.quantity + 1)}>+</Button>
                </div>
                <Button variant="danger" size="sm" onClick={() => removeItem(item.cart_item_id)}>Remove</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <div className="p-3 border rounded">
            <h4>Order Summary</h4>
            <p>Total: <strong>${cart.total.toFixed(2)}</strong></p>
            <Link to="/checkout">
              <Button variant="success" className="w-100">Proceed to Checkout</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
