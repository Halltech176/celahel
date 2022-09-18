import { ToastContainer, Zoom } from "react-toastify";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDetails } from "react-icons/md";
import { ErrorNotification, InfoNotification } from "../../Common/ErrorToast";
import properties from "./Properties.module.css";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../Common/Sidebar/Sidebar";
import Loader from "../../Common/Loader";
import { Link } from "react-router-dom";
import searchBtn from "../../../Assets/SearchVector.png";
import NoValues from "../NoValues";
import PropertyCard from "./PropertyCard";
import { HandleIt } from "./PropertyUtils";
const PropertyView = (docs) => {
  const [search, setSearch] = useState("");

  const handleSearchFuntion = () => {
    docs?.handleSearch(search);
  };
  console.log(search);
  console.log(docs?.property);

  let agent_properties;
  if (docs?.property?.length !== 0) {
    agent_properties = <PropertyCard property={docs?.property} />;
  } else {
    agent_properties = <NoValues value="property" />;
  }
  return (
    <>
      <Sidebar />
      <div className={`${properties.property_container} row`}>
        <div className={`${properties.search_container}`}>
          <p className={`${properties.info_label}`}>
            note : <br /> click on a property to edit{" "}
          </p>
          <div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${properties.search_input}  form-control`}
              placeholder="search by property name"
            />
            <span onClick={handleSearchFuntion}>
              <img
                className={`${properties.search_icon}`}
                src={searchBtn}
                alt="search icon"
                // className='mx-n5'
              />
            </span>
          </div>
        </div>
        <div
          className={`${properties.add_property} mt-2 col-md-12 justify-content-between d-flex flex-wrap`}
        >
          <p className={`${properties.property_heading}`}> My Properties</p>
          <Link to="/addproperty">
            {" "}
            <button className={`${properties.add_btn} btn btn-primary`}>
              Add New
            </button>
          </Link>
        </div>

        <div className={` d-flex flex-wrap justify-content-between`}>
          {agent_properties}
        </div>

        <div>
          {docs.properties?.totalPages === 1 ? (
            ""
          ) : (
            <div className="paginate-btns d-flex align-items-center justify-content-between my-3 flex-wrap ">
              {docs?.properties?.page === 1 ? (
                <div> </div>
              ) : (
                <button className="paginate-btn" onClick={docs.handleDecrease}>
                  prev
                </button>
              )}

              <ul className="d-flex align-items-center">
                {docs?.property?.map((doc, index) => {
                  // if(inde)
                  return index < docs.properties?.totalPages ? (
                    <li
                      key={index}
                      onClick={() => docs.handlePaginate(index + 1)}
                      className={`${
                        docs?.properties?.page === index + 1
                          ? "active_page"
                          : "inactive_page"
                      } mx-2`}
                    >
                      {index + 1}
                    </li>
                  ) : (
                    ""
                  );
                })}
              </ul>
              {docs?.properties?.page === docs.properties?.totalPages ? (
                <div> </div>
              ) : (
                // <button
                //   onClick={() =>
                //     HandleIt(docs.properties?.totalPages, docs.count)
                //   }
                // >
                //   click me
                // </button>
                <button className="paginate-btn" onClick={docs.handleIncrease}>
                  next
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default PropertyView;
