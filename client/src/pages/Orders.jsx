import { useEffect, useState } from 'react';
import { getMyOrders } from '../services/orderService';
import { Container, ListGroup, Badge, Card } from 'react-bootstrap';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!orders.length) return <Container className="text-center py-5"><h3>No orders yet</h3></Container>;

  return (
    <Container className="py-4">
      <h2>My Orders</h2>
      {orders.map(order => (
        <Card key={order.order_id} className="mb-3 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <h6>Order #{order.order_id}</h6>
                <p className="mb-1">Date: {new Date(order.order_date).toLocaleDateString()}</p>
                <p className="mb-1">Total: ${order.total_amount}</p>
                <p className="mb-1">Status: <Badge bg="secondary">{order.order_status}</Badge></p>
              </div>
              <div>
                <Badge bg="info">{order.payment_status}</Badge>
              </div>
            </div>
            <ListGroup variant="flush" className="mt-2">
              {order.items && JSON.parse(order.items).map((item, idx) => (
                <ListGroup.Item key={idx} className="d-flex justify-content-between">
                  <span>{item.product_name}</span>
                  <span>{item.quantity} x ${item.price}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Orders;
