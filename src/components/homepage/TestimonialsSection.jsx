const TestimonialsSection = () => {
    return (
      <div className="bg-lightbeige py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-darkgreen">What Our Customers Say</h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <blockquote className="italic text-gray-700">
                "DINO beer is the best! I love its fruity finish and the quality is top-notch."
              </blockquote>
              <p className="text-darkgreen font-bold mt-4">- Satisfied Customer</p>
            </div>
            {/* Add more testimonials here */}
          </div>
        </div>
      </div>
    );
  };
export default TestimonialsSection  