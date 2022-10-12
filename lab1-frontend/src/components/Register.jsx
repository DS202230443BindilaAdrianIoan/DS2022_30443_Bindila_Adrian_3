import axios from "axios";
import { useState } from "react";
import { Button, FloatingLabel, FormControl, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Register() {
  async function sendRegistration(registration) {
    await axios
      .post("/register", registration)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  const navigator = useNavigate();
  const [register, setRegister] = useState({
    username: "",
    password: "",
    role:"USER"
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setRegister((prevRegister) => {
      return {
        ...prevRegister,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    sendRegistration(register);
    setRegister({
      username: "",
      password: "",
      role:"USER"
    });
    navigator("/login");
    event.preventDefault();
  }
  return (
    <div className="form-signin text-center">
      <i className="fa-solid fa-user fa-4x"></i>
      <h1 className="h3 mb-3 fw-normal">Please register</h1>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel label="Username">
          <FormControl
            type="text"
            placeholder="Username"
            name="username"
            value={register.username}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel label="Password">
          <FormControl
            type="password"
            placeholder="Password"
            name="password"
            value={register.password}
            onChange={handleChange}
          />
        </FloatingLabel>
        <Button className="w-100 btn btn-lg btn-warning" type="submit">
          Register
        </Button>
        <Button
          className="w-100 btn btn-lg btn-warning my-2"
          onClick={() => navigator("/")}
        >
          Back
        </Button>
        <p className="mt-5 mb-3 text-muted">© Adrian Bîndilă 2022</p>
      </Form>
    </div>
  );
}
