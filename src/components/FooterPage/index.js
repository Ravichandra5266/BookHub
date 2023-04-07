import {
  AiFillGoogleCircle,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

import "./index.css";

const FooterPage = () => (
  <div className="footer-container">
    <ul className="footer-items-container">
      <li className="footer-item ">
        <AiFillGoogleCircle className="footer-icon" />
      </li>
      <li className="footer-item ">
        <AiFillTwitterCircle className="footer-icon" />
      </li>

      <li className="footer-item ">
        <AiFillYoutube className="footer-icon" />
      </li>
      <li className="footer-item ">
        <AiFillInstagram className="footer-icon" />
      </li>
    </ul>
    <h1 className="footer-title">Contact Us</h1>
  </div>
);

export default FooterPage;
