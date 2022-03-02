import React from "react";

import { Row, Col } from "react-bootstrap";

import PartnerPreview from "./PartnerPreview.jsx";

const Partners = () => {
  const test = [{id: 123, name: "biz1"}, {id: 443, name: "biz2"}, {id: 866, name: "biz3"}, {id: 345, name: "biz4"}, ]
  return (
    <Row xs={1} md={2} className="">
      {test.map((info, idx) => (
        <Col className="py-3 px-5">
          <PartnerPreview key={idx} partnerInfo={info}/>
        </Col>
      ))}
    </Row>
  );
};

export default Partners;
