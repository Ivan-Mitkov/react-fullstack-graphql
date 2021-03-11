import React from "react";
import RequestReset from "../components/RequestPasswordReset";
import Reset from "../components/Reset";

const ResetPage = ({ query }) => {
  if (!query?.token) {
    return (
      <div>
        Sorry you must suply token
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>RESET YOUR PASSWORD</p>
      <Reset token={query.token}/>
    </div>
  );
};

export default ResetPage;
