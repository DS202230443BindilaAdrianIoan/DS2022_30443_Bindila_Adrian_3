import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ClientTab from "./AdminTabs/ClientTab";
import DeviceTab from "./AdminTabs/DeviceTab";

export default function AdminPage() {
  const [key, setKey] = useState(localStorage.getItem("key")||"client");
  const [users, setUsers]=useState();
  const [devices,setDevices]=useState();
  return (
    <div className="m-lg-5">
      <Tabs
        activeKey={key}
        className="mb-3"
        onSelect={(k) => {
          setKey(k);
          localStorage.setItem("key", k);
        }}
      >
        <Tab eventKey="clients" title="Client">
          <ClientTab users={users} setUsers={setUsers} devices={devices}/>
        </Tab>
        <Tab eventKey="devices" title="Devices">
          <DeviceTab devices={devices} setDevices={setDevices}/>
        </Tab>
      </Tabs>
    </div>
  );
}
