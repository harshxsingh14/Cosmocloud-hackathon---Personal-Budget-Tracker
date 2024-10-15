import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/RegisterPage.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-page">
      <div className="video-background">
        <video className="background-video" autoPlay loop muted>
          <source src="198750-908438365_small.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>
      {loading && <Spinner />}
      <div className="register-form-container">
        <Form className="register-form" layout="vertical" onFinish={submitHandler}>
          <h2>Register Form</h2>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/login">Already Registered? login here!</Link>
            <button className="btn">Register</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
