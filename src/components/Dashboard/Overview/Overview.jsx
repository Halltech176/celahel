import Visuals from "./Visuals";
import overview from "./Overview.module.css";
import Sidebar from "../../Common/Sidebar/Sidebar";
const Overview = () => {
  return (
    <>
      <Sidebar />
      <div className={`${overview.line_graph_container}`}>
        <h1 className="text-primary">Properties overviews</h1>
        <Visuals />
      </div>
    </>
  );
};
export default Overview;
