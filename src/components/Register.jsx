import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { userOtpVerifyApi, userRegisterApi } from "../Services/allApis";
import { message } from "antd";

function Register() {
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isGotOtp, setIsGotOtp] = useState(false);

  const handleGetOtp = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (
      form.checkValidity() === false ||
      !userData.name ||
      !userData.username ||
      !userData.phone ||
      !userData.email ||
      !userData.password ||
      !userData.confirmpassword
    ) {
      e.stopPropagation();
      message.warning("Enter Valid Details");
    } else if (userData.email.slice(-10) === "@gmail.com") {
      if (userData.phone.length === 10) {
        if (userData.password === userData.confirmpassword) {
          const res = await userRegisterApi(userData); // Adjust API call
          if (res.status === 200) {
            setIsGotOtp(true); // Move to OTP input screen
            message.success("OTP sent to your email.");
            setUserData({
              name: "",
              username: "",
              phone: "",
              email: "",
              password: "",
              confirmpassword: "",
            });
          } else {
            message.error(res.response.data);
          }
        } else {
          message.warning("Passwords Do Not Match");
        }
      } else {
        message.warning("Phone Number Must Be 10 Digits");
      }
    } else {
      message.warning("Enter a Valid Email");
    }
  };

  const verifyOtpAndRegister = async (e) => {
    e.preventDefault();
    if (otp === "") {
      message.warning("Enter OTP");
    } else {
      const res = await userOtpVerifyApi({ enteredOtp: otp });
      if (res.status === 200) {
        message.success("Registration Successful");
        navigate("/login");
      } else {
        message.error("Invalid OTP");
      }
    }
  };

  return (
    <div className="pt-5 " style={{ backgroundColor: "#f0eef6" , minHeight:"100vh"}}>
      <Row className="g-0">
        <Col md={6} className="mb-5  d-block d-md-none">
          <div
            style={{
              backgroundColor: "#6b4ce6",
              height: "250px",
              borderRadius: "0px 400px 180px 0px",
            }}
            className=" d-flex justify-content-center align-items-center me-lg-5 flex-column me-3"
          >
            <div className="w-75" style={{ color: "#fff" }}>
              <h4
                style={{
                  fontSize: "clamp(1.0625rem, 0.8958rem + 0.6667vw, 1.4375rem)",
                }}
              >
                Explore the vibrant world of social media and uncover endless
                opportunities for connection, engagement, and growth
              </h4>
              <h6 className="mt-3 text-end pe-5">
                Already a User ?{" "}
                <Link
                  to={"/login"}
                  style={{ color: "#fff" }}
                  title="Click To Login"
                >
                  Click Here
                </Link>
              </h6>
            </div>
          </div>
        </Col>
        <Col md={6} className="mb-5  d-none d-md-block">
          <div
            style={{
              backgroundColor: "#6b4ce6",
              height: "600px",
              borderRadius: "0px 400px 180px 0px",
            }}
            className=" d-flex justify-content-center align-items-center me-lg-5 flex-column me-3"
          >
            <div className="w-75" style={{ color: "#fff" }}>
              <h4
                style={{
                  fontSize: "clamp(1.0625rem, 0.8958rem + 0.6667vw, 1.4375rem)",
                }}
              >
                Explore the vibrant world of social media and uncover endless
                opportunities for connection, engagement, and growth
              </h4>
              <h6 className="mt-3 text-end pe-5">
                Already a User ?{" "}
                <Link
                  to={"/login"}
                  style={{ color: "#fff" }}
                  title="Click To Login"
                >
                  Click Here
                </Link>
              </h6>
            </div>
          </div>
        </Col>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center mb-5 flex-column"
        >
          <h3 className="fw-bold mb-3">Register</h3>
          <div className="w-75 ">
            <Form
              noValidate
              validated={validated}
              onSubmit={handleGetOtp}
              className="w-100"
            >
              <Row className="g-0">
                <Form.Group
                  as={Col}
                  xs={6}
                  md={12}
                  lg={6}
                  controlId="validationCustom01"
                  className="my-2 pe-2"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={userData.name}
                    style={{ height: "50px" }}
                    required
                    onChange={(e) => {
                      setUserData({ ...userData, name: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  xs={6}
                  md={12}
                  lg={6}
                  controlId="validationCustom02"
                  className="my-2  ps-2"
                >
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData.username}
                    placeholder="Username"
                    style={{ height: "50px" }}
                    required
                    onChange={(e) => {
                      setUserData({ ...userData, username: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  xs={6}
                  md={12}
                  lg={6}
                  controlId="validationCustom03"
                  className="my-2  pe-2"
                >
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData.phone}
                    placeholder="Phone Number"
                    pattern="[0-9]*"
                    minLength={6}
                    maxLength={10}
                    style={{ height: "50px" }}
                    required
                    onChange={(e) => {
                      setUserData({ ...userData, phone: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  xs={6}
                  md={12}
                  lg={6}
                  controlId="validationCustom04"
                  className="my-2  ps-2"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={userData.email}
                    placeholder="Email Address"
                    pattern="/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i"
                    style={{ height: "50px" }}
                    required
                    onChange={(e) => {
                      setUserData({ ...userData, email: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  xs={6}
                  md={12}
                  lg={6}
                  controlId="validationCustom05"
                  className="my-2  pe-2"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={userData.password}
                    placeholder="Password"
                    style={{ height: "50px" }}
                    required
                    onChange={(e) => {
                      setUserData({ ...userData, password: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  xs={6}
                  md={12}
                  lg={6}
                  controlId="validationCustom06"
                  className="my-2  ps-2"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={userData.confirmpassword}
                    placeholder="Confirm Password"
                    style={{ height: "50px" }}
                    required
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        confirmpassword: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Row>
              <div className="d-flex justify-content-center align-items-center flex-column w-100 my-3">
                <div id="recaptcha-container"></div>
                <Button
                  type="submit"
                  style={{
                    border: "none",
                    backgroundColor: "#6b4ce6",
                    borderRadius: "15px",
                    color: "#fff",
                  }}
                  className="py-2 px-3"
                >
                  Get OTP
                </Button>
              </div>
            </Form>
            <Form onSubmit={verifyOtpAndRegister}>
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Otp"
                style={{ height: "50px" }}
                required
                onChange={(e) => setOtp(e.target.value)}
              />
              <div className="d-flex justify-content-center w-100 my-3">
                <Button
                  type="submit"
                  style={{
                    border: "none",
                    backgroundColor: "#6b4ce6",
                    borderRadius: "15px",
                    color: "#fff",
                  }}
                  className="py-2 px-3"
                >
                  Register
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
