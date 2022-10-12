import axios from "axios";
import { useEffect, useState } from "react";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import AddNewDeviceModal from "./DeviceTab/AddNewDeviceModal";
import EditDeviceModal from "./DeviceTab/EditDeviceModal";

export default function DeviceTab(props) {
  async function getDevices() {
    await axios
      .get("/device")
      .then((res) => {
        props.setDevices(res.data);
      })
      .catch((err) => console.log(err));
  }

  async function deleteDevice(id) {
    await axios
      .delete("/device", { params: { deviceId: id } })
      .catch((err) => console.log(err));
  }

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState({
    address: null,
    description: null,
  });
  useEffect(() => {
    getDevices();
  }, []);

  function handleEdit(user) {
    setSelectedDevice(user);
    setShowEditModal(true);
    //show the modal with the completed fields
    //updateClient(user);
    //window.location.reload();
  }

  function handleDelete(id) {
    deleteDevice(id);
    window.location.reload();
  }

  return (
    <>
      <Button variant="primary mx-2" onClick={() => setShowAddModal(true)}>
        Add new device
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Address</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {props.devices &&
            props.devices.map((device) => {
              return (
                <tr key={device.id}>
                  <td>{device.id}</td>
                  <td>{device.description}</td>
                  <td>{device.address}</td>
                  <td>{device.owner}</td>

                  <td>
                    <OverlayTrigger
                      placement="left"
                      overlay={<Tooltip>Edit</Tooltip>}
                    >
                      <Button
                        onClick={() => {
                          handleEdit(device);
                        }}
                        variant="warning mx-2"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>Delete</Tooltip>}
                    >
                      <Button
                        onClick={() => {
                          handleDelete(device.id);
                        }}
                        variant="danger mx-2"
                      >
                        <i className="fa-solid fa-trash fa-lg"></i>
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <AddNewDeviceModal
        show={showAddModal}
        setShow={setShowAddModal}
        getDevices={getDevices}
      />
      <EditDeviceModal
        show={showEditModal}
        setShow={setShowEditModal}
        getDevices={getDevices}
        device={selectedDevice}
        setDevice={setSelectedDevice}
      />
    </>
  );
}
