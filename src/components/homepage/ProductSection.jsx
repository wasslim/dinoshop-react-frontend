import React, { useEffect, useState } from 'react';
import client from '../../shopifyConfig';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utilities/formatCurrency';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client.product.fetchAll().then((fetchedProducts) => {
      setProducts(fetchedProducts.slice(0,2)); // Display only 3 featured products
    });
  }, []);

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Uitgelicht</h2>
        <div className="flex flex-wrap justify-center space-x-4">
          {products.map((product) => (
            <div key={product.id} className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white border rounded-lg overflow-hidden shadow-lg">
                <img
                  src={product.images[0].src}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-gray-900 font-bold text-xl mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{formatCurrency(product.variants[0].price.amount)}</p>
                  <Link to={`/product/${encodeURIComponent(product.id)}`}>
                    <button className="bg-darkgreen text-white px-4 py-2 rounded-lg hover:bg-green transition-colors duration-300">
                      Koop nu
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
