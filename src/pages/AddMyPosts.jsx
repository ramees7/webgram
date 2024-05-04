import React from 'react'
import Nav from '../components/Nav'
import { Col, Row } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import './Home.css'
import SidebarRight from '../components/SidebarRight'
import MyPostsView from '../components/MyPostsView'
import AddPosts from '../components/AddPosts'


function AddMyPosts() {
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
                            <AddPosts />
                            <MyPostsView addpostcomp/>
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

export default AddMyPosts