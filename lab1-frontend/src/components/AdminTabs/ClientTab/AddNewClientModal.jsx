import axios from "axios";
import { useState } from "react";
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

export default function AddNewClientModal(props) {
  async function sendClient(registration) {
    await axios
      .post("/register", registration)
      .catch((err) => console.log(err));
  }
  const defaultClient = {
    username: null,
    password: null,
    role: "USER",
  };
  const [client, setClient] = useState(defaultClient);
  function handleHide() {
    setClient(defaultClient);
    props.setShow(false);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setClient((prevRegister) => {
      return {
        ...prevRegister,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    sendClient(client);
    setClient(defaultClient);
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
              value={client.username}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel label="Password">
            <FormControl
              type="password"
              placeholder="Password"
              name="password"
              value={client.password}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FormSelect
            name="role"
            value={client.role}
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
            Add account
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
