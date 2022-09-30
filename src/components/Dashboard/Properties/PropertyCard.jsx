import style from "./Properties.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, Zoom } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ErrorNotification, InfoNotification } from "../../Common/ErrorToast";
import { Property } from "../../../Redux/actions";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const GetProperty = async (id) => {
    try {
      console.log(id);
      window.localStorage.setItem("id", JSON.stringify(id));
      const response = await dispatch(Property(id));
      if (response.type === "property/fulfilled") {
        navigate("/agent/editproperty");
      }
      if (response.type === "property/rejected") {
        throw "please check your internet connection";
      }
      console.log(response);
    } catch (err) {
      console.log(err);
      ErrorNotification(err);
    }
  };

  console.log(property);
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
  let amountFormat = Intl.NumberFormat("en-US");
  const agent_properties = property?.map((data) => {
    return (
      <div
        key={data?._id}
        className={`${style.image_container} card my-4 mx-2`}
      >
        <div className="card-header  d-flex align-items-center justify-content-between">
          {" "}
          <span>{data?.name} </span>{" "}
          <span
            className={`${
              data?.purpose === "sale" ? style.sell_badge : style.rent_badge
            } badge  px-2 py-1 text-center`}
          >
            {data?.purpose}
          </span>
        </div>

        <Slider {...settings}>
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
        </Slider>

        <div className="card-footer m-0">
          <h5 className={`${style.property_price} `}>
            price - {amountFormat.format(data?.price)}.00
          </h5>
          <h5 className={`${style.property_location} `}>
            location - {data?.address}
          </h5>
        </div>
        <div className="card-footer d-flex flex-wrap align-items-center justify-content-end">
          <div className="d-flex flex-wrap align-items-center">
            edit:
            <FiEdit
              className="ms-1"
              style={{ cursor: "pointer" }}
              onClick={() => GetProperty(data?._id)}
            />
          </div>
        </div>
      </div>
    );
  });
  return <> 
   <ToastContainer transition={Zoom} autoClose={800} /> 
  {agent_properties}
  </>;
};
export default PropertyCard;
