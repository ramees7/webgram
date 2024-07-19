import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { userRegisterApi } from '../Services/allApis';
import { message } from 'antd';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../Firebase/config';
function Register() {

    const [validated, setValidated] = useState(false)
    const [userData, setUserData] = useState({
        name: "", username: "", phone: "", email: "", password: "", confirmpassword: ""
    })
    const navigate = useNavigate()
    const [otp, setOtp] = useState("")
    const [user, setUser] = useState(null)
    const [isGotOtp, setIsGotOtp] = useState(false)

    // useEffect(() => {
    //     console.log(userData, "userdataeff");
    // })

    const handleGetOtp = async (e) => {
        const form = e.currentTarget
        e.preventDefault()
        if (form.checkValidity() === false && !userData.name || !userData.username || !userData.phone || !userData.email || !userData.password || !userData.confirmpassword) {
            e.stopPropagation()
            message.warning("Enter Valid Details")
        }
        else {
            if (userData.email.slice(-10) == "@gmail.com") {
                if (userData.phone.length == 10) {
                    if (userData.password.length >= 6 && userData.password.length <= 10) {

                        // -------------------------------------------------------------------------------------
                        try {
                            const recaptchaVerifier = await new RecaptchaVerifier(auth, "recaptcha", {})
                            const confirm = await signInWithPhoneNumber(auth, `+91${userData.phone}`, recaptchaVerifier)
                            // console.log(confirm, "confirm")
                            setUser(confirm)
                            setIsGotOtp(true)
                        } catch (error) {
                            // console.log(error, "errrr");
                        }

                        // --------------------------------------------------------------------------------------------
                        // console.log(userData, "userdata");
                        // const res = await userRegisterApi(userData)
                        // console.log(res)
                        // if (res.status === 200) {
                        //     console.log(res, "res");
                        //     setValidated(true)
                        //     message.success(`Registration of ${userData.username} Success`)
                        //     navigate('/login')
                        //     setUserData({ name: "", username: "", phone: "", email: "", password: "", confirmpassword: "" })
                        // }
                        // else {
                        //     message.error(res.response.data)
                        // }
                    }
                    else {
                        message.warning("Password Must be 6 to 10 Letters")
                    }
                }
                else {
                    message.warning("Phone Number Length 10 Numbers")
                }
            }
            else {
                message.warning("Enter Valid Email")
            }
        }
    }


    const verifyOtpAndRegister = async (e) => {
        e.preventDefault();
        if (otp === "") {
            message.warning("Enter OTP")
        }
        else {
            try {
                const hello = await user.confirm(otp)
                // console.log(hello, "hello");
                if (hello._tokenResponse.isNewUser === true) {
                    // console.log(userData, "userdata");
                    const res = await userRegisterApi(userData)
                    console.log(res)
                    if (res.status === 200) {
                        console.log(res, "res");
                        setValidated(true)
                        setIsGotOtp(false)
                        message.success(`Registration of ${userData.username} Success`)
                        navigate('/login')
                        setUserData({ name: "", username: "", phone: "", email: "", password: "", confirmpassword: "" })
                    }
                    else {
                        message.error(res.response.data)
                    }
                }
            } catch (error) {
                // console.log(error, "errrrrrrrrrrrrrrrr");
            }
        }

    }


    return (
        <div className='pt-5 ' style={{ backgroundColor: "#f0eef6" }}>
            <Row className='g-0'>
                <Col md={6} className='mb-5  d-block d-md-none'>
                    <div style={{ backgroundColor: "#6b4ce6", height: "250px", borderRadius: "0px 400px 180px 0px" }} className=' d-flex justify-content-center align-items-center me-lg-5 flex-column me-3'>
                        <div className='w-75' style={{ color: "#fff" }}>
                            <h4 style={{ fontSize: "clamp(1.0625rem, 0.8958rem + 0.6667vw, 1.4375rem)" }}>Explore the vibrant world of social media and uncover endless opportunities for connection, engagement, and growth</h4>
                            <h6 className='mt-3 text-end pe-5'>Already a User ? <Link to={'/login'} style={{ color: "#fff" }} title='Click To Login'>Click Here</Link></h6>
                        </div>
                    </div>

                </Col>
                <Col md={6} className='mb-5  d-none d-md-block'>
                    <div style={{ backgroundColor: "#6b4ce6", height: "600px", borderRadius: "0px 400px 180px 0px" }} className=' d-flex justify-content-center align-items-center me-lg-5 flex-column me-3'>
                        <div className='w-75' style={{ color: "#fff" }}>
                            <h4 style={{ fontSize: "clamp(1.0625rem, 0.8958rem + 0.6667vw, 1.4375rem)" }}>Explore the vibrant world of social media and uncover endless opportunities for connection, engagement, and growth</h4>
                            <h6 className='mt-3 text-end pe-5'>Already a User ? <Link to={'/login'} style={{ color: "#fff" }} title='Click To Login'>Click Here</Link></h6>
                        </div>
                    </div>

                </Col>
                <Col md={6} className='d-flex justify-content-center align-items-center mb-5 flex-column'>
                    <h3 className='fw-bold mb-3'>Register</h3>
                    <div className='w-75 '>
                        {
                            // if anything get an error remove the isgototp condition
                            !isGotOtp ?
                                <Form noValidate validated={validated} onSubmit={handleGetOtp} className='w-100'>
                                    <Row className='g-0'>
                                        <Form.Group as={Col} xs={6} md={12} lg={6} controlId="validationCustom01" className='my-2 pe-2'>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Name" style={{ height: "50px" }} required onChange={(e) => { setUserData({ ...userData, name: e.target.value }) }} />
                                        </Form.Group>
                                        <Form.Group as={Col} xs={6} md={12} lg={6} controlId="validationCustom02" className='my-2  ps-2'>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" placeholder="Username" style={{ height: "50px" }} required onChange={(e) => { setUserData({ ...userData, username: e.target.value }) }} />
                                        </Form.Group>
                                        <Form.Group as={Col} xs={6} md={12} lg={6} controlId="validationCustom03" className='my-2  pe-2'>
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control type="text" placeholder="Phone Number" pattern='[0-9]*' minLength={6} maxLength={10} style={{ height: "50px" }} required onChange={(e) => { setUserData({ ...userData, phone: e.target.value }) }} />
                                        </Form.Group>
                                        <Form.Group as={Col} xs={6} md={12} lg={6} controlId="validationCustom04" className='my-2  ps-2'>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Email Address" pattern='/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i' style={{ height: "50px" }} required onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }} />
                                        </Form.Group>
                                        <Form.Group as={Col} xs={6} md={12} lg={6} controlId="validationCustom05" className='my-2  pe-2'>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" style={{ height: "50px" }} required onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }} />
                                        </Form.Group>
                                        <Form.Group as={Col} xs={6} md={12} lg={6} controlId="validationCustom06" className='my-2  ps-2'>
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type="password" placeholder="Confirm Password" style={{ height: "50px" }} required onChange={(e) => { setUserData({ ...userData, confirmpassword: e.target.value }) }} />
                                        </Form.Group>
                                    </Row>
                                    <div className="d-flex justify-content-center align-items-center flex-column w-100 my-3">
                                        <div id='recaptcha'></div>
                                        <Button type="submit" style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-3' >Get OTP</Button>
                                    </div>
                                </Form>
                                :
                                <Form onSubmit={verifyOtpAndRegister}>
                                    <Form.Label>OTP</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Otp" style={{ height: "50px" }} required onChange={(e) => setOtp(e.target.value)} />
                                    <div className="d-flex justify-content-center w-100 my-3">
                                        <Button type="submit" style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-3' >Register</Button>
                                    </div>
                                </Form>
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Register