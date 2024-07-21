// src/components/HeroSection.jsx
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const HeroSection = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    fetch(`${apiUrl}/home/fetch_images`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error('Error:', data.error);
        } else {
          setImages(data.hero_images || []);
        }
      })
      .catch((error) => console.error('Error:', error));
  }, []);

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
          <button className="bg-darkgreen text-white px-6 py-3 rounded-lg hover:bg-green transition-colors duration-300">
            Ontdek
          </button>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 ms-3">
          {images.length > 0 ? (
            <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={5000} showStatus={false}>
              {images.map((src, index) => (
                <div key={index}>
                  <img src={src} alt="" className="w-full h-full object-cover rounded-lg shadow-lg" />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
              <span className="text-gray-500">Loading images...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
