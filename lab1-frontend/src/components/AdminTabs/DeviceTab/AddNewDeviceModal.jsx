import axios from "axios";
import { useState } from "react";
import { Button, FloatingLabel, Form, FormControl, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";

export default function AddNewDeviceModal(props){
    async function sendDevice(device) {
        await axios
          .post("/device", device)
          .catch((err) => console.log(err));
      }
      const defaultDevice = {
        address: null,
        description: null,
      };
      const [device, setDevice] = useState(defaultDevice);
      function handleHide() {
        setDevice(defaultDevice);
        props.setShow(false);
      }
      function handleChange(event) {
        const { name, value } = event.target;
        setDevice((prevRegister) => {
          return {
            ...prevRegister,
            [name]: value,
          };
        });
      }
      function handleSubmit(event) {
        sendDevice(device);
        setDevice(defaultDevice);
        event.preventDefault();
        handleHide();
        window.location.reload();
      }
      return (
        <Modal show={props.show} onHide={handleHide}>
          <ModalHeader closeButton>
            <ModalTitle>Add a new device!</ModalTitle>
          </ModalHeader>
          <Form onSubmit={handleSubmit}>
            <ModalBody>
              <FloatingLabel label="Description">
                <FormControl
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={device.description}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <FloatingLabel label="Address">
                <FormControl
                  type="address"
                  placeholder="Address"
                  name="address"
                  value={device.address}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </ModalBody>
            <ModalFooter>
              <Button variant="success" type="submit">
                Add device
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      );
}