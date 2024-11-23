import React, { useEffect, useState, useContext } from 'react'
import Nav from '../components/Nav'
import { Carousel, Col, Modal, Row } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import './Home.css'
import SidebarRight from '../components/SidebarRight'
import { Link, useLocation } from 'react-router-dom'
import { BASE_URL } from '../Services/baseUrl'
import { addLikeToPostAllApi, addSavedPostInAllPostApi, addSavedPostUserApi, addUserLikedPostAllApi, getAllPostsApi, getCurrentUserApi, removeLikeToPostAllApi, removeSavedPostInAllPostApi, removeSavedPostUserApi, removeUserLikedPostAllApi, getAllUserApi, getAllStoriesApi, unFollowersApi, unFollowingApi, addToFollowersApi, addToFollowingApi } from '../Services/allApis'
import { message } from 'antd'
import CommentBox from '../components/CommentBox'
import { commentResponseContext, followCountContext, likedPostsCountContext, savedPostsCountContext } from '../Context/ContextShares'




function UserView() {
    const [show, setShow] = useState(false)
    const [activeUrl, setActiveUrl] = useState("")
    const location = useLocation()
    const search="";
    // const [search, setSearch] = useState("")
    const [userDetail, setUserDetail] = useState("")
    const [user, setUser] = useState("")
    const [currentUser, setCurrentUser] = useState("")
    // const [alreadyLikedPost, setAllreadyLikedPost] = useState(false)
    const [userPosts, setUserPosts] = useState("")
    const [token, setToken] = useState("")
    const {  setLikedPostsCount } = useContext(likedPostsCountContext)
    const { setSavedPostsCount } = useContext(savedPostsCountContext)
    const { commentResponse } = useContext(commentResponseContext)
    const [allStories, setAllStories] = useState('')
    const {  setFollowCount } = useContext(followCountContext)


    useEffect(() => {
        setActiveUrl(location.pathname.slice(10))

    }, [location])
    useEffect(() => {
        if (activeUrl) {
            handleGetAllUsers()
        }
    }, [activeUrl])

    const handleGetAllUsers = async () => {
        const res = await getAllUserApi(search)
        if (res.status === 200) {
            console.log(res, "1");
            setUserDetail(res.data.filter(item => item.username === activeUrl))
        }
    }
    console.log(userDetail, "userdetail");



    useEffect(() => {
        setToken(sessionStorage.getItem("Token"))
        console.log(token)
        setCurrentUser(JSON.parse(sessionStorage.getItem("Existing User")))
    }, [token])

    useEffect(() => {
        handleGetUser()
        if (userDetail) {
            handleGetAllStories()
            handleGetAllPosts()
        }
    }, [token, commentResponse, userDetail])

    const reqHeader = {
        "Content-Type": "application/json", "Authorization": `bearer ${token}`
    }

    const handleGetUser = async () => {

        const res = await getCurrentUserApi(reqHeader)
        if (res.status === 200) {
            setUser(res.data)
            console.log(res, "op")
        }
        else {
            console.log(res);
        }
    }

    console.log(user, "userrrrrr");
    console.log(userDetail[0], "okkkkkkkkkkkkkkkkkk");
    const handleGetAllPosts = async () => {
        const res = await getAllPostsApi()
        if (res.status === 200) {
            if (userDetail) {
                setUserPosts(res.data.filter(item => item.userId === userDetail[0]._id))
            }
            console.log(res, "res")
            setSavedPostsCount(res)
            setLikedPostsCount(res)
        }
    }
    console.log(userPosts, "userposts");

    const handleGetAllStories = async () => {
        const res = await getAllStoriesApi()
        if (res.status === 200) {
            console.log(res, "stories")
            setAllStories(res.data)
        }
        else {
            console.log(res)
        }
    }

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
            if (alreadyLiked.length === 0) {
                const res = await addLikeToPostAllApi(likeToPostAllData, item._id, reqHeader)
                if (res.status === 200) {
                    console.log(res, "res")
                    const res1 = await addUserLikedPostAllApi(userLikedData, currentUser._id, reqHeader)
                    if (res1.status === 200) {
                        console.log(res1, "res1");
                        message.success("liked")
                        // setAllreadyLikedPost(true)
                        handleGetAllPosts()
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
                if (res.status === 200) {
                    console.log(res, "res")
                    const res1 = await removeUserLikedPostAllApi(userLikedData, currentUser._id, reqHeader)
                    if (res1.status === 200) {
                        console.log(res1, "res1")
                        message.success("removed")
                        // setAllreadyLikedPost(false)
                        handleGetAllPosts()
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
                handleGetAllPosts()
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
                handleGetAllPosts()
            }
            else {
                console.log(res1)
            }
        }
        else {
            console.log(res)
        }
    }

 
    const handleFollowing = async (item) => {
        console.log(item, "fiste");
        if (user) {
            const alreadyFollowed = item.followers.filter(item => item.userId === user._id)
            if (alreadyFollowed.length === 0) {
                const updatedFollowingUser = {
                    userId: item._id
                };
                console.log(updatedFollowingUser);
                const res = await addToFollowingApi(updatedFollowingUser, reqHeader)
                if (res.status === 200) {
                    console.log(res, "following")
                    const result = await addToFollowersApi(item._id, reqHeader)
                    if (result.status === 200) {
                        console.log(result)
                        message.success(`Followed ${item.username}`)
                        handleGetAllUsers()
                        setFollowCount(result)
                    }
                    else {
                        console.log(result);
                    }
                }
                else {
                    console.log(res);
                }
            }
            else {
                const res = await unFollowingApi(item._id, reqHeader)
                if (res.status === 200) {
                    console.log(res);
                    const res2 = await unFollowersApi(item._id, reqHeader)
                    if (res2.status === 200) {
                        console.log(res2)
                        message.success(`Unfollowed ${item.username}`)
                        handleGetAllUsers()
                        setFollowCount(res2)
                    }
                    else {
                        console.log(res2);
                    }
                }
            }
        }
        else {
            message.warning("Please Login First")
        }
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div >
            <Nav />
            <div style={{ backgroundColor: "#f0eef6" }}>
                <div className='container-lg py-5 mt-5'>
                    <Row>
                        <Col md={3}>
                            <Sidebar />
                        </Col>
                        <Col md={6}>
                            <div style={{ minHeight: "551px", backgroundColor: "#fff" }} className='py-4'>
                                <div>
                                    <Row className='g-0 d-flex align-items-center px-lg-5 pb-4' style={{ borderBottom: '1px solid #b3a6e480' }}>
                                        <Col xs={4} className='text-center'>
                                            {
                                                userDetail[0]?.story?.length > 0 ?
                                                    <img src={`${BASE_URL}/upload/${userDetail[0]?.image}`} alt="" className='img-fluid' onClick={handleShow} style={{ width: "100px", borderRadius: "50%", height: "100px" }} />
                                                    :
                                                    <img src={`${BASE_URL}/upload/${userDetail[0]?.image}`} alt="" className='img-fluid' style={{ width: "100px", borderRadius: "50%", height: "100px" }} />
                                            }
                                        </Col>
                                        <Col xs={8} className='pe-md-0 pe-sm-5 pe-lg-5'>
                                            {
                                                userDetail ?
                                                    <>
                                                        <div>
                                                            <h3 className='mb-0'>{userDetail[0]?.name}</h3>
                                                            <h6>@{userDetail[0]?.username}</h6>
                                                        </div>
                                                        <div className='d-flex justify-content-between mt-2'>
                                                            <div>
                                                                <h5>Posts</h5>
                                                                <h6 className='text-center'>{userDetail[0].posts.length}</h6>
                                                            </div>
                                                            <div>
                                                                <h5>Following</h5>
                                                                <h6 className='text-center'>{userDetail[0].following.length}</h6>
                                                            </div>
                                                            <div>
                                                                <h5>Followers</h5>
                                                                <h6 className='text-center'>{userDetail[0].followers.length}</h6>
                                                            </div>
                                                        </div>
                                                        <Modal show={show} onHide={handleClose}>

                                                            <Carousel>
                                                                {
                                                                    userDetail[0]?.story?.length > 0 &&
                                                                    allStories.length > 0 && allStories.filter(stories => stories.userId === userDetail[0]._id).map(item => (
                                                                        <Carousel.Item>
                                                                            <div>
                                                                                <div style={{ position: "absolute", top: "20px" }} className=' d-flex align-items-center justify-content-between w-100 pe-5'>
                                                                                    <div className='mx-4 d-flex align-items-center'>
                                                                                        <img src={`${BASE_URL}/upload/${userDetail[0]?.image}`} alt="" style={{ width: "45px", height: "45px", border: "2px solid #6b4ce6 ", borderRadius: "50%" }} />
                                                                                        <div>
                                                                                            <h6 className='mx-2 mb-0'>{userDetail[0].username}</h6>
                                                                                            <h6 className='mx-2 mb-0' style={{ fontSize: "10px" }}>{item.dateOfPostedStory.slice(0, 10)}</h6>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <img src={`${BASE_URL}/upload/${item.image}`} alt="" className='img-fluid w-100 ' style={{ height: "70vh" }} />
                                                                            </div>
                                                                        </Carousel.Item>
                                                                    ))
                                                                }
                                                            </Carousel>

                                                        </Modal>
                                                        {
                                                            user ?
                                                                userDetail[0] &&
                                                                    user.following.length > 0 && user.following.some(items => items.userId === userDetail[0]._id) ?
                                                                        <div className='text-center mt-2'>
                                                                            <button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-4 w-50' onClick={()=>handleFollowing(userDetail[0])}>UnFollow</button>

                                                                        </div>
                                                                        :
                                                                        <div className='text-center mt-2'>
                                                                            <button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-4 w-50'  onClick={()=>handleFollowing(userDetail[0])}>Follow</button>

                                                                        </div>
                                                                    : ""
                                                        }

                                                    </>
                                                    :
                                                    <h6 style={{ color: "red" }}>Something Went Wrong</h6>
                                            }
                                        </Col>
                                    </Row>
                                    <div className='mt-4 p-3'>
                                        {
                                            userPosts.length > 0 ?
                                                userPosts.map(item => (
                                                    <Row className='g-0 mb-4'>
                                                        <Col xs={1} className='d-flex justify-content-center align-items-center'>
                                                            <img src={`${BASE_URL}/upload/${userDetail[0]?.image}`} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                                                        </Col>
                                                        <Col xs={11} className='px-3' >
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
                                                <div className='d-flex justify-content-center align-items-center flex-column' style={{ minHeight: "320px" }}>
                                                    <img src="https://cdn-icons-png.freepik.com/512/1361/1361708.png" alt="" className='img-fluid my-3' style={{ width: "200px", height: "200px" }} />
                                                    <h4 className='fw-bold'>Not posted yet</h4>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
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

export default UserView