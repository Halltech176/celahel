import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Visuals from "./Visuals";
import overview_style from "./Overview.module.css";
import Sidebar from "../../Common/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import PropertySummary from "./PropertyOverview";
import {
  Overview as PropertyOverview,
  Properties,
} from "../../../Redux/actions";
import Loader from "../../Common/Loader";
const Overview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, overview } = useSelector((state) => state.overview);
  const {
    loading: propertyLoading,
    error: propertyError,
    properties,
  } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(Properties());
    dispatch(PropertyOverview(properties?.totalDocs));
  }, []);

  const property_slice = overview?.docs?.map((property) => {
    return property;
  });

  const property_month = overview?.docs?.map((property) => {
    return new Date(property.createdAt).toLocaleDateString("default", {
      month: "short",
    });
  });

  const map = new Map();
  for (let i = 0; i <= property_month?.length; i++) {
    if (map.get(property_month[i])) {
      map.set(property_month[i], map.get(property_month[i]) + 1);
    } else {
      map.set(property_month[i], 1);
    }
  }
  const sums = [...map.values()];
  sums.pop();
  console.log(sums);

  console.log([...new Set(property_month)]);

  console.log(properties);
  console.log(overview);
  // console.log(error);
  return (
    <>
      {propertyLoading && loading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Sidebar />
          <div className={`${overview_style.line_graph_container}`}>
            <h1 className="text-primary">Properties overviews</h1>
            <Visuals
              property_month={[...new Set(property_month)]}
              sums={sums}
            />
            <PropertySummary
              property_summary={property_slice?.splice(
                0,
                Math.ceil((1 * property_slice?.length) / 4)
              )}
            />
            <div className="d-flex justify-content-end">
              <button
                onClick={() => navigate("/properties")}
                className="btn-primary h6 shadow-md px-4 my-3 border-0 rounded-1 py-2"
              >
                See More
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
export default Overview;
