import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import Client from "../shopifyConfig";
import { formatCurrency } from "../utilities/formatCurrency";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const fetchedProduct = await Client.product.fetch(id);
        setProduct(fetchedProduct);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <img
            src={product.images[0].src}
            alt={product.title}
            className="max-h-96 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4 text-green-500">
            {formatCurrency(product.variants[0].price.amount)}
          </p>
          <button
            onClick={() => addToCart(product.variants[0].id, 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
