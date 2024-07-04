import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const About = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    fetch(`${apiUrl}/about/fetch_about`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error('Error:', data.error);
        } else {
          setImageUrl(data.stijn_image_url);
        }
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <img id="stijn-image" src={imageUrl} className="img-fluid rounded" alt="Stijn" />
          </Col>
          <Col md={6}>
            <h1>Over ons</h1>
            <h2>Ontstaan</h2>
            <p>
              Exact één jaar geleden besloot Stijn om zijn passie voor bier om te zetten in een fysiek product.
              Na enkele brainstormsessies en brouwerijbezoeken, had hij een brouwerij gevonden om hem hierbij
              bij te staan. Met grote trots presenteert hij nu "DINO"; een doordringende, blonde tripel van 7.9%
              met een fruitige afwerking. Het idee is ontstaan in zijn scoutsgroep P.G. Frassati waar 'Dino' al
              enkele jaren Stijns bijnaam is. De bedoeling was om de tripel aan te bieden bij scoutsactiviteiten,
              maar daar bleef het niet bij. Op vraag van een aantal cafés in de buurt kan je het 'DINO'-bier ook
              drinken aan de 'lokale' toog. Het bier is te koop in bakken en 6-packs. De passie van Stijn voor bier
              resulteert in ondernemerschap. Naast het bier, zorgt hij ook voor de marketingtools die hij bij het
              bier behoren; ook het logo en het bierglas zijn door Stijn zelf ontworpen.
            </p>
            <Button variant="primary">Ontdek het bier hier!</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
