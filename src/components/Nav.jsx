import React, { useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Nav() {
    const [showProfile, setShowProfile] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleCloseProfile = () => setShowProfile(false);
    const handleShowProfile = () => setShowProfile(true);
    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);
    return (
        <div className='' >
            <nav className="navbar fixed-top " style={{ background: "#fff" }}>
                <div className="container" >
                    <a className="navbar-brand fw-bold" style={{ fontSize: "25px" }}>WebGram</a>
                    <div style={{ width: "35%" }} className=' d-none d-md-block d-lg-block'>
                        <form className="d-flex " >
                            <input className="form-control me-2 border-0" style={{ backgroundColor: "#f0f0f0" }} type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                    <div className='d-flex align-items-center'>
                        <Link to={'/register'}><button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-4 mx-2'>Create</button></Link>
                        <Link to={'/editprofile'} className='d-none d-md-block'><img src="https://social-media-noko.vercel.app/images/profile-1.jpg" alt="" style={{ width: "45px", height: "45px", borderRadius: "50%" }} /></Link>
                        <Button variant="" onClick={handleShowProfile} className="p-0 d-block d-md-none">
                            <img src="https://social-media-noko.vercel.app/images/profile-1.jpg" alt="" style={{ width: "45px", height: "45px", borderRadius: "50%" }} />
                        </Button>
                        <Offcanvas show={showProfile} onHide={handleCloseProfile} placement='end' style={{ backgroundColor: "#f0eef6" }}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>
                                    <a className="navbar-brand fw-bold" style={{ fontSize: "25px" }}>WebGram</a>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div className='' style={{ position: "fixed", zIndex: "1", width: "72%" }}>
                                    <div style={{ backgroundColor: "#fff", borderRadius: "10px" }} className='p-3 mb-2'>
                                        <div className='d-flex align-items-center mb-3'>
                                            <img src="https://social-media-noko.vercel.app/images/profile-1.jpg" alt="" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
                                            <div className='ms-3 d-flex align-items-center flex-column w-100'>
                                                <h5 className='mb-3'>Name </h5>
                                                <div className='d-flex justify-content-evenly w-100'>
                                                    <Link to={'/followerslist'} style={{ textDecoration: "none", color: "#000" }}>
                                                        <div>
                                                            <h5 className='text-center mb-0 me-1' style={{ fontSize: "clamp(0.875rem, 0.4375rem + 1vw, 1.25rem)" }}>Followers</h5>
                                                            <h6 className='text-center mb-0'>1000</h6>
                                                        </div>
                                                    </Link>
                                                    <Link to={'/followerslist'} style={{ textDecoration: "none", color: "#000" }}>
                                                        <div>
                                                            <h5 className='text-center mb-0 ms-1' style={{ fontSize: "clamp(0.875rem, 0.4375rem + 1vw, 1.25rem)" }}>Following</h5>
                                                            <h6 className='text-center mb-0'>1000</h6>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div style={{ backgroundColor: "#fff", borderRadius: "10px" }} className='p-3 mb-2 w-100 d-flex justify-content-between align-items-center'>
                                        <h6 className='mb-0' style={{ fontSize: "clamp(0.75rem, 0.3125rem + 1vw, 1.125rem)" }}>What's Your Mind Name</h6>
                                        <Link to={'/addposts'}><button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-3 '>Post</button></Link>
                                    </div>
                                    <div style={{ backgroundColor: "#fff", borderRadius: "10px", minHeight: "375px" }} className='p-3 mb-2 w-100'>
                                        <h5>@username</h5>
                                        <h6>Bio : fsdggfdsghfd</h6>
                                        <h6>Phno : As hidden with show option</h6>
                                        <div className='d-flex justify-content-center mt-4 flex-wrap'>
                                            <Link to={'/editprofile'}><button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-3 mx-2 mb-2 '>Edit Profile</button></Link>
                                            <Link to={'/myposts'}><button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-3 mx-2 mb-2'>My Posts</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                        <Button variant="" onClick={handleShowMenu} className='d-block d-md-none'>
                            <i className="fa-solid fa-bars fa-xl"></i>
                        </Button>
                        <Offcanvas show={showMenu} onHide={handleCloseMenu} style={{ backgroundColor: "#f0eef6" }}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>
                                    <a className="navbar-brand fw-bold" style={{ fontSize: "25px" }}>WebGram</a>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
                                    <Link to={'/'} style={{ color: "#000", textDecoration: "none" }}>
                                        <div className='px-3 py-3 lists' style={{ borderBottom: "1px solid #b3a6e480" }}>
                                            <h5>Home</h5>
                                        </div>
                                    </Link>
                                    <Link to={'/myposts'} style={{ color: "#000", textDecoration: "none" }}>
                                        <div className='px-3 py-3 lists' style={{ borderBottom: "1px solid #b3a6e480" }}>
                                            <h5>My Posts</h5>
                                        </div>
                                    </Link>
                                    <Link to={'/editprofile'} style={{ color: "#000", textDecoration: "none" }}>
                                        <div className='px-3 py-3 lists' style={{ borderBottom: "1px solid #b3a6e480" }}>
                                            <h5>Edit Profile</h5>
                                        </div>
                                    </Link>
                                    <Link to={'/allusers'} style={{ color: "#000", textDecoration: "none" }}>
                                        <div className='px-3 py-3 lists' style={{ borderBottom: "1px solid #b3a6e480" }}>
                                            <h5>Users</h5>
                                        </div>
                                    </Link>
                                    <Link to={'/followerslist'} style={{ color: "#000", textDecoration: "none" }}>
                                        <div className='px-3 py-3 lists' style={{ borderBottom: "1px solid #b3a6e480" }}>
                                            <h5>Followers List</h5>
                                        </div>
                                    </Link>
                                    <div className='px-3 py-3 lists' style={{ borderBottom: "1px solid #b3a6e480", color:"#fff", backgroundColor:"#be0808"}}>
                                        <h5>Log Out</h5>
                                    </div>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav