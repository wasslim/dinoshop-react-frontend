import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CustomCookieBanner = () => {
    const [isBannerVisible, setIsBannerVisible] = useState(false);
    const [isAgeVerificationVisible, setIsAgeVerificationVisible] = useState(false);
    const location = useLocation();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent && location.pathname !== '/privacy') {
      setIsBannerVisible(true);
    }
  }, [location]);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsBannerVisible(false);
    setIsAgeVerificationVisible(true);
  };


  const handleAgeConfirm = () => {
    localStorage.setItem('ageConfirmed', 'true');
    setIsAgeVerificationVisible(false);
  };

  if (location.pathname === '/privacy') {
    return null;
  }

  return (
    <>
      {isBannerVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#fdffe0] text-[#2d4908] p-6 rounded-lg shadow-lg max-w-xs w-full">
            <p className="mb-4 text-center font-semibold">
              Wij waarderen jouw privacy.
            </p>
            <p className="mb-4 text-center">
              We gebruiken Shopify's ingebouwde tools voor analytische en marketingdoeleinden om je ervaring te personaliseren en om analyses te verzamelen. Meer informatie in ons <Link to="/privacy" className="underline text-[#2d4908]">Privacybeleid</Link>.
            </p>
            <div className="flex justify-center space-x-4">
              <button onClick={handleAcceptAll} className="bg-[#463e39] text-white px-4 py-2 rounded">
                Accepteren
              </button>
            </div>
          </div>
        </div>
      )}

      {isAgeVerificationVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#fdffe0] text-[#2d4908] p-6 rounded-lg shadow-lg max-w-xs w-full">
            <p className="mb-4 text-center font-semibold">
              Leeftijdsverificatie
            </p>
            <p className="mb-4 text-center">
              Je moet 18 jaar of ouder zijn om deze site te bezoeken. Bevestig dat je 18 jaar of ouder bent.
            </p>
            <div className="flex justify-center">
              <button onClick={handleAgeConfirm} className="bg-[#463e39] text-white px-4 py-2 rounded">
                Ik ben 18 jaar of ouder
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomCookieBanner;

