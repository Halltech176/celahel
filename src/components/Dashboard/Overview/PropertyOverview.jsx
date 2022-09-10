import properties from "../Properties/Properties.module.css";

const PropertyView = (property) => {
  const agent_properties = property?.property_summary?.map((data) => {
    return (
      <div key={data._id} className={`${properties.image_container}`}>
        <span
          className={`${
            data.purpose === "sale"
              ? properties.sell_badge
              : properties.rent_badge
          } badge  px-2 py-1 text-center`}
        >
          {data.purpose}
        </span>
        <div className={`${properties.property_text}`}>
          <p className={`${properties.property_name}`}>{data.name}</p>
          <p className={`${properties.property_location}`}>{data.address}</p>
          <p className={`${properties.property_price}`}>${data.price}</p>
        </div>

        <div className="d-flex flex-wrap align-center justify-center ">
          {data.images.map((img) => {
            return (
              <img
                key={img._id}
                src={img.url}
                alt={img._id}
                className={`${properties.property_image} mx-auto`}
              />
            );
          })}
        </div>
      </div>
    );
  });
  console.log(property.property_summary);
  return <>{agent_properties}</>;
};
export default PropertyView;
