import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Story() {
    return (
        <div className='px-3 row g-0'>
            <div className='d-flex' style={{ overflowX: "scroll" }}>
                <div className="d-flex">
                    <Link to={'/login'}>
                        <Card className=" text-white me-3" style={{ width: "130px" }}>
                            <Card.Img src="https://social-media-noko.vercel.app/images/profile-1.jpg" alt="Card image" style={{ width: "130px", height: "170px" }} />
                            <Card.ImgOverlay className='d-flex justify-content-center'>
                                <Card.Title className=''>
                                    <img src="https://social-media-noko.vercel.app/images/profile-1.jpg" alt="" style={{ width: "45px", height: "45px", border: "2px solid #6b4ce6 ", borderRadius: "50%" }} />
                                </Card.Title>
                            </Card.ImgOverlay>
                            <Card.ImgOverlay className='d-flex justify-content-center'>
                                <Card.Title style={{ marginTop: "123%", color: "#fff" }} className=''>Name</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>

                </div>

            </div>
        </div>
    )
}

export default Story