import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { Col, Row } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import './Home.css'
import SidebarRight from '../components/SidebarRight'
import { addLikeToPostAllApi, addSavedPostInAllPostApi, addSavedPostUserApi, addUserLikedPostAllApi, getAllPostsApi, getAllUserApi, getCurrentUserApi, removeLikeToPostAllApi, removeSavedPostInAllPostApi, removeSavedPostUserApi, removeUserLikedPostAllApi } from '../Services/allApis'
import CommentBox from '../components/CommentBox'
import { BASE_URL } from '../Services/baseUrl'
import { message } from 'antd'
import { commentResponseContext, likedPostsCountContext, savedPostsCountContext } from '../Context/ContextShares'
import { Link } from 'react-router-dom'



function LikedPosts() {

  const [likedPosts, setLikedPosts] = useState("")
  const [currentUser, setCurrentUser] = useState("")
  const [token, setToken] = useState("")
  const [allPosts, setAllPosts] = useState("")
  const [alreadyLikedPost, setAllreadyLikedPost] = useState(false)
  const { likedpostsCount, setLikedPostsCount } = useContext(likedPostsCountContext)
  const { savedpostsCount, setSavedPostsCount } = useContext(savedPostsCountContext)
  const { commentResponse, setCommentResponse } = useContext(commentResponseContext)
  const [search, setSearch] = useState("")
  const [allUser, setAllUser] = useState("")

  useEffect(() => {
    setToken(sessionStorage.getItem("Token"))
  }, [])

  const reqHeader = {
    "Content-Type": "application/json", "Authorization": `bearer ${token}`
  }

  useEffect(() => {
    if (token) {
      handleGetCurrentUser()
    }
    console.log(currentUser, "cuuuuuuuuuuuuuuu")

  }, [token, commentResponse])

  useEffect(() => {
    if (currentUser) {
      setLikedPosts(allPosts.length > 0 && allPosts.filter(posts => currentUser.likedPosts.some(liked => liked.postId === posts._id)))
    }
    console.log(likedPosts, "dfffffffffffffffffffffffffff");
  }, [allPosts, currentUser, commentResponse])

  const handleGetCurrentUser = async () => {
    const result = await getCurrentUserApi(reqHeader)
    if (result.status === 200) {
      console.log(result, "resultttttttt")
      setCurrentUser(result.data)
      const result1 = await getAllPostsApi(reqHeader)
      if (result1.status === 200) {
        setAllPosts(result1.data)
        setLikedPostsCount(result1)
        setSavedPostsCount(result1)
      }
    }
    else {
      console.log(result);
    }
    const res = await getAllUserApi(search)
    if (res.status === 200) {
      console.log(res, "l");
      setAllUser(res.data)
    }
  }
  // ------------------------------------------------
  const handleAddLikeToPost = async (item) => {
    console.log(item, "itemmmmmmmmmmm");
    if (currentUser) {
      console.log(currentUser, "userrrr")
      const likeToPostAllData = {
        likedUserId: currentUser._id
      }
      const userLikedData = {
        postId: item._id
      }
      const alreadyLiked = item.likes.filter(item => item.likedUserId === currentUser._id)
      if (alreadyLiked.length == 0) {
        const res = await addLikeToPostAllApi(likeToPostAllData, item._id, reqHeader)
        if (res.status == 200) {
          console.log(res, "res")
          const res1 = await addUserLikedPostAllApi(userLikedData, currentUser._id, reqHeader)
          if (res1.status === 200) {
            console.log(res1, "res1");
            message.success("liked")
            setAllreadyLikedPost(true)
            handleGetCurrentUser()
          }
          else {
            console.log(res1, "res1");
          }
        }
        else {
          console.log(res)
        }
      }
      else {
        const res = await removeLikeToPostAllApi(likeToPostAllData, item._id, reqHeader)
        if (res.status == 200) {
          console.log(res, "res")
          const res1 = await removeUserLikedPostAllApi(userLikedData, currentUser._id, reqHeader)
          if (res1.status === 200) {
            console.log(res1, "res1")
            message.success("removed")
            setAllreadyLikedPost(false)
            handleGetCurrentUser()
          }
          else {
            console.log(res1, "res1");
          }
        }
        else {
          console.log(res)
        }
      }
    }
    else {
      message.warning("Please Login First")
    }
  }

  const handleAddToSavedPost = async (id) => {
    const res = await addSavedPostInAllPostApi(id, reqHeader)
    if (res.status === 200) {
      console.log(res)
      const res1 = await addSavedPostUserApi(id, reqHeader)
      if (res1.status === 200) {
        console.log(res1)
        message.success("Saved Post")
        handleGetCurrentUser()
      }
      else {
        console.log(res1)
      }
    }
    else {
      console.log(res)
    }
  }

  const handleRemoveToSavedPost = async (id) => {
    const res = await removeSavedPostInAllPostApi(id, reqHeader)
    if (res.status === 200) {
      console.log(res)
      const res1 = await removeSavedPostUserApi(id, reqHeader)
      if (res1.status === 200) {
        console.log(res1)
        message.success("Removed From Saved Post")
        handleGetCurrentUser()
      }
      else {
        console.log(res1)
      }
    }
    else {
      console.log(res)
    }
  }
  // ------------------------------------------------

  return (
    <div >
      <Nav />
      <div style={{ backgroundColor: "#f0eef6" }}>
        <div className='container-lg py-5 mt-5'>
          <Row style={{ paddingBottom: "70px" }}>
            <Col md={3}>
              <Sidebar />
            </Col>
            <Col md={6} style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
              {
                likedPosts.length > 0 ?
                  likedPosts.map(item => (
                    <Row className='g-0 mb-4 pt-3'>
                      {
                        allUser?.length > 0 &&
                        allUser.filter(items => items._id === item.userId).map(itemss => (
                          <Col xs={1} className='d-flex justify-content-center align-items-center'>
                            <Link to={`/userview/${item.username}`}>
                              <img src={`${BASE_URL}/upload/${itemss.image}`} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                            </Link>
                          </Col>
                        ))
                      }
                      <Col xs={11} className='px-3'>
                        <Link to={`/userview/${item.username}`} style={{ textDecoration: "none", color: "#000" }}>
                          <h5 className='mb-0 All-h5'>{item.username}</h5>
                          <h6 className='' style={{ fontSize: "clamp(0.625rem, 0.5694rem + 0.2222vw, 0.75rem)" }}>{item.dateOfPosted.slice(0, 10)}</h6>
                        </Link>
                      </Col>
                      <Col md={12} className='my-3'>
                        <img src={`${BASE_URL}/upload/${item.image}`} alt="" className='img-fluid w-100' style={{ height: "300px", borderRadius: "10px" }} />
                      </Col>
                      <Col md={12} className=''>
                        <h6 className='ms-3 mb-4'>{item.caption}</h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex mt-2">
                            <div className='ms-3 d-flex justify-content-center align-items-center flex-column'>
                              {
                                currentUser ?
                                  item.likes.length > 0 ? item.likes.filter(item => item.likedUserId === currentUser._id) ?
                                    <i className="fa-solid fa-heart mb-2 fa-lg" style={{ color: "red", cursor: "pointer" }} onClick={() => handleAddLikeToPost(item)}></i>
                                    :
                                    <i className="fa-regular fa-heart mb-2 fa-lg " style={{ cursor: "pointer" }} onClick={() => handleAddLikeToPost(item)}></i>
                                    :
                                    <i className="fa-regular fa-heart mb-2 fa-lg" style={{ cursor: "pointer" }} onClick={() => handleAddLikeToPost(item)}></i>
                                  :
                                  <i className="fa-regular fa-heart mb-2 fa-lg" style={{ cursor: "pointer" }}></i>
                              }
                              <h6 className='text-center'>{item.likes.length > 0 ? item.likes.length : 0}</h6>
                            </div>
                            <div className='ms-3 d-flex justify-content-center align-items-center flex-column'>
                              <CommentBox item={item} />
                              <h6 className=''>{item.comments.length}</h6>
                            </div>

                          </div>
                          <div>
                            <i className="fa-solid fa-share-nodes me-3 fa-lg"></i>
                            {
                              currentUser ?
                                item.saved.length > 0 && item.saved.filter(items => items.userId === currentUser._id) ?
                                  <i className="fa-solid fa-bookmark fa-lg me-3" style={{ cursor: "pointer" }} onClick={() => handleRemoveToSavedPost(item._id)}></i>
                                  :
                                  <i className="fa-regular fa-bookmark fa-lg me-3" style={{ cursor: "pointer" }} onClick={() => handleAddToSavedPost(item._id)}></i>
                                :
                                <i className="fa-regular fa-bookmark fa-lg me-3" style={{ cursor: "pointer" }}></i>
                            }

                          </div>
                        </div>

                      </Col>
                    </Row>
                  ))

                  :
                  <div className='d-flex justify-content-center align-items-center flex-column' style={{ minHeight: "550px" }}>
                    <img src="https://cdn-icons-png.freepik.com/512/1361/1361708.png" alt="" className='img-fluid my-3' style={{ width: "200px", height: "200px" }} />
                    <h4 className='fw-bold'>No Post Yet</h4>
                  </div>
              }

            </Col>
            <Col md={3}>
              <SidebarRight />
            </Col>
          </Row>
        </div>
      </div>

    </div>
  )
}

export default LikedPosts