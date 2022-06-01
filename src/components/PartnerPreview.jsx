import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Col, Card, Button, Image } from 'react-bootstrap';
import "../css/NavbarContainer.scss";
import "../css/Home.scss";

const PartnerPreview = ({ partnerInfo }) => {
	const businessURL = "/business/" + partnerInfo._id;
	const name = partnerInfo.name;
	const logo = partnerInfo.logo;
 
	return (
		<Col className="cardPadding">
			<Link to={businessURL}>
				<div className="imageBox align-items-center d-flex">
					<Image fluid className="image-not-bigger-than-parent" src={logo} />
				</div>
			</Link>

		</Col>
	);
};

export default PartnerPreview;
