import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ icon }) => {
  return (
    <a href={icon?.message} target="blank">
      <FontAwesomeIcon className="follow-icons" icon={["fab", icon?.path]} />
    </a>
  );
};

export default Icon;
