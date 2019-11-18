import React, { useState } from 'react';
import './style.css';
//JSON to CSV import
import { CSVLink } from 'react-csv';
//Bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import scraper from './util/scraper';

function App() {
  const [products, setProducts] = useState('');
  const [type, setType] = useState('Shoes');
  const [csvData, setCsvData] = useState([]);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setProducts(e.target.value);
  };

  const handleTypeChange = e => {
    setType(e.target.value);
  };

  const handleClear = () => {
    setProducts('');
    setType('Shoes');
    setCsvData([]);
    setErrors(false);
    setSuccess(false);
  };

  const getObjString = input => {
    let string = `{
      "products":[${input}]
  }`;
    return string;
  };

  const handleSubmit = e => {
    if (products === '') {
      setErrors(true);
      setSuccess(false);
    } else {
      setErrors(false);
      setSuccess(true);
      setCsvData(scraper(getObjString(products), type));
      console.log(csvData);
    }
    console.log(errors);
    e.preventDefault();
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-sm-center">
          <form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <textarea className="text-area" type="text" value={products} onChange={handleChange} />
                {errors ? <Alert variant="danger">The above field can not be empty</Alert> : null}
                {success ? <Alert variant="success">CSV ready to download</Alert> : null}
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-sm-center">
                <select className="type-selector" onChange={handleTypeChange} value={type}>
                  <option value="Shoes">Shoes</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Other">Other</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-sm-center">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Button variant="danger" onClick={handleClear}>
                  Reset
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-sm-center">
                {success ? (
                  <Button variant="success">
                    <CSVLink data={csvData}>Download CSV</CSVLink>
                  </Button>
                ) : null}
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
