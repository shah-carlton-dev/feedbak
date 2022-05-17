import React, { useEffect, useState } from "react";

import { Row, Container, Col, Form } from "react-bootstrap";

import PartnerPreview from "./PartnerPreview.jsx";

import Axios from 'axios';
import { API_URL } from '../utils/constants';

const Partners = () => {
	const [partners, setPartners] = useState([]);
	const [searchResults, setSearchResults] = useState([])

	const searchPlaceholder = 'search our partners'

	const getPartnersData = async () => {
		const url = API_URL + '/businesses/search';
		try {
			await Axios.get(url).then(res => { setPartners(res.data); setSearchResults(res.data) });
		} catch (err) {
			console.log("Error retrieving business list")
		}
	}

	useEffect(() => {
		getPartnersData();
	}, []);

	const searchPartners = (term) => {
		term = term.toLowerCase()
		let name, about;
		let results = partners.filter((busi, ix) => {
			name = busi.name.toLowerCase()
			about = busi.about.toLowerCase()

			return (name.includes(term) || about.includes(term))
		})
		setSearchResults(results)
	}

	return (
		<>
			<Row>
				<Col></Col>
				<Col md={6}>
					<Form className="search-input">
						<Form.Group className="search-bar-margin" controlId="searchBar">
							<Form.Control className="" type="text"
								placeholder={searchPlaceholder}
								onFocus={(e) => e.target.placeholder = ''}
								onBlur={(e) => e.target.placeholder = searchPlaceholder}
								onChange={e => searchPartners(e.target.value)}
							/>
						</Form.Group>
					</Form>
				</Col>
				<Col></Col>
			</Row>
			<Row xs={1} md={3} className="text-center">
				{
					searchResults.length > 0 ? (
						searchResults.map((info, idx) => (
							<PartnerPreview key={idx} partnerInfo={info} />
						))
					) : (
						<Col xl={12}>No businesses match search term</Col>
					)
				}
			</Row>
		</>
	);
};

export default Partners;
