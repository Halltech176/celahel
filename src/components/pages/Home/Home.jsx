import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import Navbar from "../../Common/Navbar/Navbar";
import Footer from "../../Common/Footer/Footer";
import "./home.styles.scss";
import { Features, Testimonials } from "./Features";
import { FaStar } from "react-icons/fa";
import PlayBadge from "../../../Assets/MobilePlayStore.svg";
import AppBadge from "../../../Assets/MobileAppStore.svg";
import displayImage from "../../../Assets/house3.png";
import displayImage2 from "../../../Assets/house2.png";
import displayImage3 from "../../../Assets/img2.png";
import iPhone from "../../../Assets/iPhone.png";

{
  /* <Slider {...settings}>
{data?.images.map((img) => {
  return (
    <div key={img._id} className={`${style.image_border} mx-auto`}>
      <img
        src={img.url}
        alt={img.name}
        className={`${style.property_image} `}
        loading="eager"
      />
    </div>
  );
})}
</Slider> */
}

const Home = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    // variableWidth: true,
  };
  const renderFeatures = Features.map((data, index) => {
    return (
      <motion.div
        key={index}
        initial={{
          opacity: 0,
          transform: "scaleX(0.1)",
        }}
        whileInView={{
          opacity: 1,
          transform: " scaleX(1.0)",
        }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="col-lg"
      >
        <div className="card p-5 my-3 text-light shadow-lg">
          <div className="circle bg-white text-center text-dark">
            <span>{index}</span>
          </div>
          <h3 className="text-center card-title">{data.feature}</h3>
          <p className="card-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatum, repudiandae.
          </p>
        </div>
      </motion.div>
    );
  });

  const renderTestimonials = Testimonials.map((data, index) => {
    return (
      <motion.div
        key={index}
        initial={{
          // opacity: 0,
          transform: `translateX(-20rem)`,
        }}
        whileInView={{
          // opacity: 1,
          transform: " translateX(1rem)",
        }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        className="col mid_col"
      >
        <div className="card p-3 marq-card">
          <div className="d-flex flex-column justify-content-start align-items-start mb-3">
            <div>
              <FaStar color="blue"></FaStar>
              <FaStar color="blue"></FaStar>
              <FaStar color="blue"></FaStar>
              <FaStar color="blue"></FaStar>
              <FaStar color="blue"></FaStar>
            </div>
          </div>

          <div>
            <q className="card-text text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam consequatur soluta, nam tenetur possimus excepturi
              error debitis doloremque illo doloribus.
            </q>
          </div>
          <p className="h3 text-primary card-title">John Carter</p>
          <p className="small text-primary">Web Designer</p>
        </div>
      </motion.div>
    );
  });
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <div>
        <div className="d-lg-flex md:px-5 px-2 justify-content-between align-items-end hero bg-primary-100">
          <div className="col-12 col-md-6">
            <div className="container p-3 mb-5">
              <div className="phone-container ">
                <p className="text-white heading_text fw-bold">
                  <span className="dotted"> Discover</span> <br />
                  Most Suitable <br />
                  Property
                </p>
                <img src={iPhone} className="phone-header" />
              </div>
              <p className="home_text ">
                Find a variety of properties that suit you very easily,forget
                all difficuities in finding a residence.
              </p>
              <button className="btn btn-light mobile_btn px-4 my-1  rounded-3 mt-3 btn-lg">
                Get the Mobile App
              </button>
            </div>
          </div>
          <div className="col-12  col-container col-md-6">
            <div className="container">
              <div>
                <div className=" imgContainer">
                  <span className="badge bg-primary p-3 shadow-lg">
                    Relaxation
                  </span>
                  <span className="badge bg-info p-3 shadow-lg">
                    Get Hostel
                  </span>
                  <span className="badge bg-danger p-3 shadow-lg">
                    Buy House
                  </span>
                  <span className="badge bg-success p-3 shadow-lg">
                    Rent House
                  </span>
                  <Slider {...settings}>
                    <div className="  px-0">
                      <img
                        src={displayImage}
                        alt="Display Image 1"
                        className="img-fluid w-100"
                      />
                    </div>
                    <div className="">
                      <img
                        src={displayImage2}
                        alt="Display Image 2"
                        className="img-fluid w-100"
                      />
                    </div>
                    <div className="">
                      <img
                        src={displayImage3}
                        alt="Display Image 3"
                        className="img-fluid w-100"
                      />
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container  my-3 text-center">
          <h2 className="semi_text">How It Works</h2>
          <p className="lead text_lead">
            Our Unique process gives you peace of mind for all our services
          </p>
          <div className="row g-5 cards">{renderFeatures}</div>

          <div className="my-5 d-non p-3">
            <div className="container-fluid text-center">
              <h2>What Our Clients Say</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste
                laboriosam eos vero eaque cupiditate. Vero.
              </p>

              <div className="row mid_col_container my-4">
                {renderTestimonials}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="lastSection">
          <div className="container my-5">
            <div className="d-lg-flex justify-content-between bg-primary-100 rounded-sm p-5">
              <div className="col-lg-6 text-light">
                <h3>Get Our App & Do More</h3>
                <p>
                  You can do anything you want with just a click on our app.
                </p>
                <div className="d-lg-flex">
                  <img src={AppBadge} alt="" className="my-2 my-lg-0" />
                  <img src={PlayBadge} alt="" className="" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="phone">
                  <img src={iPhone} alt="" height="300%" />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <Footer />
      </div>
    </motion.div>
  );
};
export default Home;
