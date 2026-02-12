import { Link } from "react-router-dom";

export default function RegisterSuccess() {
  return (
    <>
      <h2>Registration Successful ✅</h2>
      <Link to="/login">Go to Login</Link>
    </>
  );
}
