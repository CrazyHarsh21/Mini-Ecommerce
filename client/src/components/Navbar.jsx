import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">MiniShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            {user && (
              <>
                <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                <Nav.Link as={Link} to="/cart" className="position-relative">
                  <FaShoppingCart size={20} />
                  {cart.items.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart.items.length}
                    </span>
                  )}
                </Nav.Link>
                {user.role === 'ADMIN' && (
                  <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                )}
                <Button variant="outline-light" size="sm" onClick={() => { logout(); navigate('/login'); }}>
                  Logout
                </Button>
              </>
            )}
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
