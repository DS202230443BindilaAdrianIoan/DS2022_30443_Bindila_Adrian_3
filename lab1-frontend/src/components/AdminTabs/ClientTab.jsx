import axios from "axios";
import { useEffect, useState } from "react";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import AddNewClientModal from "./ClientTab/AddNewClientModal";
import EditClientModal from "./ClientTab/EditClientModal";
import LinkDevicesModal from "./ClientTab/LinkDevicesModal";
export default function ClientTab(props) {
  async function getClients() {
    await axios
      .get("/user/clients")
      .then((res) => {
        props.setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }

  async function deleteClient(id) {
    await axios
      .delete("/user", { params: { userId: id } })
      .catch((err) => console.log(err));
  }

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState({
    username: null,
    password: null,
    role: "USER",
  });
  useEffect(() => {
    getClients();
  }, []);

  function handleEdit(user) {
    setSelectedClient(user);
    setShowEditModal(true);
    //show the modal with the completed fields
    //updateClient(user);
    //window.location.reload();
  }

  function handleDelete(id) {
    deleteClient(id);
    window.location.reload();
  }

  return (
    <>
      <Button variant="primary mx-2" onClick={() => setShowAddModal(true)}>
        Add new client
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.users &&
            props.users.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>
                    <OverlayTrigger
                      placement="left"
                      overlay={<Tooltip>Edit</Tooltip>}
                    >
                      <Button
                        onClick={() => {
                          handleEdit(user);
                        }}
                        variant="warning mx-2"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Delete</Tooltip>}
                    >
                      <Button
                        onClick={() => {
                          handleDelete(user.id);
                        }}
                        variant="danger mx-2"
                      >
                        <i className="fa-solid fa-trash fa-lg"></i>
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>Link devices</Tooltip>}
                    >
                      <Button
                        onClick={() => {
                          setShowLinkModal(true);
                        }}
                        variant="primary mx-2"
                      >
                        <i className="fa-solid fa-link fa-lg"></i>
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <AddNewClientModal
        show={showAddModal}
        setShow={setShowAddModal}
        getClients={getClients}
      />
      <EditClientModal
        show={showEditModal}
        setShow={setShowEditModal}
        client={selectedClient}
        setClient={setSelectedClient}
      />
      <LinkDevicesModal
        show={showLinkModal}
        setShow={setShowLinkModal}
        users={props.users}
        devices={props.devices}
      />
    </>
  );
}
