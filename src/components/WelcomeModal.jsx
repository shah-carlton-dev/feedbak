import React, { useState } from "react"

import { Modal, Button } from "react-bootstrap";

function WelcomeModal({ show, onHide }) {
	// const [open, setOpen] = useState(props.open);

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Body>
				<h3>Welcome!</h3>
				<p>Congrats on joining the Feedbak community! Feel free to browse the businesses and leave Feedbak for any businesses you've visited. You can engage with others' feedbak by voting on it.</p>
				<p>Enjoy!</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={onHide}>
					Awesome, thanks!
				</Button>
			</Modal.Footer>
		</Modal >
	);
}

export default WelcomeModal;