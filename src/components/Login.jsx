import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { userLoginApi } from "../Services/allApis";

function Login() {
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState({
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (
      (form.checkValidity() === false && !userData.password) ||
      !userData.phone
    ) {
      e.stopPropagation();
      message.warning("Enter Valid Details");
    } else {
      if (userData.phone.length === 10) {
        if (userData.password.length >= 6 && userData.password.length <= 10) {
          const res = await userLoginApi(userData);
          if (res.status === 200) {
            setValidated(true);
            message.success(`Login Successfully`);
            sessionStorage.setItem(
              "Existing User",
              JSON.stringify(res.data.existingUser)
            );
            sessionStorage.setItem("Role", res.data.role);
            sessionStorage.setItem("Token", res.data.token);
            navigate("/");
            setUserData({ phone: "", password: "" });
          } else {
            message.error(res.response.data);
          }
        } else {
          message.warning("Password Must be 6 to 10 Letters");
        }
      } else {
        message.warning("Phone Number Length 10 Numbers");
      }
    }
  };
  return (
    <div className="pt-5 " style={{ backgroundColor: "#f0eef6" , minHeight:"100vh"}}>
      <Row className="g-0">
        <Col md={6} className="mb-5 d-block d-md-none ">
          <div
            style={{
              backgroundColor: "#6b4ce6",
              height: "250px",
              borderRadius: "400px 0px 0px 180px",
            }}
            className=" d-flex justify-content-center align-items-center ms-lg-5 flex-column ms-3"
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
                New On WebGram ?{" "}
                <Link
                  to={"/register"}
                  style={{ color: "#fff" }}
                  title="Click To Register"
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
          <h3 className="fw-bold">Login</h3>
          <div className="w-75 ">
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="w-100"
            >
              <Row className="g-0">
                <Form.Group
                  controlId="validationCustom02"
                  className="my-2 mx-3"
                >
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Phone Number"
                    style={{ height: "50px" }}
                    required
                    onChange={(e) => {
                      setUserData({ ...userData, phone: e.target.value });
                    }}
                  />
                </Form.Group>
                {/* <Form.Group as={Col} xs={6} md={12} lg={6} controlId="validationCustom02" className='my-2  ps-2'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="Email Address" email style={{ height: "50px" }} required />
                                </Form.Group> */}
                <Form.Group
                  controlId="validationCustom02"
                  className="my-2 mx-3"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    style={{ height: "50px" }}
                    required
                    onChange={(e) => {
                      setUserData({ ...userData, password: e.target.value });
                    }}
                  />
                </Form.Group>
              </Row>
              <div className="w-100 d-flex justify-content-end" >
                <Link to={"/forget-password"} style={{textDecoration:"none"}}>forgot your password</Link>
              </div>

              <div className="d-flex justify-content-center w-100 mb-3">
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
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Col>
        <Col md={6} className="mb-5 d-none d-md-block">
          <div
            style={{
              backgroundColor: "#6b4ce6",
              height: "600px",
              borderRadius: "400px 0px 0px 180px",
            }}
            className=" d-flex justify-content-center align-items-center ms-lg-5 flex-column ms-3"
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
                New On WebGram ?{" "}
                <Link
                  to={"/register"}
                  style={{ color: "#fff" }}
                  title="Click To Register"
                >
                  Click Here
                </Link>
              </h6>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
