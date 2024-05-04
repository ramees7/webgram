import React, { useState } from 'react'
import { Col, Row, Button, Form } from 'react-bootstrap'
import editProfileIconImg from '../Assets/edit-profile-icon.png'

function EditProfile() {


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
        <div className='p-lg-5 py-md-5'>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group as={Col} md="12" controlId="validationCustom02" className='my-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" style={{ height: "50px" }} required/>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationCustom02" className='my-3'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" style={{ height: "50px" }} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder='Bio' required/>
                        </Form.Group>
                    </Col>
                    <Col md={6} className=' d-flex justify-content-center align-items-center'>
                        <Form.Group controlId="validationCustom01">
                            <label htmlFor="addpost" className=''>
                                <input type="file" id='addpost' style={{ display: "none" }} className='w-100' required />
                                <img src={editProfileIconImg} alt="" className='img-fluid ' style={{ width: "300px", height: "300px", borderRadius: "50%" }} />
                            </label>
                        </Form.Group>
                    </Col>
                    <Col md={12} className='my-5'>
                        <div className="d-flex justify-content-center w-100">
                            <Button type="submit" style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-3' >Update</Button>
                        </div>
                    </Col>
                </Row>
            </Form>

        </div>



    )
}

export default EditProfile