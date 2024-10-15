import React, { useState, useEffect } from "react";
import { Form, Input, message, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/Loginpage.css";

const Login = () => {
  const videoSrc = "/198750-908438365_small.mp4"; // Update with the correct path to your video file

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      setLoading(false);
      message.success("Login successful");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Prevent logged-in users from accessing the login page
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-page">
      {loading && <Spinner />}
      <video
        className="background-video"
        src={videoSrc}
        autoPlay
        loop
        muted
      />
      <div className="login-form-container">
        <Form layout="vertical" onFinish={submitHandler} className="login-form">
          <h1>Login Form</h1>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/register">Not a user? Click here to register!</Link>
            <Button type="primary" htmlType="submit">Login</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
