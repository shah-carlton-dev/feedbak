import React, { useContext, useState } from "react";
import Partners from "./Partners.jsx";
import LoginSignupModal from './LoginSignupModal'

import "../css/Home.scss";
import UserContext from "../utils/UserContext.js";

import header_design from '../images/header_design.png'

import { Container, Row, Col, Button } from "react-bootstrap"

const Home = () => {
	const { userData, setUserData } = useContext(UserContext);
	const [showModal, setShowModal] = useState(false);

	const howItWorks = [
		"Get started on Feedbak by either joining or signing into your existing account",
		"Search our partnered businesses to find the one you want to leave Feedbak for",
		"Leave a Feedbak! This is a suggestion for something the business can do to be better. Maybe you think your favorite store should offer free wifi or your favorite restaurant should change their lighting or expand their menu to offer a certain dish. You are the customer and you know best so share your ideas!",
		"See someone else's Feedbak you love? Give it an upvote! The more engagement Feedbaks receive the more likely the business owner will see it and select it as a winner!",
		"If business owners love a Feedbak it will become a Featured Feedbak and the author will be contacted with their reward via the email they used to create their account"
	]

	return (
		<>
			<div className="">
				<div className="home-header">
					<Container >
						<Row className="" >
							<Col md={7} lg={6}>
								<div className="home-header-title">
									Leave suggestions for your favorite businesses and win money &#128184;
								</div>
								<div className="home-header-subtitle">
									Win cash and business rewards
								</div>
								{
									userData?.user?._id ?
										<></> :
										<Button className="home-header-button" onClick={() => setShowModal(true)}>
											Get Feedbak
										</Button>
								}
								<div>

								</div>
							</Col>
							<Col md={5} lg={6} className="home-header-img-container my-auto text-center">
								<img src={header_design} id="header-design"></img>
							</Col>
						</Row>
						<Row>
							<Col className="home-header-bottom-text text-center">
								Get Started Today to Start Helping your favorite businesses improve
							</Col>
						</Row>
					</Container>
				</div>
				<div className="partnersPadding">
					<Partners />
				</div>

				<div className="how-it-works partnersPadding">
					<h1 className="how-works-title text-center">How Feedbak Works</h1>
					<Container className="">
						{
							howItWorks.map((li, ix) => (
								<Row className="mb-2">
									<Col lg={1} className="">
										<div className="number-circle mx-auto"><p className="how-works-number">{ix + 1}</p></div>
									</Col>
									<Col lg={11} >
										<div className="how-works-li">{li}</div>
									</Col>
								</Row>
							))
						}
					</Container>
				</div>

				<div className="partnersPadding">
					<p className="text-center mx-5">
						If you are a business that wants to partner with us or a Feedbak user that doesn’t see their favorite business and wants us to reach out to them, please contact us at <a href="mailto:feedbak.launch@gmail.com">feedbak.launch@gmail.com</a>
					</p>
				</div>

			</div>
			<LoginSignupModal
				show={showModal}
				open={2}
				onHide={(x) => setShowModal(false)}
			/>
		</>
	);
};

export default Home;
