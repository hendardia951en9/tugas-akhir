import React from "react";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//css
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <section>
        <img src="/assets/images/logo.svg" alt="" />
        <ul>
          <li className="title">company</li>
          <li>about us</li>
          <li>contact us</li>
          <li>partner with rift</li>
        </ul>
        <ul>
          <li className="title">resources</li>
          <li>help</li>
          <li>contact support</li>
          <li>report abuse</li>
        </ul>
        <ul>
          <p>
            "so easy to use and makes it <br /> possible for a small business to
            get up and running"
          </p>
          <li className="title">
            -anne marie, mullingar, county westmeath, ireland
          </li>
        </ul>
      </section>
      <section>
        <div>
          <span className="copyright">
            copyright 2021 rift inc. all rights reserved.
          </span>
          &nbsp;
          <span>privacy policy</span> | <span>terms of use</span> |{" "}
          <span>data processing</span>
        </div>
        <div className="icon-pack">
          <FontAwesomeIcon icon={faFacebookF} />
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faLinkedinIn} />
          <FontAwesomeIcon icon={faTwitter} />
        </div>
      </section>
    </footer>
  );
};

export default Footer;
