import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/orderService';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address) {
      toast.error('Shipping address required');
      return;
    }
    try {
      await placeOrder({ payment_method: paymentMethod, shipping_address: address });
      await clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed');
    }
  };

  if (cart.items.length === 0) {
    return <Container className="text-center py-5"><h3>Cart is empty</h3></Container>;
  }

  return (
    <Container className="py-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Checkout</h2>
      <Card className="p-4 shadow">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Shipping Address</Form.Label>
            <Form.Control as="textarea" rows={3} value={address} onChange={(e) => setAddress(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Payment Method</Form.Label>
            <Form.Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="COD">Cash on Delivery</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
            </Form.Select>
          </Form.Group>
          <div className="mb-3">
            <h5>Total: ${cart.total.toFixed(2)}</h5>
          </div>
          <Button type="submit" variant="success" className="w-100">Place Order</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Checkout;
