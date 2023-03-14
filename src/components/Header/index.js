import "./index.css";
import Logo from "../../images/Logo.png";
import SearchBox from "./SearchBox";

const Header = () => {
  return `
    <h1><img src=${Logo} alt="MovieList 로고" /></h1>
    ${SearchBox()}
  `;
};

export default Header;
