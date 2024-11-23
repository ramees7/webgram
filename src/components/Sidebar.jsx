import React, { useContext, useEffect, useState } from 'react'
import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { getAllPostsApi, getCurrentUserApi } from '../Services/allApis'
import { likedPostsCountContext, myPostsCountContext, savedPostsCountContext } from '../Context/ContextShares'

function Sidebar() {
  const [isLogout, setIsLogout] = useState(false)
  const [currentUser, setCurrentUser] = useState("")
  const [token, setToken] = useState("")
  const [allPosts, setAllPosts] = useState("")
  const {likedpostsCount, setLikedPostsCount}=useContext(likedPostsCountContext)
  const {savedpostsCount, setSavedPostsCount}=useContext(savedPostsCountContext)
  const {mypostsCount, setMyPostsCount}=useContext(myPostsCountContext)

  const navigate = useNavigate()

  const reqHeader = {
    "Content-Type": "application/json", "Authorization": `bearer ${token}`
  }
  useEffect(()=>{
    setToken(sessionStorage.getItem("Token"))
  },[])


  const handleLogout = async () => {
    let existingUser = sessionStorage.getItem("Token")
    if (existingUser) {
      sessionStorage.clear()
      navigate("/login")
      setIsLogout(true)
      message.success("Logout Success")
    }
    else {
      message.warning("Not Logined Yet")
    }
  }

  useEffect(() => {
    if (token) {
      handleGetCurrentUser()
    }
  }, [token,likedpostsCount,savedpostsCount,mypostsCount])


// console.log(likedpostsCount,"countttt");

  const handleGetCurrentUser = async () => {
    const result = await getCurrentUserApi(reqHeader)
    if (result.status === 200) {
      // console.log(result, "resultttttttt")
      setCurrentUser(result.data)
      const result1 = await getAllPostsApi()
      if (result1.status === 200) {
        setAllPosts(result1.data)
      }
    }
    else {
      // console.log(result);
    }
  }


  return (
    <div className='d-none d-md-block d-lg-block' style={{ position: "fixed", zIndex: "1", width: "20%" }}>
      <div style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
        <Link to={'/'} style={{ color: "#000", textDecoration: "none" }}>
          <div className='px-3 py-3 lists' style={{ borderBottom: "1px solid #b3a6e480" }}>
            <h5>Home</h5>
          </div>
        </Link>
        <Link to={'/myposts'} style={{ color: "#000", textDecoration: "none" }}>
          <div className='px-3 py-3 lists d-flex justify-content-between' style={{ borderBottom: "1px solid #b3a6e480" }}>
            <h5>My Posts</h5>
            <h5>{currentUser? currentUser.posts.length>0 ? currentUser.posts.length :0  :0}</h5>
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
        <Link to={'/savedposts'} style={{ color: "#000", textDecoration: "none" }}>
          <div className='px-3 py-3 lists d-flex justify-content-between' style={{ borderBottom: "1px solid #b3a6e480" }}>
            <h5>Saved Posts</h5>
            <h5>{currentUser?currentUser.savedPosts.length>0 ? currentUser.savedPosts.length :0 :0}</h5>
          </div>
        </Link>
        <Link to={'/likedposts'} style={{ color: "#000", textDecoration: "none" }}>
          <div className='px-3 py-3 lists d-flex justify-content-between' style={{ borderBottom: "1px solid #b3a6e480" }}>
            <h5>Liked Posts</h5>
            <h5>{currentUser?currentUser.likedPosts.length>0 ? currentUser.likedPosts.length :0 :0}</h5>
          </div>
        </Link>
        <div className='px-3 py-3 ' style={{ borderBottom: "1px solid #b3a6e480", color: "#fff", cursor: "pointer", backgroundColor: "#be0808", borderRadius: "0px 0px 10px 10px" }} onClick={handleLogout}>
          <h5>Log Out</h5>
        </div>
      </div>
    </div>
  )
}

export default Sidebar