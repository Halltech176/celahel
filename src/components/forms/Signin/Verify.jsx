import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signup, login, Properties } from "../../../Redux/actions";
import { userCredential } from "../../../Redux/slices/userStates";
import { ToastContainer, Zoom } from "react-toastify";
import { ErrorNotification } from "../../Common/ErrorToast";
import "react-toastify/dist/ReactToastify.css";
import "./verify.css";
const Verify = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {properties} = useSelector((state) => state);
  const loading = properties.loading
  console.log(properties, loading)
  const sendToken = async () => {
    try {
      const sentToken = {
        token,
      };
      const response = await axios.post(
        "https://celahl.herokuapp.com/api//auth/verify-email-account",
        sentToken
      );

      if (response.status === 200 || response.status === 201) {
        window.localStorage.setItem("user", JSON.stringify(response.data.data));
      const properties = await  dispatch(Properties(response.data.data));
      const credentials = await  dispatch(userCredential(response.data.data));
      if (!loading) {
        navigate("/properties");
      }
      console.log(properties)
   
   
      }
      console.log(response);
    } catch (err) {
      ErrorNotification(err.response.data.message);
      console.log(err.response.data.message);
    }
  };
  return (
    <>
      <ToastContainer transition={Zoom} autoClose={1500} />
      <h4 className="verify-heading">
        Enter the verification <br /> token sent to your email
      </h4>
      <div className="verify-container">
        <label className="verify-label">Enter token:</label>
        <input
          type="number"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="verify-input"
        />
        <button className="verify-button" onClick={sendToken}>
          Continue
        </button>
        <button className="verify-btn" onClick={() => navigate(-1)}>Back</button>
      </div>
    </>
  );
};
export default Verify;
