// // import React, { useState } from "react";
// // import { Form, Button } from "react-bootstrap";
// // import axios from "axios"; // Import axios

// // export default function ForgetPassword() {
// //   const [userData, setUserData] = useState({ email: "" });
// //   const [otp, setOtp] = useState("");
// //   const [newPassword, setNewPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [message, setMessage] = useState("");

// //   const handleEmailSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Use axios to send a POST request to your backend
// //       const response = await axios.post(
// //         "http://localhost:4000/forgetPassword",
// //         {
// //           email: userData.email,
// //         }
// //       );
// //       console.log(response);

// //       if (response.data.success) {
// //         setMessage("OTP sent to your email. Please check.");
// //       } else {
// //         setMessage("Error: " + response.data.message);
// //       }
// //     } catch (error) {
// //       setMessage("Error sending OTP.");
// //       console.error(error);
// //     }
// //   };
// //   const handleOtpSubmit = async (e) => {
// //     e.preventDefault();

// //     // Check if the passwords match
// //     if (newPassword !== confirmPassword) {
// //       setMessage("Passwords do not match.");
// //       return;
// //     }

// //     try {
// //       // Send OTP and new password to the backend for verification and password reset
// //       const response = await axios.post(
// //         "http://localhost:4000/verifyOtpAndResetPassword",
// //         {
// //           otp,
// //           newPassword,
// //           email: userData.email,
// //         }
// //       );

// //       if (response.data.success) {
// //         setMessage("Password reset successful.");
// //         // You can also redirect the user or clear the form here
// //       } else {
// //         setMessage("Error: " + response.data.message);
// //       }
// //     } catch (error) {
// //       setMessage("Error resetting password.");
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <Form onSubmit={handleEmailSubmit}>
// //         <Form.Group controlId="email">
// //           <Form.Label>Email</Form.Label>
// //           <Form.Control
// //             type="email"
// //             value={userData.email}
// //             placeholder="Enter your email"
// //             required
// //             onChange={(e) =>
// //               setUserData({ ...userData, email: e.target.value })
// //             }
// //           />
// //         </Form.Group>
// //         <Button type="submit" variant="primary" className="my-3">
// //           Send OTP
// //         </Button>
// //       </Form>

// //       <Form onSubmit={handleOtpSubmit}>
// //         <Form.Group controlId="otp">
// //           <Form.Label>OTP</Form.Label>
// //           <Form.Control
// //             type="text"
// //             value={otp}
// //             placeholder="Enter OTP"
// //             required
// //             onChange={(e) => setOtp(e.target.value)}
// //           />
// //         </Form.Group>
// //         <Form.Group controlId="newPassword">
// //           <Form.Label>New Password</Form.Label>
// //           <Form.Control
// //             type="password"
// //             value={newPassword}
// //             placeholder="Enter new password"
// //             required
// //             onChange={(e) => setNewPassword(e.target.value)}
// //           />
// //         </Form.Group>
// //         <Form.Group controlId="confirmPassword">
// //           <Form.Label>Confirm Password</Form.Label>
// //           <Form.Control
// //             type="password"
// //             value={confirmPassword}
// //             placeholder="Confirm new password"
// //             required
// //             onChange={(e) => setConfirmPassword(e.target.value)}
// //           />
// //         </Form.Group>
// //         <Button type="submit" variant="primary" className="my-3">
// //           Reset Password
// //         </Button>
// //       </Form>

