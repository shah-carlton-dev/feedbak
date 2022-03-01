import React from "react";

import { Row, Col } from "react-bootstrap";

import PartnerPreview from "./PartnerPreview.jsx";

const Partners = () => {
  return (
    <Row xs={1} md={2} className="">
      {Array.from({ length: 4 }).map((info, idx) => (
        <Col className="py-3 px-5">
          <PartnerPreview partnerInfo={info}/>
        </Col>
      ))}
    </Row>
  );
};

export default Partners;
