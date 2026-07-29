import { useEffect, useState } from 'react';
import { getAdminStats } from '../services/adminService';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    getAdminStats().then(setStats).catch(console.error);
  }, []);

  return (
    <Container className="py-4">
      <h2>Admin Dashboard</h2>
      <Row className="mt-4">
        <Col md={3}><Card className="p-3 text-center"><h5>Users</h5><h3>{stats.users}</h3></Card></Col>
        <Col md={3}><Card className="p-3 text-center"><h5>Products</h5><h3>{stats.products}</h3></Card></Col>
        <Col md={3}><Card className="p-3 text-center"><h5>Orders</h5><h3>{stats.orders}</h3></Card></Col>
        <Col md={3}><Card className="p-3 text-center"><h5>Revenue</h5><h3>${stats.revenue}</h3></Card></Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
