import React, { useContext } from "react";

import Header from "./Header.jsx";
import PartnerPreview from "./PartnerPreview.jsx";
import Partners from "./Partners.jsx";

import "../css/Home.scss";
import UserContext from "../utils/UserContext.js";

const Home = () => {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <div>
      {/* <Header></Header> */}
      <div className="partnersPadding">
        <Partners />
      </div>
    </div>
  );
};

export default Home;
