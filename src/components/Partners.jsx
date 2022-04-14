import React, {useEffect, useState} from "react";

import { Row, Container, Col} from "react-bootstrap";

import PartnerPreview from "./PartnerPreview.jsx";
import SearchBar from "./SearchBar";

import Axios from 'axios';
import {API_URL} from '../utils/constants';

const Partners = () => {
  const [partners, setPartners] = useState([]);

  const getPartnersData = async () => {
    const url = API_URL + '/businesses/search';
    try {
      await Axios.get(url).then(res => {setPartners(res.data);});
    } catch (err) {
      console.log("Error retrieving business list")
    }
  }
  useEffect(() => {
    getPartnersData();
  }, []);

  return (
    <>
    <Row>
      <Col></Col>
      <Col md={6}>
        <SearchBar/>
      </Col>
      <Col></Col>
    </Row>
    <Row xs={1} md={3} className="">
      {partners.map((info, idx) => (
          <PartnerPreview key={idx} partnerInfo={info}/>
      ))}
    </Row>
    </>
  );
};

export default Partners;
