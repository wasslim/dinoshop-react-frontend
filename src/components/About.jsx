import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  const navigate = useNavigate();
  

  const imageUrl = `${process.env.PUBLIC_URL}/images/groepsfoto.jpg`; 

  const handleButtonClick = () => {
    navigate('/products');
  };

  return (
    <>
      <div className="bg-light py-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <img
                id="stijn-image"
                src={imageUrl}
                className="img-fluid rounded-lg shadow-lg"
                alt="Stijn"
              />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-darkgreen mb-4">Over ons</h1>
              <h2 className="text-3xl font-semibold text-green mb-4">Ontstaan</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
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
              <button
                onClick={handleButtonClick}
                style={{ backgroundColor: '#274c02' }}
                className="text-white px-6 py-3 rounded-lg shadow-lg transition-colors"
              >
                Ontdek het bier hier!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
