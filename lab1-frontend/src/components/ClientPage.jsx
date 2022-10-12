import axios from "axios";
import { Chart } from "chart.js";

import { useEffect, useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormCheck,
  FormControl,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Row,
  Table,
  ToggleButton,
  Tooltip,
} from "react-bootstrap";
import ChartPage from "./ChartPage";

export default function ClientPage(props) {
  let user = JSON.parse(localStorage.getItem("user"));
  async function getUserDevices(id) {
    await axios
      .get("/device/user", { params: { userId: id } })
      .then((res) => {
        setUserDevices(res.data);
      })
      .catch((err) => console.log(err));
  }
  async function getConsumptionByDateAndId(date, id) {
    await axios
      .get("/consumption", { params: { date: date, deviceId: id } })
      .then((res) => {
        setConsumption(res.data);
      })
      .catch((err) => console.log(err));
  }
  const [consumption, setConsumption] = useState([]);
  const [userDevices, setUserDevices] = useState([]);
  const [date, setDate] = useState();
  const [selectedDevice, setSelectedDevice] = useState();
  const [graph, setGraph] = useState(false);

  useEffect(() => {
    getUserDevices(user.id);
  }, []);

  useEffect(() => {
    date &&
      selectedDevice &&
      getConsumptionByDateAndId(date, selectedDevice.id);
  }, [selectedDevice, date]);

  function convertDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }
  return (
    <div className="d-flex flex-row">
      <Table striped bordered hover style={{ width: "25%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Devices</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userDevices.map((device, index) => {
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{device.description}</td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Show graph</Tooltip>}
                  >
                    <Button
                      variant="warning mx-2"
                      onClick={() => {
                        setSelectedDevice(device);
                      }}
                    >
                      <i className="fa-solid fa-chart-line fa-lg"></i>
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <FloatingLabel label="Date">
        <FormControl
          type="date"
          name="date"
          value={date}
          onChange={(event) => {
            setDate(convertDate(event.target.value));
          }}
        />
      </FloatingLabel>
      <FormCheck
        type="switch"
        label="Graph Type"
        onChange={() => {
          setGraph((prev) => !prev);
        }}
      />
      <div style={{ width: "50%" }}>
        <ChartPage graph={graph} data={consumption} device={selectedDevice} />
      </div>
    </div>
  );
}
