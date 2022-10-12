import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";

export default function LinkDevicesModal(props) {
  async function createLink(link) {
    await axios.put("/user/map",link).catch((err) => console.log(err));
  }
  function handleHide() {
    // props.setClient(defaultClient);
    props.setShow(false);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setLink((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    createLink(link);
    event.preventDefault();
    handleHide();
    window.location.reload();
  }
  const [link, setLink] = useState({
    userId: null,
    deviceId: null,
  });

  return (
    <>
      <Modal show={props.show} onHide={handleHide}>
        <ModalHeader closeButton>
          <ModalTitle>Link a user and their device!</ModalTitle>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <FormLabel>User</FormLabel>
            <FormSelect
              name="userId"
              value={link.userId}
              onChange={(e) => {
                const { name, value } = e.target;
                setLink((prev) => {
                  return {
                    ...prev,
                    [name]: value,
                  };
                });
              }}
            >
              <option></option>
              {props.users &&
                props.users.map((user, index) => {
                  return (
                    <option key={index} value={props.users[index].id}>
                      {user.username}
                    </option>
                  );
                })}
            </FormSelect>
            <FormLabel>Device</FormLabel>
            <FormSelect
              name="deviceId"
              value={link.deviceId}
              onChange={handleChange}
            >
              <option></option>
              {props.devices &&
                props.devices.map((device, index) => {
                  return (
                    <option key={index} value={props.devices[index].id}>
                      {device.description}
                    </option>
                  );
                })}
            </FormSelect>
          </ModalBody>
          <ModalFooter>
            <Button variant="warning" type="submit">
              Link
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
