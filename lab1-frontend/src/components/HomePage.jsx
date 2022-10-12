import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigator = useNavigate();

  return (
    <div className="form-signin text-center">
      <h1>Welcome to your Energy Monitoring station!</h1>

      <i className="fa-regular fa-lightbulb fa-5x"></i>
      <Button
        className="w-100 btn btn-lg btn-warning my-5"
        onClick={() => navigator("/login")}
      >
        Login
      </Button>
      <Button
        className="w-100 btn btn-lg btn-warning"
        onClick={() => navigator("/register")}
      >
        Register
      </Button>
      <p className="mt-5 mb-3 text-muted">© Adrian Bîndilă 2022</p>

    </div>
  );
}
