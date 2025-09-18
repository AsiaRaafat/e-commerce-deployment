import "./Footer.scss";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';

import {
  FaEnvelope,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
export default function Footer() {
  return (
    <div>
      <div className="col-12 ">
        <div className=" footer  ">
          <div className=" div1 container d-flex ">
            <div className="LOGO">
           <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo"  className="LOGO" />
          </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div>
              <ul>
                <li> <h4> Accounts</h4><Link to=""> My Account</Link></li>    
                <li><Link to="">Check Order</Link> </li>   
              </ul>
            </div>

            <div>
              <ul>
                <h4>About Us</h4>
                <li><Link to="/"> Home </Link></li>
                <li><Link to="/MakeUp"> MakeUp</Link></li>
                <li><Link to="/SkinCare"> SkinCare</Link></li>   
              </ul>
            </div>
            <div>
              <ul>
                <h4> Contact Us</h4>
                <li><FaEnvelope /> Email</li>
                <li> <FaTwitter /> Twitter</li>
                <li> <FaYoutube /> Youtube</li>
                 <li><FaLinkedin /> Linkedin</li>
                <li> <FaFacebook /> Facebook </li>
              </ul>
            </div>
            <div>
              <ul>
                <h4>LEGAL</h4>
                <li>terms andconditions of sale</li>
                <li>Privacy Notice</li>
                <li>Do Not sell My Personal information</li>
                <li> Cookie Privacy </li>
                <li> Terms of Use </li>
              </ul>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}
