import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

import scraper from './util/scraper';

function App() {
  const [products, setProducts] = useState('');

  const handleChange = e => {
    setProducts(e.target.value);
  };

  const getObjString = input => {
    let string = `{
      "products":[${input}]
  }`;
    return string;
  };

  const handleSubmit = e => {
    scraper(getObjString(products));
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea type="text" value={products} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
