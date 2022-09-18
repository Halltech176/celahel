import style from "../Properties/Properties.module.css";
import PropertyCard from "../Properties/PropertyCard";
import NoValues from "../NoValues";
const PropertyView = (property) => {
  let agent_properties;
  console.log(property?.property_summary);
  if (property?.property_summary?.length !== 0) {
    agent_properties = <PropertyCard property={property?.property_summary} />;
  } else {
    agent_properties = <NoValues value="Properties" />;
  }
  console.log(property.property_summary);
  return (
    <>
      <div className={` d-flex flex-wrap justify-content-between`}>
        {agent_properties}
      </div>
    </>
  );
};
export default PropertyView;
