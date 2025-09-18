
import "./NavBar.scss";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { GrCart } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';

function NavBar() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleCartClick = () => {
    navigate("/Cart");
  };

  return (
    <Navbar expand="lg" className="bg-white fixed-top">
      <Container>
        <Navbar.Brand>
          <NavLink to="/">
          <img src={logo} alt="logo" className="logo-img" />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav mx-auto gap-3">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}
                 to="/" > HOME </NavLink>
                 </li>
                 
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}
                 to="/SpecialOffers"> Special Offers </NavLink>
                </li>
              
            <li className="nav-item">
              <NavLink className={({ isActive }) =>  isActive ? "nav-link-active" : "nav-link"}
                to="/MakeUp"> MAKE UP</NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}
                to="/SkinCare">SKIN CARE </NavLink>
            </li>
             
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}
                to="/Perfumes" >  PERFUMES </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <DropdownButton variant="light" id="user-dropdown" title={<FaRegUser />} className="me-3" >
              <Dropdown.Item as={Link} to="/login">LogIn</Dropdown.Item>
              <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
             <Dropdown.Item as={Link} to="/Profile"> My Profile </Dropdown.Item>
            </DropdownButton>
           
            <div className="icon position-relative" onClick={handleCartClick} >
             <GrCart />
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems.length}
                </span>
              )}
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

