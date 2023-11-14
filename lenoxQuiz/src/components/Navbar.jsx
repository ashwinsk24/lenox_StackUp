import LogoutBtn from "./LogoutBtn";
import "../../src/App.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <p className="logo">Quiz App </p>
      <LogoutBtn />
    </div>
  );
};

export default Navbar;
