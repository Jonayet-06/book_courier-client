import React from "react";
import Banner from "../../Banner/Banner";
import LatestBooks from "../../LatestBooks/LatestBooks";
import Coverage from "../../Coverage/Coverage";
import WhyChooseBookCourier from "../../WhyChooseBookCourier/WhyChooseBookCourier";
import HowItWorks from "../../HowItWorks/HowItWorks";
import BookCourierStats from "../../BookCourierStats/BookCourierStats";
const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Banner></Banner>
      <LatestBooks></LatestBooks>
      <Coverage></Coverage>
      <WhyChooseBookCourier></WhyChooseBookCourier>
      <HowItWorks></HowItWorks>
      <BookCourierStats></BookCourierStats>
    </div>
  );
};

export default Home;
