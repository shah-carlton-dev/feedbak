import React, { useContext } from "react";
import Partners from "./Partners.jsx";

import "../css/Home.scss";
import UserContext from "../utils/UserContext.js";

const Home = () => {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <div className="background-color">
      <div className="partnersPadding">
        <Partners />
      </div>
    </div>
  );
};

export default Home;
