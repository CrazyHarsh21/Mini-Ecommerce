import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { updateProductAdmin } from '../services/adminService';
import { getCategories } from '../services/categoryService';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditProduct = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ product_name: '', description: '', price: '', stock: '', category_id: '', image_url: '', status: 'active' });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getCategories(), getProductById(id)])
      .then(([catData, product]) => {
        setCategories(catData.categories);
        setForm(product);
      })
      .catch(console.error);
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProductAdmin(id, { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) });
      toast.success('Product updated');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  if (!form.product_name) return <div>Loading...</div>;

  return (
    <Container className="py-4" style={{ maxWidth: '600px' }}>
      <Card className="p-4 shadow">
        <h3>Edit Product</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control name="product_name" value={form.product_name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" step="0.01" name="price" value={form.price} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" name="stock" value={form.stock} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select name="category_id" value={form.category_id} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map(c => <option key={c.category_id} value={c.category_id}>{c.category_name}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control name="image_url" value={form.image_url} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={form.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">Update Product</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default EditProduct;
