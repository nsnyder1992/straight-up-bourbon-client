//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faInstagram,
  faFacebookF,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons/";

//styles
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="follow-us">
        <a href="https://www.youtube.com/c/StraightUpBourbon" target="blank">
          <FontAwesomeIcon className="follow-icons" icon={faYoutube} />
        </a>
        <a href="https://www.instagram.com/straight_up_bourbon/" target="blank">
          <FontAwesomeIcon className="follow-icons" icon={faInstagram} />
        </a>
        <a
          href="https://www.facebook.com/groups/705717763693659"
          target="blank"
        >
          <FontAwesomeIcon className="follow-icons" icon={faFacebookF} />
        </a>
        {/* <a href="" target="blank">
          <FontAwesomeIcon className="follow-icons" icon={faTwitter} />
        </a> */}
      </div>
      <div className="text"></div>
    </footer>
  );
};

export default Footer;
