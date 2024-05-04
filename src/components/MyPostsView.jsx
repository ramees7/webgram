import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './All.css'
import { Link } from 'react-router-dom'


function MyPostsView({ addpostcomp }) {


    const addPostComponent = addpostcomp ? false : true
    return (
        <div>
            {
                addPostComponent ?
                    <div style={{ backgroundColor: "#fff", borderRadius: "10px" }} className='p-3 mb-2 w-100 d-flex justify-content-between align-items-center'>
                        <h6 className='mb-0' style={{ fontSize: "clamp(0.75rem, 0.3125rem + 1vw, 1.125rem)" }}>What's Your Mind Name</h6>
                        <Link to={'/addposts'}><button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-3 '>Post</button></Link>
                    </div>
                    :
                    <h3 className='text-center pt-5 pb-3 fw-bold'>Your Posts</h3>
            }

            <div className='p-3' style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
                <div>
                    <Row className='g-0' >
                        <Col xs={1} className='d-flex justify-content-center align-items-center'>
                            <img src="https://social-media-noko.vercel.app/images/profile-1.jpg" alt="" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                        </Col>
                        <Col xs={8} className='px-3'>
                            <h5 className='mb-0 All-h5'>name</h5>
                            <h6 className='All-h6'>date and time</h6>
                        </Col>
                        {
                            addPostComponent &&
                            <Col xs={3} className=' d-flex justify-content-end align-items-center'>
                                <button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-4 '>Promote</button>
                            </Col>
                        }

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
                <div className='d-flex justify-content-center align-items-center flex-column'>
                    <img src="https://cdn-icons-png.freepik.com/512/1361/1361708.png" alt="" className='img-fluid my-3' style={{ width: "200px", height: "200px" }} />
                    <h4 className='fw-bold'>No Post Yet</h4>
                </div>
            </div>
        </div>
    )
}

export default MyPostsView