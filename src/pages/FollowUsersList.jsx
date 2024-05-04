import React from 'react'
import Nav from '../components/Nav'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import './Home.css'
import SidebarRight from '../components/SidebarRight'
import { Link } from 'react-router-dom'


function FollowUsersList() {
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
                            <div style={{ minHeight: "551px", backgroundColor:"#fff", borderRadius:"10px"}} className='py-4 px-5 '>
                                <Tabs defaultActiveKey="profile" id="fill-tab-example" className="mb-3" fill  style={{color:"#000"}}>
                                    <Tab eventKey="home" title="Followers">
                                        <div className='py-2 d-flex justify-content-between align-items-center my-2' style={{borderBottom:'1px solid #b3a6e480'}}>
                                            <h6>Username</h6>
                                            <Link to={'/register'}><button style={{border:"none",backgroundColor:"#6b4ce6", borderRadius:"15px", color:"#fff"}} className='py-2 px-4 mx-2'>UnFollow</button></Link>
                                        </div>
                                        <div className='py-2 d-flex justify-content-between align-items-center my-2' style={{borderBottom:'1px solid #b3a6e480'}}>
                                            <h6>Username</h6>
                                            <Link to={'/register'}><button style={{border:"none",backgroundColor:"#6b4ce6", borderRadius:"15px", color:"#fff"}} className='py-2 px-4 mx-2'>UnFollow</button></Link>
                                        </div>
                                        <div className='py-2 d-flex justify-content-between align-items-center my-2' style={{borderBottom:'1px solid #b3a6e480'}}>
                                            <h6>Username</h6>
                                            <Link to={'/register'}><button style={{border:"none",backgroundColor:"#6b4ce6", borderRadius:"15px", color:"#fff"}} className='py-2 px-4 mx-2'>UnFollow</button></Link>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="profile" title="Following">
                                    <div className='py-2 d-flex justify-content-between align-items-center my-2' style={{borderBottom:'1px solid #b3a6e480'}}>
                                            <h6>Username</h6>
                                            <Link to={'/register'}><button style={{border:"none",backgroundColor:"#6b4ce6", borderRadius:"15px", color:"#fff"}} className='py-2 px-4 mx-2'>UnFollow</button></Link>
                                        </div>
                                        <div className='py-2 d-flex justify-content-between align-items-center my-2' style={{borderBottom:'1px solid #b3a6e480'}}>
                                            <h6>Username</h6>
                                            <Link to={'/register'}><button style={{border:"none",backgroundColor:"#6b4ce6", borderRadius:"15px", color:"#fff"}} className='py-2 px-4 mx-2'>UnFollow</button></Link>
                                        </div>
                                        <div className='py-2 d-flex justify-content-between align-items-center my-2' style={{borderBottom:'1px solid #b3a6e480'}}>
                                            <h6>Username</h6>
                                            <Link to={'/register'}><button style={{border:"none",backgroundColor:"#6b4ce6", borderRadius:"15px", color:"#fff"}} className='py-2 px-4 mx-2'>UnFollow</button></Link>
                                        </div>
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