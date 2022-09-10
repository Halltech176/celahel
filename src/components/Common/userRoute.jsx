import { useNavigate } from "react-router-dom";
const UserRoute = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="auth-container text-center">
      <div>
        <h1 className="auth-head">Site currently inaccessible <br/> for this user</h1>
        <h4 className="auth-text">
          Please login through the mobile App <button>Mobile app</button>
        </h4>
        <button onClick={() => navigate("/contact")} className="auth-button">
          contact us
        </button>
      </div>
      </div>
    </>
  );
};
export default UserRoute;
