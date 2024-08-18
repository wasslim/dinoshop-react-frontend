// src/components/HeroSection.jsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
  navigate('/over-ons');
};
  const images = [
    `${process.env.PUBLIC_URL}/images/banner_hero.jpg`, 
    `${process.env.PUBLIC_URL}/images/foto_bankje.jpg`, 
    `${process.env.PUBLIC_URL}/images/groepsfoto.jpg`, 
  ];

  return (
    <div className="relative bg-white">
      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ontdek de DINO ervaring.
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Geniet van ons premium assortiment Blonde Tripel bier, vervaardigd met passie en precisie.
          </p>
          <button onClick={handleButtonClick} className="bg-darkgreen text-white px-6 py-3 rounded-lg hover:bg-green transition-colors duration-300">
            Ontdek
          </button>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 ms-3">
          <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={5000} showStatus={false}>
            {images.map((src, index) => (
              <div key={index}>
                <img src={src} alt={`Hero slide ${index + 1}`} className="w-full h-full object-cover rounded-lg shadow-lg" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
