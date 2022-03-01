import React from "react";

import { Form } from "react-bootstrap";

// import '../css/SearchBar.scss';

const SearchBar = () => {
  return (
    <>
        <Form className="search-input">
          <Form.Group className="my-3" controlId="searchBar">
            <Form.Control type="text" placeholder="Search our partners" />
          </Form.Group>
        </Form>
    </>
  );
};

export default SearchBar;
