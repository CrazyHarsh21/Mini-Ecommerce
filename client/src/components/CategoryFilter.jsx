import { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { getCategories } from '../services/categoryService';

const CategoryFilter = ({ onFilter }) => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    getCategories().then(data => setCategories(data.categories));
  }, []);

  const handleSelect = (categoryId) => {
    setSelected(categoryId);
    onFilter({ category: categoryId });
  };

  return (
    <Dropdown className="mb-3">
      <Dropdown.Toggle variant="secondary" id="category-dropdown">
        {selected ? categories.find(c => c.category_id == selected)?.category_name : 'All Categories'}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleSelect('')}>All</Dropdown.Item>
        {categories.map(c => (
          <Dropdown.Item key={c.category_id} onClick={() => handleSelect(c.category_id)}>
            {c.category_name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategoryFilter;
