import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Col, Card, Button, Image } from 'react-bootstrap';
import "../css/NavbarContainer.scss";
import "../css/Home.scss";

const PartnerPreview = ({ partnerInfo }) => {
	//   console.log(partnerInfo)
	const businessURL = "/business/" + partnerInfo._id;
	const name = partnerInfo.name;
	const logo = partnerInfo.logo;
	console.log(partnerInfo);
	return (
		<Col className="cardPadding">
			<Link to={businessURL}>
				<div className="imageBox align-items-center d-flex">
					<Image fluid src={logo} />
				</div>
			</Link>

			{/*<Card>
            <Card.Img variant="top" src={logo} />
            <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
          <Link to={businessURL}><Button className="button-grey" to={businessURL}>reviews</Button></Link>
        </Card.Body> 
      </Card> */}

		</Col>
	);
};

export default PartnerPreview;
