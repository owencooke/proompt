import { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import colors from "../colors.json";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { ReactComponent as CloseIcon } from "../assets/x.svg";
import { ReactComponent as SearchIcon } from "../assets/search-outline.svg";

const NavWrapper = styled.div`
  position: relative;
`;

const Nav = styled.div`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
  padding-inline: 32px;
  user-select: none;
`;

const MenuDropdown = styled.div`
  background-color: ${colors.secondary};
  position: absolute;
  z-index: 9999;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 32px 0;
`;

const BlurOverlay = styled.div`
  background-color: #6b6b6b;
  opacity: 40%;
  position: absolute;
  z-index: 9998;
  width: 100%;
  height: 100vh;
`;

const SearchWrapper = styled.div`
  background-color: ${colors.primary};
  border-radius: 16px;
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  width: 90%;
  color: ${colors.text};
  font-size: 16px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.primary};
  font-size: 24px;
  &:hover {
    color: ${colors.tertiary};
  }
`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavWrapper>
      <Nav>
        proompt
        <div
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <CloseIcon
              height="36"
              width="36"
              stroke={isHovered ? colors.tertiary : colors.primary}
            />
          ) : (
            <MenuIcon
              height="36"
              width="36"
              fill={isHovered ? colors.tertiary : colors.primary}
            />
          )}
        </div>
      </Nav>
      {isOpen && (
        <>
          <MenuDropdown>
            <SearchWrapper>
              <SearchInput placeholder="Search"></SearchInput>
              <SearchIcon height="24" width="24" fill={colors.text} />
            </SearchWrapper>
            <StyledLink to={"/"}>Profile</StyledLink>
            <StyledLink to={"/library"}>Library</StyledLink>
            <StyledLink to={"/"}>Explore</StyledLink>
            <StyledLink to={"/"}>FAQ</StyledLink>
          </MenuDropdown>
          <BlurOverlay />
        </>
      )}
    </NavWrapper>
  );
}

export default Navbar;
