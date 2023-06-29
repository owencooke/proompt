import { styled } from "styled-components";
import colors from "../colors.json";
import MenuIcon from "../assets/menu.svg";

const NavWrapper = styled.div`
  background-color: ${colors.secondary};
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
  padding-inline: 32px;
`;

const HamburgerMenu = () => {
  return <img src={MenuIcon} alt="Menu icon" height="36" width="36" />;
};

function Navbar() {
  return (
    <NavWrapper>
      proompt
      <HamburgerMenu />
    </NavWrapper>
  );
}

export default Navbar;
