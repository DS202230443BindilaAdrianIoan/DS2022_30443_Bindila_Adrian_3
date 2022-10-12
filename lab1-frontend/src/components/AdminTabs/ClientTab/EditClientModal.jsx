import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  FormControl,
  FormSelect,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";

export default function EditClientModal(props) {
  async function editClient(client) {
    await axios.put("/user", client).catch((err) => console.log(err));
  }

  const defaultClient = {
    username: null,
    password: null,
    role: "USER",
  };

  function handleHide() {
    props.setClient(defaultClient);
    props.setShow(false);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    props.setClient((prevRegister) => {
      return {
        ...prevRegister,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    editClient(props.client);
    event.preventDefault();
    handleHide();
    window.location.reload();
  }
  return (
    <Modal show={props.show} onHide={handleHide}>
      <ModalHeader closeButton>
        <ModalTitle>Add a new account!</ModalTitle>
      </ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FloatingLabel label="Username">
            <FormControl
              type="text"
              placeholder="Username"
              name="username"
              value={props.client.username}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel label="Password">
            <FormControl
              type="text"
              placeholder="Password"
              name="password"
              value={props.client.password}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FormSelect
            name="role"
            value={props.client.role}
            onChange={handleChange}
            disabled
          >
            <option>Role</option>
            <option value="USER" selected>
              User
            </option>
            <option value="ADMIN">Admin</option>
          </FormSelect>
        </ModalBody>
        <ModalFooter>
          <Button variant="success" type="submit">
            Edit account
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
