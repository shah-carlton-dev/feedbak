import React from "react";

import { Row, Col } from "react-bootstrap";

import PartnerPreview from "./PartnerPreview.jsx";

const Partners = () => {
  return (
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col>
          <PartnerPreview>

          </PartnerPreview>
        </Col>
      ))}
    </Row>
  );
};

export default Partners;
