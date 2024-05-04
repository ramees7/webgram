import React from 'react'
import './All.css'
import { Link } from 'react-router-dom'


function SidebarRight() {
    return (
        <div className='d-none d-md-block d-lg-block' style={{ position: "fixed", zIndex: "1", width: "20%" }}>
            <div style={{ backgroundColor: "#fff", borderRadius: "10px" }} className='p-3 mb-2 w-100'>
                <div className='d-flex align-items-center mb-3'>
                    <img src="https://social-media-noko.vercel.app/images/profile-1.jpg" alt="" style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
                    <div className='ms-3'>
                        <h5 className='mb-0'>Name </h5>
                    </div>
                </div>
                <div className='d-flex justify-content-evenly'>
                    <Link to={'/followerslist'} style={{textDecoration:"none", color:"#000"}}>
                        <div>
                            <h5 className='text-center mb-0 me-1' style={{ fontSize: "clamp(0.875rem, 0.4375rem + 1vw, 1.25rem)" }}>Followers</h5>
                            <h6 className='text-center mb-0'>1000</h6>
                        </div>
                    </Link>
                    <Link to={'/followerslist'}  style={{textDecoration:"none", color:"#000"}}>
                        <div>
                            <h5 className='text-center mb-0 ms-1' style={{ fontSize: "clamp(0.875rem, 0.4375rem + 1vw, 1.25rem)" }}>Following</h5>
                            <h6 className='text-center mb-0'>1000</h6>
                        </div>
                    </Link>
                </div>
            </div>
            <div style={{ backgroundColor: "#fff", borderRadius: "10px" }} className='p-3 mb-2 w-100 d-flex justify-content-between align-items-center'>
                <h6 className='mb-0' style={{ fontSize: "clamp(0.75rem, 0.3125rem + 1vw, 1.125rem)" }}>What's Your Mind Name</h6>
                <Link to={'/addposts'}><button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-3 '>Post</button></Link>
            </div>
            <div style={{ backgroundColor: "#fff", borderRadius: "10px" }} className='p-3 mb-2 w-100'>
                <h5>@username</h5>
                <h6>Bio : fsdggfdsghfd</h6>
                <h6>Phno : As hidden with show option</h6>
                <div className='d-flex justify-content-center mt-4 flex-wrap'>
                    <Link to={'/editprofile'}><button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-3 mx-2 mb-2 '>Edit Profile</button></Link>
                    <Link to={'/myposts'}><button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-3 mx-2 mb-2'>My Posts</button></Link>
                </div>
            </div>
        </div>
    )
}

export default SidebarRight