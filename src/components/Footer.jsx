import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-5">
      <Container>
        <Row className="text-center">
          <Col md={6}>
            <p className="mb-0">&copy; 2024, DINO</p>
          </Col>
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <p className="mb-0 mr-2">Volg ons op sociale media:</p>
            <Button variant="link" href="https://www.instagram.com/dino_bier/" target="_blank" className="text-dark p-0 mx-2">
              <FaInstagram size={24} />
            </Button>
            <Button variant="link" href="https://www.facebook.com/profile.php?id=100092698125201" target="_blank" className="text-dark p-0 mx-2">
              <FaFacebook size={24} />
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
