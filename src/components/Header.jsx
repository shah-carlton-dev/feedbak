import React from "react";

import "../css/Header.scss";

import SearchBar from "./SearchBar.jsx";

const Header = () => {
  return (
    <>
      <div className="header fill-dark px-4 py-1 pt-3">
        <h1 className="heading">Home</h1>
        <h4>Quick description</h4>
        <SearchBar></SearchBar>
      </div>
    </>
  );
};

export default Header;