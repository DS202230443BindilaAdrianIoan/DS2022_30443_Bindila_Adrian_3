import axios from "axios";
import { useState } from "react";
import { Button, FloatingLabel, FormControl, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  async function sendLogin(login) {
    await axios
      .post("/login", login)
      .then((res) => {
        let user = res.data;
        props.setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        if (user.role === "USER") {
          navigator("/client");
        } else if (user.role === "ADMIN") {
          navigator("/admin");
        }
      })
      .catch((err) => console.log(err));
  }

  const navigator = useNavigate();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setLogin((prevLogin) => {
      return {
        ...prevLogin,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    sendLogin(login);
    setLogin({
      username: "",
      password: "",
    });
    event.preventDefault();
  }
  return (
    <div className="form-signin text-center">
      <i className="fa-solid fa-user fa-4x"></i>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel label="Username">
          <FormControl
            type="text"
            placeholder="Username"
            name="username"
            value={login.username}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel label="Password">
          <FormControl
            type="password"
            placeholder="Password"
            name="password"
            value={login.password}
            onChange={handleChange}
          />
        </FloatingLabel>
        <Button className="w-100 btn btn-lg btn-warning" type="submit">
          Sign in
        </Button>
        <Button
          className="w-100 btn btn-lg btn-warning my-2"
          onClick={() => navigator("/")}
        >
          Back
        </Button>
      </Form>

      <p className="mt-5 mb-3 text-muted">© Adrian Bîndilă 2022</p>
    </div>
  );
}
