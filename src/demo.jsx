import { useState } from "react";
const Demo = () => {
  const [image, setImage] = useState([]);
  const [file, setFile] = useState("");
  const handleChange = (e) => {
    setImage(e.target.files);
  };

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("file", file);

    Array.from(image).forEach((item) => {
      formData.append("filename", item?.name);
    });
    console.log(formData);
  };

  console.log(image);
  return (
    <>
      <h1>File upload</h1>
      <div>
        {Array.from(image).map((item, index) => {
          return (
            <img
              key={index}
              width={100}
              height={100}
              src={item ? URL.createObjectURL(item) : null}
            />
          );
        })}
      </div>

      <input type="file" onChange={handleChange} multiple />
      <button onClick={handleSubmit}>submit</button>
    </>
  );
};
export default Demo;
