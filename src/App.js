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
  const [errors, setErrors] = useState({});
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
    setErrors({});
    setSuccess(false);
  };

  const getObjString = input => {
    let string = `{"products":[${input}]}`;
    return string;
  };

  const handleSubmit = e => {
    let data = scraper(getObjString(products), type);

    if (data.emptyError || data.formatError) {
      setSuccess(false);
      setErrors({ ...data });
    } else {
      setCsvData(data);
      setErrors({});
      setSuccess(true);
      console.log(data);
    }

    e.preventDefault();
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-sm-center">
          <form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <textarea className="text-area" type="text" value={products} onChange={handleChange} placeholder="Enter StockX Data" />
                {errors.emptyError ? <Alert variant="danger">{errors.emptyError}</Alert> : null}
                {errors.formatError ? <Alert variant="danger">{errors.formatError}</Alert> : null}
                {success ? <Alert variant="success">CSV ready to download</Alert> : null}
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-sm-center align-items-center">
                <span>Type:</span>
                <select className="type-selector form-control" onChange={handleTypeChange} value={type}>
                  <option value="Shoes">Shoes</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Other">Other</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-sm-center">
                <Button className="my-btn" variant="outline-primary" type="submit">
                  Submit
                </Button>
                <Button className="my-btn" variant="outline-danger" onClick={handleClear}>
                  Reset
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-sm-center">
                {success ? (
                  <Button className="download-btn" variant="outline-success" size="lg" onClick={handleClear}>
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
