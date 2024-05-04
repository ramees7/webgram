import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './All.css'


function Posts() {
    return (
        <div className='p-3' style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
            <div>
                <Row className='g-0'>
                    <Col xs={1} className='d-flex justify-content-center align-items-center'>
                        <img src="https://social-media-noko.vercel.app/images/profile-1.jpg" alt="" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                    </Col>
                    <Col xs={11} className='px-3'>
                        <h5 className='mb-0 All-h5'>name</h5>
                        <h6 className='All-h6'>date and time</h6>
                    </Col>
                    <Col md={12} className='my-3'>
                        <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" alt="" className='img-fluid w-100' style={{ height: "300px", borderRadius: "10px" }} />
                    </Col>
                    <Col md={12} className=''>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex ">
                                <i className="fa-regular fa-heart ms-3 fa-lg"></i>
                                <i className="fa-regular fa-comment ms-3 fa-lg"></i>
                                <i className="fa-solid fa-share-nodes ms-3 fa-lg"></i>
                            </div>
                            <div>
                                <i className="fa-regular fa-bookmark fa-lg me-3"></i>
                            </div>
                        </div>
                        <h6 className='ms-3 mt-2'>caption</h6>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Posts