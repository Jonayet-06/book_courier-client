import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const LatestBooks = () => {
  const axiosSecure = useAxiosSecure();

  const { data: books = [] } = useQuery({
    queryKey: ["latest-books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-books");
      return res.data;
    },
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <div>
      {/* Animated Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-bold text-center text-4xl"
      >
        Latest Books
      </motion.h2>

      {/* Animated Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5"
      >
        {books.map((book) => (
          <motion.div
            key={book._id}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="card bg-base-100 shadow-sm"
          >
            <figure>
              <img
                src={book.image}
                alt={book.title || "Book"}
                className="h-64 w-full object-cover"
              />
            </figure>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LatestBooks;
