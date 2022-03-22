import React from "react";
import { Modal, Form } from "react-bootstrap";
import "../css/NavbarContainer.scss";

const Login = () => {
  return (
    <>
      <div className="background-color">
        <Modal className="p-4">
            <Form>
                {/* login form to go here */}
            </Form>
        </Modal>
      </div>
    </>
  );
};

export default Login;
