import React from "react";

import { Form } from "react-bootstrap";

// import '../css/SearchBar.scss';

const SearchBar = () => {
  return (
    <>
        <Form className="search-input">
          <Form.Group className="search-bar-margin" controlId="searchBar">
            <Form.Control className="" type="text" placeholder="search partners" />
          </Form.Group>
        </Form>
    </>
  );
};

export default SearchBar;
