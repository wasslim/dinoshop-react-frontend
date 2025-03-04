import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import Client from "../shopifyConfig";
import { formatCurrency } from "../utilities/formatCurrency";
import Alert from './Alert';
import parse from 'html-react-parser';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { slugify } from "../utilities/slugify";

const ProductDetail = () => {
  const { slug } = useParams();
  const { addToCart, openCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const [showColorError, setShowColorError] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const allProducts = await Client.product.fetchAll();
        const fetchedProduct = allProducts.find(
        (product) => slugify(product.title) === slug
      );
        setProduct(fetchedProduct);

        const isAvailable = fetchedProduct.variants.some(variant => variant.available);
        setIsOutOfStock(!isAvailable);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Er is een fout opgetreden bij het ophalen van het product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    let valid = true;
    if (product.variants.length > 1) {
      if (!selectedColor) {
        setShowColorError(true);
        valid = false;
      }
      if (!selectedSize) {
        setShowSizeError(true);
        valid = false;
      }
      if (!valid) return;
    }

    let variant;
    if (product.variants.length === 1) {
      variant = product.variants[0];
    } else {
      variant = product.variants.find(
        (variant) =>
          variant.selectedOptions.some(
            (option) => option.name === "Kleur" && option.value === selectedColor
          ) &&
          variant.selectedOptions.some(
            (option) => option.name === "Maat" && option.value === selectedSize
          )
      );
    }

    if (variant) {
      addToCart(variant.id, quantity);
      setAlertMessage("Toegevoegd aan winkelwagen!");
      openCart();
    } else {
      setAlertMessage("De gekozen combinatie is niet beschikbaar. Kies een andere maat of kleur.");
    }
  };

  const handleColorClick = useCallback((color) => {
    setSelectedColor((prevColor) => (prevColor === color ? "" : color));
    setShowColorError(false);
  }, []);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setShowSizeError(false);
  };

  const colorMap = {
    "Beige": "#f5f5dc",
    "Groen": "#274c02",
    "Wit": "#ffffff"
  };

  const colors = [
    ...new Set(
      product?.variants.map((variant) =>
        variant.selectedOptions.find((option) => option.name === "Kleur")?.value
      ).filter(Boolean)
    ),
  ];

  const sizes = [
    ...new Set(
      product?.variants.map((variant) =>
        variant.selectedOptions.find((option) => option.name === "Maat")?.value
      ).filter(Boolean)
    ),
  ];

  const filteredImages = selectedColor
    ? product?.images.filter(image => image.src.toLowerCase().includes(selectedColor.toLowerCase()))
    : product?.images;

  if (loading) return <div>Product wordt geladen...</div>;
  if (error) return <div>Fout: {error}</div>;

  return (
    <div className="container mx-auto mt-10 px-4">
      {alertMessage && <Alert message={alertMessage} type="error" />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <Carousel showThumbs={true} infiniteLoop={true} autoPlay={true} interval={5000} showStatus={false}>
            {filteredImages?.map((image, index) => (
              <div key={index}>
                <img src={image.src} alt={product.title} className="rounded-lg shadow-lg" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
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
                  {showColorError && (
                    <span className="text-red-500 text-sm mt-2">Selecteer een kleur.</span>
                  )}
                </div>
              )}
              {sizes.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">Selecteer maat</h3>
                  <div className="flex space-x-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeClick(size)}
                        className={`px-4 py-2 rounded-lg border-2 ${
                          selectedSize === size ? "border-darkgreen" : "border-gray-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {showSizeError && (
                    <span className="text-red-500 text-sm mt-2">Selecteer een maat.</span>
                  )}
                </div>
              )}

              {/* Quantity input field */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Aantal</h3>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="w-20 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-green-500 bg-white"
                  min="1"
                />
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                style={{ backgroundColor: isOutOfStock ? "#ccc" : "#274c02" }}
                className={`text-white px-6 py-3 rounded-lg shadow-lg transition-colors mb-10 ${
                  isOutOfStock ? "cursor-not-allowed" : ""
                }`}
              >
                Voeg toe aan winkelwagen
              </button>
            </>
          )}
          <div className="text-lg mb-4">
            {parse(product.descriptionHtml || product.description)}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
