const AboutSection = () => {
    return (
      <div className="container mx-auto my-20 px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img src="/path/to/about-image.jpg" alt="Stijn" className="img-fluid rounded" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-darkgreen">About Us</h2>
            <p className="text-lg leading-relaxed mb-4 text-gray-700">
              Exact één jaar geleden besloot Stijn om zijn passie voor bier om te zetten in een fysiek product...
              {/* Shortened for brevity */}
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    );
  };
export default AboutSection  