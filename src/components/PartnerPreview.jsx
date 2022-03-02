import React, {useState} from "react";
import {Link} from 'react-router-dom';
import {Card} from 'react-bootstrap';
const PartnerPreview = ({partnerInfo}) => {
  console.log(partnerInfo)
  const businessURL = "/business/" + partnerInfo._id;w
  const name = partnerInfo.name;


  return (
      <Card className="partner-preview">
        <h2>{name}</h2>
        <Link to={businessURL}>business</Link>
      </Card>
  );
};

export default PartnerPreview;
