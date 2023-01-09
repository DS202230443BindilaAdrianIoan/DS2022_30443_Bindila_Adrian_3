import { useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ClientTab from "./AdminTabs/ClientTab";
import DeviceTab from "./AdminTabs/DeviceTab";
import ChartPage from "./ChartPage";
import ChatPage from "./ChatPage";

export default function AdminPage() {
  const [key, setKey] = useState(localStorage.getItem("key") || "client");
  const [users, setUsers] = useState();
  const [devices, setDevices] = useState();
  const navigator = useNavigate();
  return (
    <div className="m-lg-5">
      <Button
        variant="warning mx-2"
        onClick={() => {
          navigator("/chat");
        }}
      >
        Chat
      </Button>
      <Tabs
        activeKey={key}
        className="mb-3"
        onSelect={(k) => {
          setKey(k);
          localStorage.setItem("key", k);
        }}
      >
        <Tab eventKey="clients" title="Client">
          <ClientTab users={users} setUsers={setUsers} devices={devices} />
        </Tab>
        <Tab eventKey="devices" title="Devices">
          <DeviceTab devices={devices} setDevices={setDevices} />
        </Tab>
      </Tabs>
    </div>
  );
}
