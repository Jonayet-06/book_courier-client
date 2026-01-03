import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const BookCourierStats = () => {
  return (
    <section className="py-16 bg-indigo-600 text-white">
      {/* Heading Animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl font-bold">Book Courier at a Glance</h2>
        <p className="mt-2 text-indigo-200">
          Our growth and impact across the country
        </p>
      </motion.div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* District Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-5xl font-bold">
            <CountUp end={64} duration={2} />+
          </h3>
          <p className="mt-2">District Coverage</p>
        </motion.div>

        {/* Books Delivered */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-5xl font-bold">
            <CountUp end={10000} duration={2.5} />+
          </h3>
          <p className="mt-2">Books Delivered</p>
        </motion.div>

        {/* Happy Customers */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <h3 className="text-5xl font-bold">
            <CountUp end={5000} duration={2.8} />+
          </h3>
          <p className="mt-2">Happy Customers</p>
        </motion.div>
      </div>
    </section>
  );
};

export default BookCourierStats;
