import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'


function AddPosts() {

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
        <div className='p-3' style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
            <h3 className='text-center pb-3 fw-bold'>Add Post</h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <label htmlFor="addpost" className='w-100'>
                        <input type="file" id='addpost' style={{ display: "none" }} className='w-100' required />
                        <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" alt="" className='img-fluid w-100' style={{ height: "300px", borderRadius: "10px" }} />
                    </label>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationCustom02" className='my-3'>
                    <Form.Control type="text" placeholder="Caption" />
                </Form.Group>
                <div className="d-flex justify-content-center w-100">
                    <Button type="submit" style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-3' >Post</Button>
                </div>
            </Form>
        </div>
    )
}

export default AddPosts