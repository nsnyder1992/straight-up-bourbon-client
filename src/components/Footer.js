//fontawesome
import { useEffect, useState } from "react";
import APIURL from "../helpers/environment";
import Icon from "./Utils/Icon";

//styles
import "./styles/Footer.css";

const Footer = () => {
  //meta states
  const [icons, setIcons] = useState([]);

  const getMetas = () => {
    fetch(`${APIURL}/meta/by/type/`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify({
        type: "footer",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setIcons(json);
      })
      .catch(() => {});
  };

  useEffect(() => {
    setIcons();
    getMetas();
  }, []);

  return (
    <footer>
      <div className="follow-us">
        {icons ? (
          icons?.map((icon, index) => {
            return <Icon key={index} icon={icon} />;
          })
        ) : (
          <></>
        )}
        {/* <a href="https://www.youtube.com/c/StraightUpBourbon" target="blank">
          <FontAwesomeIcon className="follow-icons" icon={["fab", "youtube"]} />
        </a>
        <a href="https://www.instagram.com/straight_up_bourbon/" target="blank">
          <FontAwesomeIcon
            className="follow-icons"
            icon={["fab", "instagram"]}
          />
        </a>
        <a
          href="https://www.facebook.com/groups/705717763693659"
          target="blank"
        >
          <FontAwesomeIcon
            className="follow-icons"
            icon={["fab", "facebook-f"]}
          />
        </a>
        <a href="https://www.patreon.com/straightupbourbon" target="blank">
          <FontAwesomeIcon className="follow-icons" icon={["fab", "patreon"]} />
        </a> */}
      </div>
    </footer>
  );
};

export default Footer;
