import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Register() {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    }

    return (
        <div className='pt-5 ' style={{ backgroundColor: "#f0eef6" }}>
            <Row className='g-0'>
                <Col md={6} className='mb-5  d-block d-md-none'>
                    <div style={{ backgroundColor: "#6b4ce6", height: "250px", borderRadius: "0px 400px 180px 0px" }} className=' d-flex justify-content-center align-items-center me-lg-5 flex-column me-3'>
                        <div className='w-75' style={{ color: "#fff" }}>
                            <h4 style={{fontSize: "clamp(1.0625rem, 0.8958rem + 0.6667vw, 1.4375rem)"}}>Explore the vibrant world of social media and uncover endless opportunities for connection, engagement, and growth</h4>
                            <h6 className='mt-3 text-end pe-5'>Already a User ? <Link to={'/login'} style={{color:"#fff"}} title='Click To Login'>Click Here</Link></h6>
                        </div>
                    </div>

                </Col>
                <Col md={6} className='mb-5  d-none d-md-block'>
                    <div style={{ backgroundColor: "#6b4ce6", height: "600px", borderRadius: "0px 400px 180px 0px" }} className=' d-flex justify-content-center align-items-center me-lg-5 flex-column me-3'>
                        <div className='w-75' style={{ color: "#fff" }}>
                            <h4 style={{fontSize: "clamp(1.0625rem, 0.8958rem + 0.6667vw, 1.4375rem)"}}>Explore the vibrant world of social media and uncover endless opportunities for connection, engagement, and growth</h4>
                            <h6 className='mt-3 text-end pe-5'>Already a User ? <Link to={'/login'} style={{color:"#fff"}} title='Click To Login'>Click Here</Link></h6>
                        </div>
                    </div>

                </Col>
                <Col md={6} className='d-flex justify-content-center align-items-center mb-5 flex-column'>
                <h3 className='fw-bold mb-3'>Register</h3>
                    <div className='w-75 '>
                        <Form noValidate validated={validated} onSubmit={handleSubmit} className='w-100'>

                            <Row className='g-0'>
                                <Form.Group as={Col} xs={6} md={12} lg={6} controlId="validationCustom02" className='my-2 pe-2'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name" style={{ height: "50px" }} required  />
                                </Form.Group>
                                <Form.Group as={Col} xs={6} md={12} lg={6} controlId="validationCustom02" className='my-2  ps-2'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Username" style={{ height: "50px" }} required />
                                </Form.Group>
                                <Form.Group as={Col} xs={6} md={12} lg={6} controlId="validationCustom02" className='my-2  pe-2'>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="text" placeholder="Phone Number" style={{ height: "50px" }} required />
                                </Form.Group>
                                <Form.Group as={Col} xs={6} md={12} lg={6} controlId="validationCustom02" className='my-2  ps-2'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email Address" email style={{ height: "50px" }} required />
                                </Form.Group>
                                <Form.Group as={Col} xs={6} md={12} lg={6} controlId="validationCustom02" className='my-2  pe-2'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" style={{ height: "50px" }} required />
                                </Form.Group>
                                <Form.Group as={Col} xs={6} md={12} lg={6} controlId="validationCustom02" className='my-2  ps-2'>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password" style={{ height: "50px" }} required />
                                </Form.Group>
                            </Row>
                            <div className="d-flex justify-content-center w-100 my-3">
                                <Button type="submit" style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-3' >Register</Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Register