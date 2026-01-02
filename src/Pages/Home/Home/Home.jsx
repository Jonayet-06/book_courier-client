import React from "react";
import Banner from "../../Banner/Banner";
import LatestBooks from "../../LatestBooks/LatestBooks";
import Coverage from "../../Coverage/Coverage";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Banner></Banner>
      <LatestBooks></LatestBooks>
      <Coverage></Coverage>
    </div>
  );
};

export default Home;
