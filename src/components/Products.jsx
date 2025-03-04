import React, { useEffect, useState } from "react";
import client from "../shopifyConfig";
import { formatCurrency } from "../utilities/formatCurrency";
import { Link } from "react-router-dom";
import { slugify } from "../utilities/slugify";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client.product.fetchAll().then((fetchedProducts) => {
      setProducts(fetchedProducts);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto mt-10 px-4 flex-grow">
        <div className="flex flex-wrap -mx-4">
          {products.map((product) => {
            const isOutOfStock = !product.variants.some((variant) => variant.available);

            return (
              <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white border border-darkbeige rounded-lg overflow-hidden shadow-lg transform transition-transform duration-200 hover:-translate-y-2 flex flex-col justify-between h-full">
                  <img
                    src={product.images[0].src}
                    alt={product.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 text-center flex-grow">
                    <h3 className="text-darkgreen font-bold text-xl mb-2">{product.title}</h3>
                    <p className="text-darkgreen font-bold text-lg mb-2">
                      {formatCurrency(product.variants[0].price.amount)}
                    </p>
                    {isOutOfStock && (
                      <p className="text-red-500 font-bold text-sm mb-2">Uitverkocht</p>
                    )}
                  </div>
                  <div className="p-6 text-center">
                  <Link to={`/product/${slugify(product.title)}`}>
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
    </div>
  );
};

export default Products;
