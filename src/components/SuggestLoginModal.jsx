import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap"

const SuggestLoginModal = (props) => {

	return (
		<Modal show={props.show} onHide={props.onHide} size="sm" centered >
			<Modal.Body>{props.message}</Modal.Body>
		</Modal>

	);
};

export default SuggestLoginModal;
