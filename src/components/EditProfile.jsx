import React, { useEffect, useState } from 'react'
import { Col, Row, Button, Form } from 'react-bootstrap'
import editProfileIconImg from '../Assets/edit-profile-icon.png'
import { BASE_URL } from '../Services/baseUrl'
import { message } from 'antd'
import { updateProfileApi } from '../Services/allApis'
import { useNavigate } from 'react-router-dom'

function EditProfile() {


    const [validated, setValidated] = useState(false)
    const [currentUser, setCurrentUser] = useState("")
    const [token, setToken] = useState("")
    const [preview, setPreview] = useState("")
    const navigate=useNavigate("")
    const [updateData, setUpdateData] = useState({
        name: "", username: "", image: "", bio: ""
    })

    useEffect(() => {
        setCurrentUser(JSON.parse(sessionStorage.getItem("Existing User")))
        setToken(sessionStorage.getItem("Token"))
    }, [])

    const reqHeaderForm = {
        "Content-Type": "multipart/form-data", "Authorization": `bearer ${token}`
    }

    const reqHeader = {
        "Content-Type": "application/json", "Authorization": `bearer ${token}`
    }

    useEffect(()=>{
        if(updateData.image){
            setPreview(URL.createObjectURL(updateData.image))
        }
    },[updateData.image])

    const handleSubmit = async (event) => {
        const form = event.currentTarget
        // console.log(updateData);
        event.preventDefault()
        if (currentUser) {
            // console.log(form.checkValidity() === false);
            if (form.checkValidity() === false) {
                event.stopPropagation()
                message.warning("Enter valid Data")
            }
            else {
                if (updateData.image) {
                    // console.log("============================");
                    const formData = new FormData()
                    formData.append('name', updateData.name ? updateData.name : currentUser.name)
                    formData.append('username', updateData.username ? updateData.username : currentUser.username)
                    formData.append('image', updateData.image ? updateData.image : currentUser.image)
                    formData.append('bio', updateData.bio ? updateData.bio : currentUser.bio)
                    const res = await updateProfileApi(formData, reqHeaderForm)
                    if (res.status == 200) {
                        // console.log(res)
                        message.success("Profile Updated")
                        setValidated(true)
                        sessionStorage.clear()
                        navigate('/login')
                    }
                    else {
                        // console.log(res)
                    }
                }
                else {
                    // console.log("!!!!!!!!!!!!!!");
                    const updatedProfileData = {
                        name: updateData.name ? updateData.name : currentUser.name,
                        username: updateData.username ? updateData.username : currentUser.username,
                        image: updateData.image ? updateData.image : currentUser.image,
                        bio: updateData.bio ? updateData.bio : currentUser.bio,
                        // phone:currentUser.phone,
                        // password:currentUser.password,
                        // confirmpassword:currentUser.confirmpassword,
                        // email:currentUser.email,
                        // phone:currentUser.phone,
                        // followers:currentUser.followers,
                        // following:currentUser.following,
                        // posts:currentUser.posts,
                        // savedPosts:currentUser.savedPosts,
                        // likedPosts:currentUser.likedPosts,
                        // dateOfRegister:currentUser.dateOfRegister,
                        // story:currentUser.story
                    }
                    // console.log(updatedProfileData, "pppppppppppppppppppppppp")
                    const res1 = await updateProfileApi(updatedProfileData, reqHeader)
                    if (res1.status == 200) {
                        // console.log(res1)
                        message.success("Profile Updated")
                        setValidated(true)
                        sessionStorage.clear()
                        navigate('/login')
                    }
                    else {
                        // console.log(res1)
                    }
                }
            }
        }
        else {
            message.success("Please Login First")
        }
    }

    return (
        <div className='p-lg-5 py-md-5'>
            {
                currentUser?
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group as={Col} md="12" controlId="validationCustom02" className='my-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" defaultValue={currentUser ? currentUser.name : ""} style={{ height: "50px" }} required onChange={(e) => { setUpdateData({ ...updateData, name: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationCustom02" className='my-3'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" defaultValue={currentUser ? currentUser.username : ""} style={{ height: "50px" }} required onChange={(e) => { setUpdateData({ ...updateData, username: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control as="textarea" defaultValue={currentUser ? currentUser.bio : ""} rows={3} placeholder='Bio' onChange={(e) => { setUpdateData({ ...updateData, bio: e.target.value }) }} />
                        </Form.Group>
                    </Col>
                    <Col md={6} className=' d-flex justify-content-center align-items-center'>
                        <Form.Group controlId="validationCustom01">
                            <label htmlFor="addpost" className=''>
                                <input type="file" id='addpost' style={{ display: "none" }} className='w-100' onChange={(e) => { setUpdateData({ ...updateData, image: e.target.files[0] }) }} />
                                <img src={preview ? preview:`${BASE_URL}/upload/${currentUser.image}`} alt="" className='img-fluid ' style={{ width: "300px", height: "300px", borderRadius: "50%" }} />
                            </label>
                        </Form.Group>
                    </Col>
                    <Col md={12} className='my-5'>
                        <div className="d-flex justify-content-center w-100">
                            <Button type="submit" style={{ border: "none", backgroundColor: "#6b4ce6", borderRadius: "15px", color: "#fff" }} className='py-2 px-3'>Update</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
            :
            <div style={{minHeight:"460px"}}>
                <h3 className='text-center'>Not Logined Yet</h3>
            </div>
            }

        </div>



    )
}

export default EditProfile