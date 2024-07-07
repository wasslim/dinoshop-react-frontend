import React, { useEffect, useState } from "react";
import client from "../shopifyConfig";
import { formatCurrency } from "../utilities/formatCurrency";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client.product.fetchAll().then((fetchedProducts) => {
      setProducts(fetchedProducts);
    });
  }, []);

  return (
    <Container className="mt-10 px-4">
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} md={6} lg={4} className="mb-4">
            <Card className="shadow-lg">
              <Card.Img variant="top" src={product.images[0].src} alt={product.title} />
              <Card.Body className="text-center">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>{formatCurrency(product.variants[0].price.amount)}</Card.Text>
                <Link to={`/product/${encodeURIComponent(product.id)}`}>
                  <Button variant="primary">Buy Now</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
