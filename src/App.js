import React, { useState } from 'react';

import { CSVLink } from 'react-csv';
//Bootstrap imports
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import scraper from './util/scraper';

function App() {
  const [products, setProducts] = useState('');
  const [type, setType] = useState('Shoes');
  const [csvData, setCsvData] = useState([]);

  const handleChange = e => {
    setProducts(e.target.value);
  };

  const handleTypeChange = e => {
    setType(e.target.value);
  };

  const handleClear = () => {
    setProducts('');
    setType('Shoes');
  };

  const getObjString = input => {
    let string = `{
      "products":[${input}]
  }`;
    return string;
  };

  const handleSubmit = e => {
    if (products === '') {
      alert('Form can not be empty');
    } else {
      setCsvData(scraper(getObjString(products), type));
    }

    e.preventDefault();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <textarea type="text" value={products} onChange={handleChange} rows="30" cols="80" />
        <select onChange={handleTypeChange} value={type}>
          <option value="Shoes">Shoes</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
          <option value="Other">Other</option>
        </select>

        <ButtonToolbar>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="danger" onClick={handleClear}>
            Reset
          </Button>
          <Button variant="success">
            <CSVLink data={csvData}>Download CSV</CSVLink>
          </Button>
        </ButtonToolbar>
      </form>
    </Container>
  );
}

export default App;
