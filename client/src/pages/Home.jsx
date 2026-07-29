import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const data = await getProducts(params);
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="py-4">
      <h1 className="mb-4">Welcome to Mini Shop</h1>
      <SearchBar onSearch={fetchProducts} />
      <CategoryFilter onFilter={fetchProducts} />
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <Row>
          {products.map((p) => (
            <Col key={p.product_id} sm={6} md={4} lg={3} className="mb-4">
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;
