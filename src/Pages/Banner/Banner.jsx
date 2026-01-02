import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner01 from "../../assets/Banner/banner-01.jpg";
import banner02 from "../../assets/Banner/banner-02.jpg";
import banner03 from "../../assets/Banner/banner-04.jpg";
import banner04 from "../../assets/Banner/banner-06.jpg";
import banner05 from "../../assets/Banner/banner-07.jpg";
import banner06 from "../../assets/Banner/banner-08.jpg";
import { Link } from "react-router";
import { Carousel } from "react-responsive-carousel";
import "./Banner.css";
const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true}>
      {/* SLIDE 1 */}
      <div className="banner-slide">
        <img src={banner01} alt="Book One" />
        <div className="banner-content">
          <h2>The Art of Reading</h2>
          <p>Explore books that spark imagination and creativity.</p>
          <Link
            to="/addedNewBooks"
            className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]"
          >
            View All Books
          </Link>
        </div>
      </div>
      {/* SLIDE 2 */}
      <div className="banner-slide">
        <img src={banner02} alt="Book Two" />
        <div className="banner-content">
          <h2>Knowledge Unlocked</h2>
          <p>Discover educational and inspirational book collections.</p>
          <Link className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]">
            View All Books
          </Link>
        </div>
      </div>
      {/* SLIDE 3 */}
      <div className="banner-slide">
        <img src={banner03} alt="Book Three" />
        <div className="banner-content">
          <h2>Learn & Grow</h2>
          <p>Handpicked books to boost your personal development.</p>
          <Link className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]">
            View All Books
          </Link>
        </div>
      </div>
      {/* SLIDE 4 */}
      <div className="banner-slide">
        <img src={banner04} alt="Book Three" />
        <div className="banner-content">
          <h2>Timeless Knowledge</h2>
          <p>
            A stack of classic books crowned with reading glasses, symbolizing
            wisdom, study, and the pursuit of lifelong learning.
          </p>
          <Link className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]">
            View All Books
          </Link>
        </div>
      </div>
      {/* SLIDE 5 */}
      <div className="banner-slide">
        <img src={banner05} alt="Book Three" />
        <div className="banner-content">
          <h2>Moments of Quiet Reading</h2>
          <p>
            An open book beside a warm cup of coffee under fresh green leaves,
            capturing the calm joy of reading in nature.
          </p>
          <Link className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]">
            View All Books
          </Link>
        </div>
      </div>
      {/* SLIDE 6 */}
      <div className="banner-slide">
        <img src={banner06} alt="Book Three" />
        <div className="banner-content">
          <h2>Where Stories Bloom</h2>
          <p>
            An open book paired with delicate flowers, evoking creativity,
            reflection, and the beauty of thoughtful storytelling.
          </p>
          <Link className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]">
            View All Books
          </Link>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
