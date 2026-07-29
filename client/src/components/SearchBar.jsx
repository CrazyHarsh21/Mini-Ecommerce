import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ search: query });
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex gap-2 mb-3">
      <Form.Control
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit" variant="outline-primary">Search</Button>
    </Form>
  );
};

export default SearchBar;
