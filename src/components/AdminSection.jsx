import React, { useState } from 'react';
import { Row, Col, Modal, Form, Card, Button } from 'react-bootstrap';
import Axios from 'axios';
import { API_URL } from '../utils/constants';

function ConfirmArchiveModal(props) {
	const handleConfirmation = async (busi) => {
		const url = `${API_URL}/businesses/${busi._id}`
		try {
			await Axios.delete(url)
				.then((res) => {
					console.log('Successfully archived business')
					console.log(res)
					props.onHide();
				});
		} catch (err) {
			console.log("Error while attempting archive");
			setErrMessage(err.response.data)
		}
	}

	return (
		<Modal show={props.show} onHide={props.onHide} size="md"  >
			<Modal.Header><h5>Are you sure you want to archive this business's profile?</h5></Modal.Header>
			<Modal.Body>
				<Row xs={1} className="g-2 p-1">
					<Col className=''>
						<Card>
							<Card.Body>
								<Card.Title> {props.busi.name} </Card.Title>
								<Card.Text> {props.busi.about} </Card.Text>
								<div className='text-muted' style={{ fontSize: 'smaller' }}>{props.busi._id}</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<p></p>
				<p>This is reversible but is annoying to reverse. Alternatively you can permanently delete stuff in MongoDB.</p>
				<Button onClick={() => handleConfirmation(props.busi)}>Confirm Profile Archive</Button>
			</Modal.Body>
		</Modal>
	)

}

function AdminSection({ partnerList }) {
	const [errMessage, setErrMessage] = useState('')
	const [showArchiveModal, setShowArchiveModal] = useState(false)
	const [archiveBusi, setArchiveBusi] = useState({})
	let name, about, website, logoUrl;

	const handleNewBusiness = async (e) => {
		e.preventDefault();
		const url = `${API_URL}/businesses/new`
		const info = { name, about, website, logoUrl }
		try {
			await Axios.post(url, info)
				.then((res) => {
					console.log('Successfully created business')
				});
		} catch (err) {
			console.log("Error while attempting business creation");

			setErrMessage(err.response)
		}
	}

	const confirmArchive = (busi) => {
		setArchiveBusi(busi)
		setShowArchiveModal(true)
	}

	return (<>
		<Card className="mx-auto" >
			<Card.Header> <h5> Create a new business profile </h5> </Card.Header>
			<Card.Body>
				<Form onSubmit={e => handleNewBusiness(e)}>
					<Form.Group className="mb-3" controlId="nameField">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" placeholder="" autoComplete=""
							onChange={(e) => name = (e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="aboutField">
						<Form.Label>About</Form.Label>
						<Form.Control type="text" placeholder="" autoComplete=""
							onChange={(e) => about = (e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="websiteField">
						<Form.Label>Website</Form.Label>
						<Form.Control type="text" placeholder="" autoComplete=""
							onChange={(e) => website = (e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="logoUrlField">
						<Form.Label>Logo URL</Form.Label>
						<Form.Control type="text" placeholder="" autoComplete=""
							onChange={(e) => logoUrl = (e.target.value)}
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Create
					</Button>
					<Form.Text className="text-muted">
						{`${errMessage}`}
					</Form.Text>
				</Form>
			</Card.Body>
		</Card>
		<br />
		<Card className="mx-auto" >
			<Card.Header> <h5> Archive businesses </h5> <p>Select a card to archive the business</p></Card.Header>
			<Row xs={1} md={3} className="g-2 p-1">
				{partnerList.map((partner, idx) => (
					<Col className='' key={partner._id}>
						<Card onClick={() => confirmArchive(partner)} className='clickable-card'>
							<Card.Body>
								<Card.Title> {partner.name} </Card.Title>
								<Card.Text> {partner.about} </Card.Text>
								<div className='text-muted' style={{ fontSize: 'smaller' }}>{partner._id}</div>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Card>
		<ConfirmArchiveModal show={showArchiveModal} onHide={() => setShowArchiveModal(false)} busi={archiveBusi}></ConfirmArchiveModal>
	</>)
}

export default AdminSection;