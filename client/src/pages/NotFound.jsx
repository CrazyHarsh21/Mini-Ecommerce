import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="text-center py-5">
      <h1>404</h1>
      <h4>Page Not Found</h4>
      <Link to="/">Go Home</Link>
    </Container>
  );
};

export default NotFound;
