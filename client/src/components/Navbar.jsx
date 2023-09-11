import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import { Avatar, Button } from "antd";
import {
  UserOutlined,
  MenuOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { styled } from "styled-components";
import colors from "../colors.json";

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

const NavItems = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
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
  font-size: 20px;
  &:hover {
    color: ${colors.tertiary};
  }
`;

const getInitials = (fullName) =>
  fullName
    ? fullName
        .split(" ")
        .slice(0, 3)
        .map((name) => name[0].toUpperCase())
        .join("")
    : "";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const handleLogout = () => {
    signOut(auth);
    handleClose();
  };

  return (
    <NavWrapper>
      <Nav>
        <Link
          to="/"
          onClick={handleClose}
          style={{ textDecoration: "none", color: colors.primary }}
        >
          proompt
        </Link>
        <NavItems>
          <Button
            type="text"
            size="large"
            icon={
              <Avatar
                src={auth.currentUser?.photoURL}
                style={{ marginTop: "-4px" }}
                icon={!auth.currentUser && <UserOutlined />}
              >
                {getInitials(auth.currentUser?.displayName)}
              </Avatar>
            }
          />
          <Button
            type="text"
            size="large"
            icon={
              isOpen ? (
                <CloseOutlined
                  style={{ color: colors.primary, fontSize: "24px" }}
                />
              ) : (
                <MenuOutlined
                  style={{ color: colors.primary, fontSize: "24px" }}
                />
              )
            }
            onClick={() => setIsOpen((open) => !open)}
          />
        </NavItems>
      </Nav>
      {isOpen && (
        <>
          <MenuDropdown>
            <SearchWrapper>
              <SearchInput placeholder="Search"></SearchInput>
              <SearchOutlined
                style={{ color: colors.text, fontSize: "24px" }}
              />
            </SearchWrapper>
            <StyledLink to="/library" onClick={handleClose}>
              Library
            </StyledLink>
            <StyledLink to="/" onClick={handleClose}>
              Explore
            </StyledLink>
            <StyledLink to="/" onClick={handleClose}>
              FAQ
            </StyledLink>
            <StyledLink to="/login" onClick={handleLogout}>
              {auth.currentUser ? "Logout" : "Login"}
            </StyledLink>
          </MenuDropdown>
          <BlurOverlay />
        </>
      )}
    </NavWrapper>
  );
}

export default Navbar;
