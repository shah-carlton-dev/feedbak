import React from "react";

import { Form } from "react-bootstrap";

// import '../css/SearchBar.scss';

const SearchBar = () => {
  return (
    <>
      <div className="">
        <Form className="search-input">
          <Form.Group className="my-3" controlId="searchBar">
            <Form.Control type="text" placeholder="Search our partners" />
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default SearchBar;
