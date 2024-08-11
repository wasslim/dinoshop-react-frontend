import React, { useEffect, useState } from "react";
import client from "../shopifyConfig";
import { formatCurrency } from "../utilities/formatCurrency";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client.product.fetchAll().then((fetchedProducts) => {
      setProducts(fetchedProducts);
    });
  }, []);

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="flex flex-wrap -mx-4">
        {products.map((product) => {
          // Check if any variant of the product is available
          const isOutOfStock = !product.variants.some((variant) => variant.available);

          return (
            <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="bg-white border border-darkbeige rounded-lg overflow-hidden shadow-lg transform transition-transform duration-200 hover:-translate-y-2">
                <img
                  src={product.images[0].src}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-darkgreen font-norwester text-xl mb-2">{product.title}</h3>
                  <p className="text-darkbeige font-bold mb-4">{formatCurrency(product.variants[0].price.amount)}</p>
                  {isOutOfStock && (
                    <p className="text-red-500 text-sm mb-2">Uitverkocht</p>
                  )}
                  <Link to={`/product/${encodeURIComponent(product.id)}`}>
                    <button className="bg-darkgreen text-white py-2 px-4 rounded hover:bg-green transition-colors duration-200">
                      Koop nu
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
