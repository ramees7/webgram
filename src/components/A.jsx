import React, { useState } from 'react'
import { auth } from '../Firebase/config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

function A() {

    const [phone,setPhone]=useState("")
    const [otp,setOtp]=useState("")
    const [user,setUser]=useState("")

    

    const sendOtp=async()=>{
        try{
            console.log(phone);
            const recaptchaVerifier=await new RecaptchaVerifier(auth,"recaptcha",{})
            const confirm=await signInWithPhoneNumber(auth,`+91${phone}`,recaptchaVerifier)
            console.log(confirm);
            setUser(confirm)
        }
        catch(err){
            console.log(err);
        }
    }

    const otpverify=async()=>{
        try{
            const b=await user.confirm(otp)
            console.log(b);
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <div>
        <input type="text"  placeholder='phone' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        <button onClick={sendOtp}>verify</button>
        <div id='recaptcha'></div>
        <input type="text"  placeholder='otp' value={otp} onChange={(e)=>setOtp(e.target.value)}/>
        <button onClick={otpverify}>login</button>
    </div>
  )
}

export default A







// import React, { useEffect, useState } from 'react'
// import { Button, Col, Form, Row } from 'react-bootstrap'
// import { Link, useNavigate } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { GoogleLogin } from '@react-oauth/google';
// import { message } from 'antd';
// import { userLoginApi } from '../Services/allApis';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// import { auth } from '../Firebase/config';

// function Login() {
//     const [validated, setValidated] = useState(false)
//     const [userData, setUserData] = useState({
//         phone: "", password: ""
//     })
//     const navigate = useNavigate()
//     const [confirmationResult, setConfirmationResult] = useState(null);
//     const [otp, setOtp] = useState('');


//     const client_Id = "434816966372-3fffe1j9plo3gsi8jq6e670suaegvvnm.apps.googleusercontent.com"
//     const handleSubmit = async (e) => {
//         const form = e.currentTarget
//         e.preventDefault()
//         if (form.checkValidity() === false && !userData.password || !userData.phone) {
//             e.stopPropagation()
//             message.warning("Enter Valid Details")
//         }
//         else {
//             if (userData.phone.length == 10) {
//                 if (userData.password.length >= 6 && userData.password.length <= 10) {
//                     // console.log(userData, "userdata");

//                     try {
//                         const recaptchaVerifier = await new RecaptchaVerifier(auth, "recaptcha", {})
//                         const confirm = await signInWithPhoneNumber(auth, `+91${userData.phone}`, recaptchaVerifier)
//                         console.log(confirm)
//                         setConfirmationResult(confirm)
//                     }
//                     catch(err){
//                         console.log(err);
//                     }


//                     // const res = await userLoginApi(userData)
//                     // console.log(res)
//                     // if (res.status === 200) {
//                     //     console.log(res, "res");
//                     //     setValidated(true)
//                     //     message.success(`Login Successfully`)
//                     //     sessionStorage.setItem("Existing User", JSON.stringify(res.data.existingUser))
//                     //     sessionStorage.setItem('Role', res.data.role)
//                     //     sessionStorage.setItem('Token', res.data.token)
//                     //     navigate('/')
//                     //     setUserData({ phone: "", password: "", })
//                     // }
//                     // else {
//                     //     message.error(res.response.data)
//                     // }
//                 }
//                 else {
//                     message.warning("Password Must be 6 to 10 Letters")
//                 }
//             }
//             else {
//                 message.warning("Phone Number Length 10 Numbers")
//             }
//         }
//     }

//     const handleVerifyOtp = async () => {
//         try {
//             const b = await confirmationResult.confirm(otp)
//             console.log(b)
//             if (b.providerId === "phone") {
//                 console.log(userData, "userd");
//                 const res = await userLoginApi(userData)
//                 console.log(res)
//                 if (res.status === 200) {
//                     console.log(res, "res");
//                     setValidated(true)
//                     message.success(`Login Successfully`)
//                     sessionStorage.setItem("Existing User", JSON.stringify(res.data.existingUser))
//                     sessionStorage.setItem('Role', res.data.role)
//                     sessionStorage.setItem('Token', res.data.token)
//                     navigate('/')
//                     setUserData({ phone: "", password: "", })
//                 }
//                 else {
//                     message.error(res.response.data)
//                 }
//             }
//         }
//         catch (err) {
//             console.log(err);
//         }
//     }

//     // const responseMessage = (response) => {
//     //     console.log(response);
//     // };
//     // const errorMessage = (error) => {
//     //     console.log(error);
//     // };
//     return (
//         <div className='pt-5 ' style={{ backgroundColor: "#f0eef6" }}>
//             <Row className='g-0'>
//                 <Col md={6} className='mb-5 d-block d-md-none '>
//                     <div style={{ backgroundColor: "#6b4ce6", height: "250px", borderRadius: "400px 0px 0px 180px" }} className=' d-flex justify-content-center align-items-center ms-lg-5 flex-column ms-3'>
//                         <div className='w-75' style={{ color: "#fff" }}>
//                             <h4 style={{ fontSize: "clamp(1.0625rem, 0.8958rem + 0.6667vw, 1.4375rem)" }}>Explore the vibrant world of social media and uncover endless opportunities for connection, engagement, and growth</h4>
//                             <h6 className='mt-3 text-end pe-5'>New On WebGram ? <Link to={'/register'} style={{ color: "#fff" }} title='Click To Register'>Click Here</Link></h6>
//                         </div>
//                     </div>
//                 </Col>
//                 <Col md={6} className='d-flex justify-content-center align-items-center mb-5 flex-column'>
//                     <h3 className='fw-bold'>Login</h3>
//                     <div className='w-75 '>
//                         <Form noValidate validated={validated} onSubmit={handleSubmit} className='w-100'>

//                             <Row className='g-0'>
//                                 <Form.Group controlId="validationCustom02" className='my-2 mx-3'>
//                                     <Form.Label>Phone Number</Form.Label>
//                                     <Form.Control type="number" placeholder="Phone Number" style={{ height: "50px" }} required onChange={(e) => { setUserData({ ...userData, phone: e.target.value }) }} />
//                                 </Form.Group>
//                                 {/* <Form.Group as={Col} xs={6} md={12} lg={6} controlId="validationCustom02" className='my-2  ps-2'>
//                                     <Form.Label>Email</Form.Label>
//                                     <Form.Control type="text" placeholder="Email Address" email style={{ height: "50px" }} required />
//                                 </Form.Group> */}
//                                 <Form.Group controlId="validationCustom02" className='my-2 mx-3'>
//                                     <Form.Label>Password</Form.Label>
//                                     <Form.Control type="password" placeholder="Password" style={{ height: "50px" }} required onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }} />
//                                 </Form.Group>
//                             </Row>
//                             <div id='recaptcha' className='my-2 mx-3'></div>
//                             <Form.Group controlId="validationCustom03" className='my-2 mx-3'>
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control type="number" placeholder="OTP" style={{ height: "50px" }} value={otp} required onChange={(e) => { setOtp(e.target.value) }} />
//                             </Form.Group>
//                             <div className="d-flex justify-content-center w-100 my-3">
//                                 <Button type="submit" style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-3' >otp</Button>
//                             </div>
//                             <div className="d-flex justify-content-center w-100 my-3">
//                                 <Button type="submit" style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-3' onClick={handleVerifyOtp}>Login</Button>
//                             </div>
//                         </Form>
//                         {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}

//                     </div>
//                 </Col>
//                 <Col md={6} className='mb-5 d-none d-md-block'>
//                     <div style={{ backgroundColor: "#6b4ce6", height: "600px", borderRadius: "400px 0px 0px 180px" }} className=' d-flex justify-content-center align-items-center ms-lg-5 flex-column ms-3'>
//                         <div className='w-75' style={{ color: "#fff" }}>
//                             <h4 style={{ fontSize: "clamp(1.0625rem, 0.8958rem + 0.6667vw, 1.4375rem)" }}>Explore the vibrant world of social media and uncover endless opportunities for connection, engagement, and growth</h4>
//                             <h6 className='mt-3 text-end pe-5'>New On WebGram ? <Link to={'/register'} style={{ color: "#fff" }} title='Click To Register'>Click Here</Link></h6>
//                         </div>
//                     </div>
//                 </Col>
//             </Row>
//         </div>
//     )
// }

// export default Login                      
// {/* ---------------------------------------------------------------/ */}
