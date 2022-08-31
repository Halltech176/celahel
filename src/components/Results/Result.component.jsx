import React from "react";
import success from '../../Assets/Success.png'

const Result = () => {
  return (
    <div>
      <div className="d-flex flex-column p-3 justify-content-center align-items-center">
        <img src={success} alt=""/>
        <p className="lead my-3 h3">Done</p>
        <button className="btn btn-primary btn-block p-3 rounded-lg">Okay</button>
      </div>
    </div>
  );
};

export default Result;
