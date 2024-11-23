import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import './Home.css'
import SidebarRight from '../components/SidebarRight'
import { Link } from 'react-router-dom'
import { addToFollowersApi, addToFollowingApi, getAllUserApi, getCurrentUserApi, unFollowersApi, unFollowingApi } from '../Services/allApis'
import { BASE_URL } from '../Services/baseUrl'
import { message } from 'antd'
import { followCountContext } from '../Context/ContextShares'


function FollowUsersList() {
    const [followers, setFollowers] = useState("")
    const [followings, setFollowings] = useState("")
    const [token, setToken] = useState("")
    const [allUsers, setAllUsers] = useState("")
    const [currentUser, setCurrentUser] = useState("")
    const { setFollowCount } = useContext(followCountContext)
    const [search, setSearch] = useState("")

    // const location=useLocation()

    useEffect(() => {
        setToken(sessionStorage.getItem("Token"))
        console.log(token)
    }, [])

    // useEffect(()=>{
    //     console.log(location.pathname,"sssssssssssssssssssssssssssss");
    // }, [location]);



    useEffect(() => {
        handleGetFollowers()
        handleGetAllUsers()
        const h = followers.length > 0 && allUsers.length > 0 && allUsers.filter(items => followers.some(itemss => itemss.userId === items._id))
        // console.log(h, "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");

    }, [token, search])

    const reqHeader = {
        "Content-Type": "application/json", "Authorization": `bearer ${token}`
    }


    const handleGetFollowers = async () => {

        const res = await getCurrentUserApi(reqHeader)
        if (res.status === 200) {
            setCurrentUser(res.data)
            setFollowers(res.data.followers)
            setFollowings(res.data.following)
            // console.log(res, "res");
        }
    }
    // console.log(followings, "follo");

    const handleGetAllUsers = async () => {
        const res = await getAllUserApi(search)
        if (res.status === 200) {
            setAllUsers(res.data)
        }
    }

    const handleAddFollowers = async (item) => {
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
                handleGetFollowers()
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

    const handleUnfollowUser = async (item) => {
        const res = await unFollowingApi(item._id, reqHeader)
        if (res.status === 200) {
            console.log(res);
            const res2 = await unFollowersApi(item._id, reqHeader)
            if (res2.status === 200) {
                console.log(res2)
                message.success(`Unfollowed ${item.username}`)
                handleGetFollowers()
                handleGetAllUsers()
                setFollowCount(res2)
            }
            else {
                console.log(res2);
            }
        }
    }

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
                            <div style={{ minHeight: "551px", backgroundColor: "#fff", borderRadius: "10px" }} className='py-4 px-5 '>
                                <Tabs defaultActiveKey="profile" id="fill-tab-example" className="mb-3" fill style={{ color: "#000" }}>
                                    <Tab eventKey="home" title="Followers">
                                        <form className="d-flex mb-4" >
                                            <input className="form-control me-2 border-0" style={{ backgroundColor: "#f0f0f0" }} type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setSearch(e.target.value) }} />
                                        </form>
                                        {
                                            followers && allUsers &&
                                                followers.length > 0 ? allUsers.length > 0 && allUsers.filter(users => followers.some(follo => follo.userId === users._id)).map(item => (
                                                    <div className='py-2 d-flex justify-content-between align-items-center my-2' style={{ borderBottom: '1px solid #b3a6e480' }}>
                                                        <Link to={`/userview/${item.username}`} style={{ textDecoration: "none", color: "#000" }}>
                                                            <div className='d-flex align-items-center'>
                                                                <img src={`${BASE_URL}/upload/${item.image}`} alt="" width={40} height={40} style={{ borderRadius: "50%" }} />
                                                                <h6 className='ms-3 mb-0'>{item.username}</h6>
                                                            </div>
                                                        </Link>
                                                        {
                                                            item.followers.length > 0 && item.followers.some(items => items.userId === currentUser._id) ?
                                                                <button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-4 mx-2' onClick={() => handleUnfollowUser(item)}>UnFollow</button>
                                                                :
                                                                <button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-4 mx-2' onClick={() => handleAddFollowers(item)}>Follow</button>
                                                        }

                                                    </div>
                                                ))
                                                :
                                                <h3 className='text-center mt-5 pt-5'>No Followers Yet</h3>
                                        }
                                    </Tab>
                                    <Tab eventKey="profile" title="Following">
                                        <form className="d-flex mb-4" >
                                            <input className="form-control me-2 border-0" style={{ backgroundColor: "#f0f0f0" }} type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setSearch(e.target.value) }} />
                                        </form>
                                        {
                                            followings &&
                                                followings.length > 0 ? allUsers.length > 0 && allUsers.filter(users => followings.some(follo => follo.userId === users._id)).map(item => (
                                                    <div className='py-2 d-flex justify-content-between align-items-center my-2' style={{ borderBottom: '1px solid #b3a6e480' }}>
                                                        <Link to={`/userview/${item.username}`} style={{ textDecoration: "none", color: "#000" }}>
                                                            <div className='d-flex align-items-center w-75'>
                                                                <img src={`${BASE_URL}/upload/${item.image}`} alt="" width={40} height={40} style={{ borderRadius: "50%" }} />
                                                                <h6 className='ms-3 mb-0'>{item.username}</h6>
                                                            </div>
                                                        </Link>
                                                        <button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-4 mx-2' onClick={() => handleUnfollowUser(item)}>UnFollow</button>
                                                    </div>
                                                ))
                                                :
                                                <h3 className='text-center mt-5 pt-5'>No Followings Yet</h3>
                                        }
                                    </Tab>
                                </Tabs>
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

export default FollowUsersList