import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Navbar,
  Row,
} from "react-bootstrap";
import SockJS from "sockjs-client";
import { over } from "stompjs";

export default function ChatPage() {
  let currentUser = JSON.parse(localStorage.getItem("user"));
  var stompClient = null;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState([
    { username: "Jimmy Johnson" },
    { username: "Clara Roberts" },
    { username: "Karl Grayson" },
    { username: "Bob Dylan" },
  ]);

  async function getUsers() {
    await axios
      .get("/user")
      .then((res) => {
        setUsers(
          res.data.filter((user) => user.username !== currentUser.username)
        );
      })
      .catch((err) => console.log(err));
  }

  async function send(message) {
    await axios.post("/chat", message).catch((err) => console.log(err));
  }

  useEffect(() => {
    getUsers();
    connect();
  }, []);

  function connect() {
    let Sock = new SockJS("http://localhost:8080/api/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  function onConnected() {
    stompClient.subscribe(
      "/user/" + currentUser.username + "/chat",
      onMessageReceived
    );
  }

  function onError(e) {
    console.log(e);
  }

  function onMessageReceived(payload) {
    var payloadData = JSON.parse(payload.body);
    console.log(payloadData);
    setMessages((prev) => {
      return [...prev, payloadData];
    });
  }

  function sendMessage(e) {
    let message = {
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      text: messageText,
    };
    setMessages((prev) => {
      return [...prev, message];
    });
    console.log(messages);
    send(message);
    setMessageText("");
    e.preventDefault();
  }
  function handleChange(e) {
    setMessageText(e.target.value);
  }
  function loadMessages() {
    setMessages(
      messages.filter(
        (msg) =>
          // !(msg.receiverId === currentUser.id || msg.senderId === currentUser.id)
          false
      )
    );
  }

  return (
    <div className="page" style={{ height: "100vh", overflowX: "hidden" }}>
      <h2>Logged in as {currentUser.username}</h2>
      <Row>
        <Col>
          <ListGroup>
            {users &&
              users.map((user, index) => {
                return (
                  <ListGroupItem
                    key={index}
                    action
                    onClick={() => {
                      setSelectedUser(user);
                      loadMessages(user);
                      setMessageText("");
                    }}
                  >
                    {user.username}
                  </ListGroupItem>
                );
              })}
          </ListGroup>
        </Col>
        <Col>
          {!!selectedUser ? (
            <Container>
              <div className="d-flex align-items-center justify-content-between">
                <h3 className="text-center py-3 d-inline">
                  Energy Consumption Tech Support
                </h3>
                <h6>Talking to {selectedUser.username}</h6>
              </div>
              <ul className="list-group" style={{ marginBottom: "60px" }}>
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <li className="list-group-item" key={index}>
                      {/* <strong>{msg.senderId}</strong> */}
                      <p>{msg.text}</p>
                    </li>
                  ))
                ) : (
                  <div className="text-center mt-5 pt-5">
                    <p className="lead text-center">Fetching Messages</p>
                  </div>
                )}
              </ul>
            </Container>
          ) : (
            <h1>Select a user to chat with</h1>
          )}
        </Col>

        <Navbar fixed="bottom">
          <Container>
            <Form
              className="w-100 d-flex justify-content-between align-items-center"
              onSubmit={sendMessage}
            >
              <FormGroup style={{ flex: 1 }}>
                <FormControl
                  disabled={!selectedUser}
                  value={messageText}
                  style={{ width: "100%" }}
                  required
                  type="text"
                  placeholder="Type Message here..."
                  onChange={handleChange}
                />
              </FormGroup>
              <Button variant="primary" type="submit">
                Send
              </Button>
            </Form>
          </Container>
        </Navbar>
      </Row>
    </div>
  );
}
