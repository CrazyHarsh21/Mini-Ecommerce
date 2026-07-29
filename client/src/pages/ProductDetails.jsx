import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch(() => toast.error('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = async () => {
    try {
      await addItem(product.product_id, 1);
      toast.success('Added to cart');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!product) return <div className="text-center mt-5">Product not found</div>;

  return (
    <Container className="py-4">
      <Row>
        <Col md={6}>
          <Image src={product.image_url || 'https://via.placeholder.com/400'} fluid rounded />
        </Col>
        <Col md={6}>
          <h2>{product.product_name}</h2>
          <p>{product.description}</p>
          <h4 className="text-success">${product.price}</h4>
          <p><strong>Stock:</strong> {product.stock}</p>
          <Button variant="primary" onClick={handleAdd} disabled={product.stock <= 0}>
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
