// eslint-disable-next-line
import { ReactComponent as LogoDark } from "../assets/images/logos/xtremelogo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  const company = 'DHANSEVA';
  return (
    <Link to="/" className={`text-decoration-none`}>
      <h3 className={`text-secondary`}>{company}</h3>
    </Link>
  );
};

export default Logo;
