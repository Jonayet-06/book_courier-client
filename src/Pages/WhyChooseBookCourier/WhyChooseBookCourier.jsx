import React, { useEffect, useState } from "react";
import { FaShippingFast, FaUndoAlt } from "react-icons/fa";
import { FaBookOpen, FaDollarSign, FaHeadset, FaLock } from "react-icons/fa6";
import { motion } from "framer-motion";

const WhyChooseBookCourier = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("/features.json")
      .then((res) => res.json())
      .then((data) => {
        setFeatures(data);
      });
  }, []);

  const icons = [
    <FaShippingFast />,
    <FaBookOpen />,
    <FaHeadset />,
    <FaDollarSign />,
    <FaUndoAlt />,
    <FaLock />,
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 bg-gray-50">
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto text-center mb-12"
      >
        <h2 className="text-4xl font-bold">Why Choose Book Courier</h2>
        <p className="text-gray-600 mt-4">
          Discover the benefits of ordering your books with us.
        </p>
      </motion.div>

      {/* Animated Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition"
          >
            <div className="text-4xl text-indigo-500 mb-4">{icons[index]}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyChooseBookCourier;
