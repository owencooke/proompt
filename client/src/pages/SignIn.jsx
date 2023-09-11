import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
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

const ErrorMessage = styled.span`
  color: red;
`;

function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle user login
  const handleLogin = async (provider) => {
    try {
      if (provider === "google") {
        // Sign in with Google
        const googleProvider = new GoogleAuthProvider();
        await signInWithPopup(auth, googleProvider);
      } else if (provider === "email") {
        if (registering) {
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          await updateProfile(user, {
            displayName: name,
          });
        } else {
          await signInWithEmailAndPassword(auth, email, password);
        }
      }
      // Redirect to previous page
      navigate(-1);
    } catch (error) {
      console.log(error);
      setError(
        "The email or password provided is incorrect. Please try again."
      );
    }
  };

  return (
    <PageWrapper>
      <h2>{registering ? "create an account" : "welcome back"}</h2>
      {registering ? "" : "please login to continue"}
      {registering && (
        <Input
          size="large"
          autoComplete="name"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />
      )}
      <Input
        size="large"
        autoComplete="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
      />
      <Input.Password
        size="large"
        autoComplete="current-password"
        placeholder="Password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }}
      />
      <ErrorMessage>{error}</ErrorMessage>
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
