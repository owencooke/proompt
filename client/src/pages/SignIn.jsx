import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { GoogleLoginButton } from "react-social-login-buttons";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { Input, Button, Form } from "antd";
import styled from "styled-components";

const PageWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);

  // Function to handle user login
  const handleLogin = async (provider) => {
    try {
      if (provider === "google") {
        // Sign in with Google
        const googleProvider = new GoogleAuthProvider();
        await signInWithPopup(auth, googleProvider);
      } else if (provider === "email") {
        if (registering) {
          await createUserWithEmailAndPassword(email, password);
        } else {
          await signInWithEmailAndPassword(email, password);
        }
      } else {
        throw new Error("Invalid login provider");
      }
      // Redirect to previous page (hstory?)
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return (
    <PageWrapper>
      <h2>{registering ? "create an account" : "welcome back"}</h2>
      {registering ? "" : "please login to continue"}
      <Input
        size="large"
        autoComplete="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input.Password
        size="large"
        autoComplete="current-password"
        placeholder="Password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        onChange={(e) => setPassword(e.target.value)}
      />
      <ActionWrapper>
        <Button
          type="link"
          onClick={() => setRegistering((prev) => !prev)}
          style={{ padding: 0 }}
        >
          {registering ? "back to login" : "register now"}
        </Button>
        <Button
          size="large"
          type="primary"
          onClick={() => handleLogin("email")}
        >
          {registering ? "register" : "login"}
        </Button>
      </ActionWrapper>
      <span style={{ textAlign: "center" }}>or</span>
      <GoogleLoginButton
        style={{ fontSize: "16px" }}
        onClick={() => handleLogin("google")}
      >
        Sign in with Google
      </GoogleLoginButton>
    </PageWrapper>
  );
}

export default SignIn;
