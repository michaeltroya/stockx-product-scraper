import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

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
    setCsvData(scraper(getObjString(products), type));
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <select onChange={handleTypeChange} value={type}>
            <option value="Shoes">Shoes</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Other">Other</option>
          </select>
          <textarea type="text" value={products} onChange={handleChange} rows="40" cols="100" />
        </label>
        <button type="submit"> Submit </button>
        <button type="reset" onClick={handleClear}>
          Clear
        </button>
      </form>
      <CSVLink data={csvData}>Download me</CSVLink>
    </div>
  );
}

export default App;
