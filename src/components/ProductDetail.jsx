import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import Client from "../shopifyConfig";
import { formatCurrency } from "../utilities/formatCurrency";
import Alert from './Alert';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

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

  const handleAddToCart = () => {
    if (product.variants.length > 1 && (!selectedColor || !selectedSize)) {
      setAlertMessage("Please select both color and size");
      return;
    }

    const variant = product.variants.find(
      (variant) =>
        variant.selectedOptions.some(
          (option) => option.name === "Kleur" && option.value === selectedColor
        ) &&
        variant.selectedOptions.some(
          (option) => option.name === "Maat" && option.value === selectedSize
        )
    );

    if (variant) {
      addToCart(variant.id, 1);
      setAlertMessage("Added to cart successfully!");
    } else if (product.variants.length > 1) {
      setAlertMessage("Selected variant is not available");
    } else {
      addToCart(product.variants[0].id, 1);
      setAlertMessage("Added to cart successfully!");
    }
  };

  const colors = [
    ...new Set(
      product.variants.map((variant) =>
        variant.selectedOptions.find((option) => option.name === "Kleur")?.value
      ).filter(Boolean)
    ),
  ];

  const sizes = [
    ...new Set(
      product.variants.map((variant) =>
        variant.selectedOptions.find((option) => option.name === "Maat")?.value
      ).filter(Boolean)
    ),
  ];

  return (
    <div className="container mx-auto mt-10 px-4">
      {alertMessage && <Alert message={alertMessage} type="error" />}
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
          {colors.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Select Color</h3>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? "border-darkgreen" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
            </div>
          )}
          {sizes.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Select Size</h3>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 ${
                      selectedSize === size ? "border-darkgreen" : "border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={handleAddToCart}
            style={{ backgroundColor: "#274c02" }}
            className="text-white px-6 py-3 rounded-lg shadow-lg transition-colors"
          >
            Voeg toe aan winkelwagen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
