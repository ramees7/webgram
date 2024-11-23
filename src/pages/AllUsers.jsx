import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import './Home.css'
import SidebarRight from '../components/SidebarRight'
import { addToFollowersApi, addToFollowingApi, getAllUserApi, unFollowersApi, unFollowingApi } from '../Services/allApis'
import { message } from 'antd'
import { BASE_URL } from '../Services/baseUrl'
import { followCountContext } from '../Context/ContextShares'
import { Link } from 'react-router-dom'


function AllUsers() {
    const [users, setUsers] = useState("")
    const [token, setToken] = useState("")
    const [currentUser, setCurrentUser] = useState("")
    const [currentUser1, setCurrentUser1] = useState("")
    const { followCount, setFollowCount } = useContext(followCountContext)
    const [search, setSearch] = useState("")


    useEffect(() => {
        setToken(sessionStorage.getItem("Token"))
        // console.log(token)
        setCurrentUser1(JSON.parse(sessionStorage.getItem("Existing User")))
        // console.log(currentUser1, "cu")
    }, [])

    useEffect(() => {
        handleGetFollowers()
        // console.log(currentUser1, "iiiiiiiiiiiiiii");
    }, [currentUser1, search]);



    const reqHeader = {
        "Content-Type": "application/json", "Authorization": `bearer ${token}`
    }

    const handleGetFollowers = async () => {
        const res = await getAllUserApi(search)
        if (res.status === 200) {
            if (currentUser1) {
                setUsers(res.data.filter(item => item._id !== currentUser1._id))
                setCurrentUser(res.data.filter(item => item._id === currentUser1._id))
            }
            else {
                setUsers(res.data)
            }
            // console.log(res);
        }
    }

    const handleFollowing = async (item) => {
        // console.log(item, "fiste");
        if (currentUser) {
            const alreadyFollowed = item.followers.filter(item => item.userId === currentUser1._id)
            if (alreadyFollowed.length == 0) {
                const updatedFollowingUser = {
                    userId: item._id
                };
                // console.log(updatedFollowingUser);
                const res = await addToFollowingApi(updatedFollowingUser, reqHeader)
                if (res.status === 200) {
                    // console.log(res, "following")
                    const result = await addToFollowersApi(item._id, reqHeader)
                    if (result.status === 200) {
                        // console.log(result)
                        message.success(`Followed ${item.username}`)
                        handleGetFollowers()
                        setFollowCount(result)
                    }
                    else {
                        // console.log(result);
                    }
                }
                else {
                    // console.log(res);
                }
            }
            else {
                const res = await unFollowingApi(item._id, reqHeader)
                if (res.status === 200) {
                    // console.log(res);
                    const res2 = await unFollowersApi(item._id, reqHeader)
                    if (res2.status === 200) {
                        // console.log(res2)
                        message.success(`Unfollowed ${item.username}`)
                        handleGetFollowers()
                        setFollowCount(res2)
                    }
                    else {
                        // console.log(res2);
                    }
                }
            }
        }
        else {
            message.warning("Please Login First")
        }
    }

    useEffect(() => {
        // console.log(users, "lpl");
        if (users && currentUser1) {
            const h = users?.length > 0 && users.map(item => item.followers.length > 0 && item.followers.some(items => items.userId === currentUser1._id))
            console.log(h, "jhhhhhhhhhhhhhhhhhhho");
        }
    }, [users, currentUser1])


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
                                <h4 className='text-center mb-4 fw-bold'>Users List</h4>
                                <form className="d-flex mb-4" >
                                    <input className="form-control me-2 border-0" style={{ backgroundColor: "#f0f0f0" }} type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setSearch(e.target.value) }} />
                                </form>
                                {
                                    users ?
                                        users.map(item => (
                                            <div className='py-2 d-flex justify-content-between align-items-center my-2' style={{ borderBottom: '1px solid #b3a6e480' }}>
                                                <Link to={`/userview/${item.username}`} style={{ textDecoration: "none", color: "#000" }}>
                                                    <div className='d-flex align-items-center'>
                                                        <img src={item.image && `${BASE_URL}/upload/${item.image}`} alt="" width={40} height={40} style={{ borderRadius: "50%" }} />
                                                        <h6 className='ms-3 mb-0'>{item.username}</h6>
                                                    </div>
                                                </Link>
                                                {
                                                    currentUser1 &&
                                                        item.followers.length > 0 ? item.followers.some(items => items.userId === currentUser1._id) ?
                                                        <button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-4 mx-2' onClick={() => handleFollowing(item)}>Unfollow</button>

                                                        :
                                                        <button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-4 mx-2' onClick={() => handleFollowing(item)}>Follow</button>
                                                        :
                                                        <button style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-4 mx-2' onClick={() => handleFollowing(item)}>Follow</button>
                                                }

                                            </div>
                                        ))
                                        : ""
                                }
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

export default AllUsers