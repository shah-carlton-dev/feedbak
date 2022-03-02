import React, {useEffect, useState} from "react";

import { Row, Col } from "react-bootstrap";

import PartnerPreview from "./PartnerPreview.jsx";

import Axios from 'axios';
import {API_URL} from '../utils/constants';

const Partners = () => {
  const [partners, setPartners] = useState([]);

  const getPartnersData = async () => {
    const url = API_URL + '/businesses/search';
    try {
      await Axios.get(url).then(res => {setPartners(res.data);});
    } catch (err) {
      console.log("error retrieving business list")
    }
  }
  useEffect(() => {
    getPartnersData();
  }, []);

  // const test = [{id: 123, name: "biz1"}, {id: 443, name: "biz2"}, {id: 866, name: "biz3"}, {id: 345, name: "biz4"}, ]
  return (
    <Row xs={1} md={2} className="">
      {partners.map((info, idx) => (
        <Col key={idx} className="py-3 px-5">
          <PartnerPreview key={idx} partnerInfo={info}/>
        </Col>
      ))}
    </Row>
  );
};

export default Partners;
