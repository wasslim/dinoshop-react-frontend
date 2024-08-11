import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import Client from "../shopifyConfig";
import { formatCurrency } from "../utilities/formatCurrency";
import Alert from './Alert';
import parse from 'html-react-parser';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, openCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const fetchedProduct = await Client.product.fetch(id);
        setProduct(fetchedProduct);

        // Check if the product or any variants are available
        const isAvailable = fetchedProduct.variants.some(variant => variant.available);
        setIsOutOfStock(!isAvailable);

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
      setAlertMessage("Toegevoegd aan winkelwagen!");
      openCart();
    } else if (product.variants.length > 1) {
      setAlertMessage("De gekozen combinatie is niet beschikbaar kies een andere maat of een ander kleur!");
    } else {
      addToCart(product.variants[0].id, 1);
      setAlertMessage("Toegevoegd aan winkelwagen!");
      openCart();
    }
  };

  const colorMap = {
    "Beige": "#f5f5dc",
    "Groen": "#274c02",
    "Wit": "#ffffff"
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

  const filteredImages = selectedColor
    ? product.images.filter(image => image.src.toLowerCase().includes(selectedColor.toLowerCase()))
    : product.images;

  const handleColorClick = (color) => {
    if (selectedColor === color) {
      setSelectedColor(""); // Unselect the color to show all images
    } else {
      setSelectedColor(color);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      {alertMessage && <Alert message={alertMessage} type="error" />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <Carousel showThumbs={true} infiniteLoop={true} autoPlay={true} interval={5000} showStatus={false}>
            {filteredImages.map((image, index) => (
              <div key={index}>
                <img src={image.src} alt={product.title} className="rounded-lg shadow-lg" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <div className="text-lg mb-4">
            {parse(product.descriptionHtml || product.description)}
          </div>
          <p className="text-2xl font-bold mb-4 text-green-500">
            {formatCurrency(product.variants[0].price.amount)}
          </p>
          {isOutOfStock ? (
            <p className="text-red-500 font-bold text-lg mb-4">
              Er zijn geen {product.title} meer in stock. Kom later terug!
            </p>
          ) : (
            <>
              {colors.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">Selecteer kleur</h3>
                  <div className="flex space-x-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorClick(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color ? "border-darkgreen" : "border-gray-300"
                        }`}
                        style={{ backgroundColor: colorMap[color] }}
                      ></button>
                    ))}
                  </div>
                </div>
              )}
              {sizes.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">Selecteer maat</h3>
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
                disabled={isOutOfStock}
                style={{ backgroundColor: isOutOfStock ? "#ccc" : "#274c02" }}
                className={`text-white px-6 py-3 rounded-lg shadow-lg transition-colors ${
                  isOutOfStock ? "cursor-not-allowed" : ""
                }`}
              >
                Voeg toe aan winkelwagen
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
