import React, { useEffect, useState } from "react";

import { Row, Container, Col, Form } from "react-bootstrap";

import PartnerPreview from "./PartnerPreview.jsx";

import Axios from 'axios';
import { API_URL } from '../utils/constants';

const Partners = () => {
	const [partners, setPartners] = useState([]);
	const [searchResults, setSearchResults] = useState([])
	const [shortenResults, setShortenResults] = useState(true)
	const [shortList, setShortList] = useState([])

	let searchTerm = '';

	const searchPlaceholder = 'search our partners'

	const getPartnersData = async () => {
		const url = API_URL + '/businesses/search';
		try {
			await Axios.get(url).then(
				res => {
					setPartners(res.data);
					setSearchResults(res.data);
					setShortList(res.data.slice(0, 5))
				});
		} catch (err) {
			console.log("Error retrieving business list")
		}
	}

	useEffect(() => {
		getPartnersData();
	}, []);

	const searchPartners = (term) => {
		if (term === '') { searchTerm = ''; setShortenResults(true); }
		else { setShortenResults(false) }
		term = term.toLowerCase()
		searchTerm = term;
		let name, about;
		let results = partners.filter((busi, ix) => {
			name = busi.name.toLowerCase()
			about = busi.about.toLowerCase()
			return (name.includes(term) || about.includes(term))
		})
		setSearchResults(results)
	}

	const SeeMoreCard = () => {
		return (
			<Col className="cardPadding" >
				<div className="see-more-container clickable-card" onClick={() => setShortenResults(false)}>
					<i className="fa-solid fa-ellipsis fa-4x center-in-box"></i>
					<p className="see-more-bottom">See all partners</p>
				</div>
			</Col>
		)
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

			{
				shortenResults ? (
					searchResults.length > 0 ?
						(
							<Row xs={1} md={3} className="text-center">
								{shortList.map((info, idx) => (
									<PartnerPreview key={idx} partnerInfo={info} />
								))}
								{partners.length > 5 && <SeeMoreCard />}
							</Row>
						) : (
							<Row xl={12}><p className="text-center py-3">No businesses match search term</p></Row>
						)
				) : (
					(searchTerm == '' ? (
						searchResults.length > 0 ?
							(
								<Row xs={1} md={3} className="text-center">
									{searchResults.map((info, idx) => (
										<PartnerPreview key={idx} partnerInfo={info} />
									))}
								</Row>
							) : (
								<Row xl={12}><p className="text-center py-3">No businesses match search term</p></Row>
							))
						: <></>))

			}
		</>
	);
};

export default Partners;
