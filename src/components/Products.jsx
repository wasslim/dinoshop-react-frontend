import React, { useEffect, useState } from "react";
import client from "../shopifyConfig";
import { formatCurrency } from "../utilities/formatCurrency";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

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
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure className="px-10 pt-10">
              <img src={product.images[0].src} alt="car!" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{product.title}</h2>
                <p>{product.description}</p>
                <p>{formatCurrency(product.variants[0].price.amount)}</p>
                <div className="card-actions">
                  <button  href={`/product/${encodeURIComponent(product.id)}`} className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
