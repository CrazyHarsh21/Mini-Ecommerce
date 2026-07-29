import { useEffect, useState } from 'react';
import { getAdminProducts, deleteProductAdmin } from '../services/adminService';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getAdminProducts();
      setProducts(data.products || []);
    } catch (err) {
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProductAdmin(id);
        toast.success('Product deleted');
        fetchProducts();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Manage Products</h2>
        <Link to="/admin/products/add">
          <Button variant="primary">Add Product</Button>
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.product_id}>
              <td>{p.product_id}</td>
              <td>{p.product_name}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td><Badge bg={p.status === 'active' ? 'success' : 'secondary'}>{p.status}</Badge></td>
              <td>
                <Link to={`/admin/products/edit/${p.product_id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(p.product_id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageProducts;
