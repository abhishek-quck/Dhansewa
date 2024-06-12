// eslint-disable-next-line
import { ReactComponent as LogoDark } from "../assets/images/logos/xtremelogo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className={`text-decoration-none`}>
      <h3 className={`text-secondary`}>DHANSEVA</h3>
    </Link>
  );
};

export default Logo;
