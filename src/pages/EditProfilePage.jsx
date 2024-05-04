import React from 'react'
import Nav from '../components/Nav'
import { Col, Row } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import './Home.css'
import EditProfile from '../components/EditProfile'

function EditProfilePage() {
  return (
    <div >
      <Nav />
      <div style={{backgroundColor:"#f0eef6"}}>
        <div className='container-lg py-5 mt-5'>
          <Row>
            <Col md={3}>
              <Sidebar/>
            </Col>
            <Col md={9}>
              <EditProfile/>
            </Col>
          </Row>
        </div>
      </div>

    </div>
  )
}

export default EditProfilePage