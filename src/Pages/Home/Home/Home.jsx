import React from "react";
import Banner from "../../Banner/Banner";
import LatestBooks from "../../LatestBooks/LatestBooks";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Banner></Banner>
      <LatestBooks></LatestBooks>
    </div>
  );
};

export default Home;
