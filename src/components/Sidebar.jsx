import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='d-none d-md-block d-lg-block' style={{ position: "fixed", zIndex: "1", width: "20%" }}>
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
        <div className='px-3 py-3 lists' style={{ borderBottom: "1px solid #b3a6e480", color: "#fff", backgroundColor: "#be0808" }}>
          <h5>Log Out</h5>
        </div>
      </div>
    </div>
  )
}

export default Sidebar