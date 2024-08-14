import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    company: '',
    email: '',
    message: '',
    phone: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const imageUrl = `${process.env.PUBLIC_URL}/images/contact.jpg`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      formData,
      process.env.REACT_APP_PUBLIC_KEY
    ).then((result) => {
      console.log(result.text);
      setSuccessMessage('Uw bericht is succesvol verzonden!');
      setErrorMessage(null);
      setFormData({
        from_name: '',
        company: '',
        email: '',
        message: '',
        phone: '',
      });
    }, (error) => {
      console.log(error.text);
      setErrorMessage('Er is iets misgegaan. Probeer het later opnieuw.');
      setSuccessMessage(null);
    });
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-6 text-center">Contacteer ons</h1>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="from_name">
                Voor- en achternaam*
              </label>
              <input
                type="text"
                name="from_name"
                id="from_name"
                value={formData.from_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                Bedrijf
              </label>
              <input
                type="text"
                name="company"
                id="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email*
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Telefoon*
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Bericht*
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-green-500"
                rows="5"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-darkgreen text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-200"
              >
                Verzenden
              </button>
            </div>
          </form>
        </div>

        <div className="flex justify-center items-center">
            <img src={imageUrl} alt="Contact" className="rounded-lg shadow-lg w-3/4" />
      </div>
      </div>
    </div>
  );
};

export default ContactPage;
