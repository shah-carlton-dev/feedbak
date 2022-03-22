import React, {useState} from "react";
import {Link} from 'react-router-dom';
import {Col, Card, Button} from 'react-bootstrap';
import "../css/NavbarContainer.scss";
import "../css/Home.scss";
const PartnerPreview = ({partnerInfo}) => {
  console.log(partnerInfo)
  const businessURL = "/business/" + partnerInfo._id;
  const name = partnerInfo.name;

  return (
    <Col className="cardPadding">
      <Card>
        <Card.Img variant="top" src="https://via.placeholder.com/345x160.png?345x160" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
          <Link to={businessURL}><Button className="button-grey" to={businessURL}>reviews</Button></Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PartnerPreview;
