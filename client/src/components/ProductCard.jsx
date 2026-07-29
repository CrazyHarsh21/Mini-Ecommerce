import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card className="h-100 shadow-sm hover-shadow">
      <Card.Img variant="top" src={product.image_url || 'https://via.placeholder.com/150'} style={{ height: '150px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title className="text-truncate">{product.product_name}</Card.Title>
        <Card.Text className="fw-bold">${product.price}</Card.Text>
        <Link to={`/products/${product.product_id}`}>
          <Button variant="primary" size="sm">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
