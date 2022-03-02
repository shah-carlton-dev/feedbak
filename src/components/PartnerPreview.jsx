import React from "react";
import {Link} from 'react-router-dom';
import {Card} from 'react-bootstrap';

const PartnerPreview = (partnerInfo) => {
  const businessURL = "/business/" + partnerInfo.partnerInfo.id;
  const name = partnerInfo.partnerInfo.name;
  return (
      <Card className="partner-preview">
        <h2>{name}</h2>
        <Link to={businessURL}>business</Link>
      </Card>
  );
};

export default PartnerPreview;
