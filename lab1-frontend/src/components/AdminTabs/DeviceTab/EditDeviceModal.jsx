import axios from "axios";
import { Button, FloatingLabel, Form, FormControl, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";

export default function EditDeviceModal(props){
    async function editDevice(device) {
        await axios.put("/device", device).catch((err) => console.log(err));
      }
    
      const defaultDevice = {
        address: null,
        description: null,
      };
    
      function handleHide() {
        props.setDevice(defaultDevice);
        props.setShow(false);
      }
      function handleChange(event) {
        const { name, value } = event.target;
        props.setDevice((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      }
      function handleSubmit(event) {
        editDevice(props.device);
        event.preventDefault();
        handleHide();
        window.location.reload();
      }
      return (
        <Modal show={props.show} onHide={handleHide}>
          <ModalHeader closeButton>
            <ModalTitle>Edit the current device!</ModalTitle>
          </ModalHeader>
          <Form onSubmit={handleSubmit}>
            <ModalBody>
            <FloatingLabel label="Description">
                <FormControl
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={props.device.description}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <FloatingLabel label="Address">
                <FormControl
                  type="address"
                  placeholder="Address"
                  name="address"
                  value={props.device.address}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </ModalBody>
            <ModalFooter>
              <Button variant="success" type="submit">
                Edit device
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      );
}