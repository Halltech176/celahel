import { useNavigate } from "react-router-dom";
import success from "./../../Assets/Success.png";
const InactiveAgent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="inactive-container">
        <div className="inactive-badge">
          <img src={success} className="success_badge" alt="successBagde" />
          <h2>Account Verified Successfully</h2>
        </div>

        <h1>You will notified when your account is activated</h1>
        <button
          onClick={() => navigate("/")}
          className="verify-btn my-5 bg-success text-white p-2 px-3"
        >
          Go TO Home
        </button>
      </div>
    </>
  );
};

export default InactiveAgent;
