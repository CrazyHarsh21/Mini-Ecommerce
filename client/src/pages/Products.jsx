import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { Container, Row, Col } from 'react-bootstrap';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

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
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    fetchProducts({ category, search });
  }, [searchParams]);

  return (
    <Container className="py-4">
      <h2 className="mb-4">All Products</h2>
      <SearchBar onSearch={(params) => fetchProducts(params)} />
      <CategoryFilter onFilter={(params) => fetchProducts(params)} />
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

export default Products;
