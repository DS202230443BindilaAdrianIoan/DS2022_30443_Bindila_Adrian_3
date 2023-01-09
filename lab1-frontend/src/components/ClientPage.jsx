import axios from "axios";

import { useEffect, useState } from "react";
import {
  Button,
  FloatingLabel,
  FormCheck,
  FormControl,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import SockJS from "sockjs-client";
import ChartPage from "./ChartPage";
import { over } from "stompjs";
import { useNavigate } from "react-router-dom";

export default function ClientPage(props) {
  const navigator = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));
  var stompClient = null;

  function connect() {
    let Sock = new SockJS("http://localhost:8080/api/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  function onConnected() {
    stompClient.subscribe("/user/" + user.username + "/notify", onMessage);
  }

  function onError(err) {
    console.log(err);
  }

  function onMessage(payload) {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    alert(
      "Consumption limit has been exceeded for device with name: " +
        payloadData.deviceName
    );
  }

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
    connect();
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
    <>
      <div className="d-flex flex-row">
        <Table
          striped
          bordered
          hover
          style={{ height: "25%", width: "30%" }}
          className="m-5"
        >
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
        <div className="m-5">
          <FloatingLabel label="Date" className="my-5">
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
            className="my-5"
            type="switch"
            label="Graph Type"
            onChange={() => {
              setGraph((prev) => !prev);
            }}
          />
          <Button variant="warning mx-2" onClick={() => navigator("/chat")}>
          Support
        </Button>
        </div>
        <div style={{ width: "50%" }} className="m-lg-5">
          <ChartPage graph={graph} data={consumption} device={selectedDevice} />
        </div>
      </div>
    </>
  );
}
