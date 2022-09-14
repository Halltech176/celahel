import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Properties, User } from "../../../Redux/actions";
import { userCredential } from "../../../Redux/slices/userStates";
import { ToastContainer, Zoom } from "react-toastify";
import { ErrorNotification } from "../../Common/ErrorToast";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Common/Loader";
import "./verify.css";
const Verify = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userprofile);
  // const val = useSelector((state) => state);
  console.log(user);
  // const loading = properties.loading;

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
        // window.localStorage.setItem("user", JSON.stringify(response.data.data));

        await dispatch(User());
        navigate("/activate-agent");

        console.log(response.data);
      }
      console.log(response);
    } catch (err) {
      ErrorNotification(err.response.data.message);
      console.log(err.response.data.message);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
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
            <button className="verify-btn" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Verify;