// //       {message && <p>{message}</p>}
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import {
//   forgetPasswordEmailApi,
//   verifyAndResetPasswordApi,
// } from "../Services/allApis";

// export default function ForgetPassword() {
//   const [userData, setUserData] = useState({ email: "" });
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false); // Flag to track OTP state
//   const [isOtpVerified, setIsOtpVerified] = useState(false); // Flag to track OTP verification

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await forgetPasswordEmailApi({
//         email: userData.email,
//       });

//       if (response.data === "OTP sent to your email.") {
//         setIsOtpSent(true);
//         setMessage("OTP sent to your email. Please check.");
//       } else {
//         setMessage("Error: " + response.data);
//       }
//     } catch (error) {
//       setMessage("Error sending OTP.");
//       console.error(error);
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       setMessage("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await verifyAndResetPasswordApi({
//         otp,
//         newPassword,
//         email: userData.email,
//       });

//       if (response.data.success) {
//         setIsOtpVerified(true);
//         setMessage("Password reset successful.");
//       } else {
//         setMessage("Error: " + response.data.message);
//       }
//     } catch (error) {
//       setMessage("Error resetting password.");
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       {!isOtpSent ? (
//         <Form onSubmit={handleEmailSubmit}>
//           <Form.Group controlId="email">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               value={userData.email}
//               placeholder="Enter your email"
//               required
//               onChange={(e) =>
//                 setUserData({ ...userData, email: e.target.value })
//               }
//             />
//           </Form.Group>
//           <Button type="submit" variant="primary" className="my-3">
//             Send OTP
//           </Button>
//         </Form>
//       ) : !isOtpVerified ? (
//         <Form onSubmit={handleOtpSubmit}>
//           <Form.Group controlId="otp">
//             <Form.Label>OTP</Form.Label>
//             <Form.Control
//               type="text"
//               value={otp}
//               placeholder="Enter OTP"
//               required
//               onChange={(e) => setOtp(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="newPassword">
//             <Form.Label>New Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={newPassword}
//               placeholder="Enter new password"
//               required
//               onChange={(e) => setNewPassword(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="confirmPassword">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={confirmPassword}
//               placeholder="Confirm new password"
//               required
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </Form.Group>
//           <Button type="submit" variant="primary" className="my-3">
//             Reset Password
//           </Button>
//         </Form>
//       ) : (
//         <p>{message}</p>
//       )}

//       {message && <p>{message}</p>}
//     </div>
//   );
// }

import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  forgetPasswordEmailApi,
  verifyAndResetPasswordApi,
} from "../Services/allApis";

export default function ForgetPassword() {
  const [userData, setUserData] = useState({ email: "" });
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgetPasswordEmailApi({ email: userData.email });
      if (response.data === "OTP sent to your email.") {
        setIsOtpSent(true);
        setMessage("OTP sent to your email. Please check.");
      } else {
        setMessage("Error: " + response.data);
      }
    } catch (error) {
      setMessage("Error sending OTP.");
      console.error(error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await verifyAndResetPasswordApi({
        otp,
        newPassword,
        email: userData.email,
      });

      if (response.data.success) {
        setIsOtpVerified(true);
        setMessage("Password reset successful.");
      } else {
        setMessage("Error: " + response.data.message);
      }
    } catch (error) {
      setMessage("Error resetting password.");
      console.error(error);
    }
  };

  return (
    <div className="pt-5 " style={{ backgroundColor: "#f0eef6", minHeight:"100vh"}}>
      <Row className="g-0">
        <Col md={6} className="mb-5 d-block d-md-none ">
          <div
            style={{
              backgroundColor: "#6b4ce6",
              height: "250px",
              borderRadius: " 0px 400px 180px 0px",
            }}
            className=" d-flex justify-content-center align-items-center me-lg-5 flex-column me-3"
          >
            <div className="w-75" style={{ color: "#fff" }}>
              <h4
                style={{
                  fontSize: "clamp(1.0625rem, 0.8958rem + 0.6667vw, 1.4375rem)",
                }}
              >
                Reset your password and regain access to your account!
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
        <Col md={6} className="d-none d-md-block mb-5">
          <div
            style={{
              backgroundColor: "#6b4ce6",
              height: "600px",
              borderRadius: "0px 400px 180px 0px",
            }}
            className="d-flex justify-content-center align-items-center  me-lg-5 flex-column me-3"
          >
            <div className="w-75" style={{ color: "#fff" }}>
              <h4
                style={{
                  fontSize: "clamp(1.0625rem, 0.8958rem + 0.6667vw, 1.4375rem)",
                }}
              >
                Reset your password and regain access to your account!
              </h4>
              <h6 className="mt-3 text-end pe-5">
                New On WebGram?{" "}
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
          className="d-flex justify-content-center align-items-center flex-column mb-5"
        >
          <h3 className="fw-bold mb-3">Forget Password</h3>
          <div className="w-75">
            {!isOtpSent ? (
              <Form onSubmit={handleEmailSubmit} className="w-100">
                <Form.Group controlId="email" className="my-2 mx-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={userData.email}
                    placeholder="Enter your email"
                    required
                    style={{ height: "50px" }}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                </Form.Group>
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
                    Send OTP
                  </Button>
                </div>
              </Form>
            ) : !isOtpVerified ? (
              <Form onSubmit={handleOtpSubmit}>
                <Form.Group controlId="otp" className="my-3">
                  <Form.Label>OTP</Form.Label>
                  <Form.Control
                    type="text"
                    value={otp}
                    placeholder="Enter OTP"
                    required
                    style={{ height: "50px" }}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="newPassword" className="my-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    placeholder="Enter new password"
                    required
                    style={{ height: "50px" }}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="my-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm new password"
                    required
                    style={{ height: "50px" }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  style={{
                    border: "none",
                    backgroundColor: "#6b4ce6",
                    borderRadius: "15px",
                    color: "#fff",
                  }}
                  className="py-2 px-3 my-3 w-100"
                >
                  Reset Password
                </Button>
              </Form>
            ) : (
              <p className="text-success text-center">{message}</p>
            )}
            {message && <p className="text-danger text-center">{message}</p>}
          </div>
        </Col>
      </Row>
    </div>
  );
}
