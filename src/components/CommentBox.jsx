import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { BASE_URL } from '../Services/baseUrl';
import { message } from 'antd';
import { addCommentReplyToPostApi, addCommentToPostApi, deleteCommentToPostApi, removeCommentReplyToPostApi } from '../Services/allApis';
import { commentResponseContext } from '../Context/ContextShares';


function CommentBox({ item }) {

    const [show, setShow] = useState(false)
    const [currentUser, setCurrentUser] = useState("")
    const [token, setToken] = useState("")
    const [commentData, setCommentData] = useState({
        comment: "", dateOfCommented: new Date(), username: ""
    })
    const [commentReplyData, setCommentReplyData] = useState({
        reply: "", dateOfReply: new Date(), username: ""
    })
    const [replyBtn, setReplyBtn] = useState(false)
    const [replyCommentId, setReplyCommentId] = useState("")
    const { commentResponse, setCommentResponse} = useContext(commentResponseContext)

    useEffect(() => {
        setCurrentUser(JSON.parse(sessionStorage.getItem("Existing User")))
        setToken(sessionStorage.getItem("Token"))
    }, [])

    useEffect(() => {
        if (currentUser) {
            setCommentData({ ...commentData, username: currentUser.username })
            setCommentReplyData({ ...commentReplyData, username: currentUser.username })
        }
    }, [currentUser])

    const reqHeader = {
        "Content-Type": "application/json", "Authorization": `bearer ${token}`
    }

    const handleChangeToReply = (commentId) => {
        setReplyBtn(true)
        setReplyCommentId(commentId)
        console.log(commentId, "pokloklo");
    }
    const handleChangeToComment = () => {
        setReplyBtn(false)
    }


    const handleAddComment = async () => {
        if (currentUser) {
            console.log(commentData, "1");
            if (!commentData.comment || !commentData.username) {
                message.warning("Please Enter Comment")
            }
            else {
                console.log(commentData, "2")
                const res = await addCommentToPostApi(commentData, item._id, reqHeader)
                if (res.status === 200) {
                    console.log(res)
                    message.success("Comment Added")
                    setCommentResponse(res)
                }
                else {
                    console.log(res)
                    message.error("Something Went Wrong")
                }
            }
        }
    }

    const handleAdCommentReply = async () => {
        console.log(replyCommentId, "poiuyt")
        if (currentUser) {
            console.log(commentReplyData, "1");
            if (!commentReplyData.reply || !commentReplyData.username) {
                message.warning("Please Enter Reply")
            }
            else {
                console.log(commentReplyData, "2")
                const res = await addCommentReplyToPostApi(commentReplyData, item._id, replyCommentId, reqHeader)
                if (res.status === 200) {
                    console.log(res)
                    message.success("Replyed the Comment")
                    setCommentResponse(res)
                }
                else {
                    console.log(res)
                    message.error("Something Went Wrong")
                }
            }
        }
    }

    const handleDeleteComment = async (item, items) => {
        if (currentUser) {
            const res = await deleteCommentToPostApi(item._id, items.commentId, reqHeader)
            if (res.status === 200) {
                console.log(res)
                message.success("Comment Deleted")
                setCommentResponse(res)
            }
            else {
                console.log(res)
                message.error("Something Went Wrong")
            }
        }
    }

    const handledeleteCommentReplay = async (item, items) => {
        if (currentUser) {
            const res = await removeCommentReplyToPostApi(item._id, items.commentId, reqHeader)
            if (res.status === 200) {
                console.log(res)
                message.success("Comment Replay Deleted")
                setCommentResponse(res)
            }
            else {
                console.log(res)
                message.error("Something Went Wrong")
            }
        }
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div>
            <button onClick={handleShow} className='border-0 bg-white p-0 d-flex flex-column'>
                <i className="fa-regular fa-comment mb-2 fa-lg"></i>
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Row className='g-0'>
                        <Col sm={5}>
                            <div className='d-flex justify-content-center align-items-center h-100 flex-column'>
                                <img src={`${BASE_URL}/upload/${item.image}`} alt="" className='img-fluid' />
                                <h6>{item.caption}</h6>
                            </div>
                        </Col>
                        <Col sm={7} className='px-2'>
                            <div style={{ minHeight: "80vh", overflowY: "scroll" }}>
                                {
                                    item.comments.length > 0 ?
                                        item.comments.map(items => (
                                            <div style={{ border: "1px solid gray" }} className='my-1 p-2'>
                                                <div className=' d-flex justify-content-between' >
                                                    <div>
                                                        <h6 style={{ fontSize: "10px" }} className='text-start mb-0'>{items.username}</h6>
                                                        <h6 style={{ fontSize: "8px" }} className='text-start mb-0'>{items?.dateOfCommented}</h6>
                                                        <h6 className='text-start'>{items.comment}</h6>
                                                    </div>
                                                    <div className='d-grid mb-2'>
                                                        <button className='border-1 px-1 bg-white mb-1' onClick={() => handleChangeToReply(items.commentId)}>reply</button>
                                                        {
                                                            currentUser &&
                                                            items.userId === currentUser._id &&
                                                            <i className="fa-solid fa-trash text-end" style={{ cursor: "pointer" }} onClick={() => handleDeleteComment(item, items)}></i>
                                                        }

                                                    </div>
                                                </div>
                                                {
                                                    items.reply.length > 0 ?
                                                        items.reply.map(reply => (
                                                            <>
                                                                <div className='w-100'>
                                                                    <h6 style={{ fontSize: "10px" }} className='text-center'>Replies</h6>
                                                                </div>

                                                                <div className='mt-1 d-flex justify-content-end w-100'>
                                                                    <div className='d-flex justify-content-between w-100'>
                                                                        {
                                                                            currentUser &&
                                                                            reply.userId === currentUser._id &&
                                                                            <i className="fa-solid fa-trash text-end my-auto" style={{ cursor: "pointer" }} onClick={() => handledeleteCommentReplay(item, items)}></i>
                                                                        }
                                                                        <div>
                                                                            <h6 style={{ fontSize: "10px" }} className='text-end mb-0'>{reply.username}</h6>
                                                                            <h6 style={{ fontSize: "8px" }} className='text-end mb-0'>{reply.dateOfReply.slice(0, 10)}</h6>
                                                                            <h6 className='text-end'>{reply.reply}</h6>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </>
                                                        ))
                                                        :
                                                        ""
                                                }
                                            </div>
                                        ))
                                        :
                                        <div className=' d-flex justify-content-center align-items-center h-100'>
                                            <h5 >No Comments</h5>
                                        </div>
                                }
                            </div>
                            <div style={{ position: "absolute", bottom: "15px" }} >
                                {
                                    replyBtn ?
                                        <div>
                                            <h6 style={{ fontSize: "10px", cursor: "pointer" }} className='mb-0 text-end' onClick={handleChangeToComment}>cancel reply <i class="fa-solid fa-xmark"></i></h6>
                                            <form action="" className='d-flex w-100' onSubmit={handleAdCommentReply}>
                                                <input type="text" placeholder='Reply Comment Here' style={{ width: "225px" }} onChange={(e) => { setCommentReplyData({ ...commentReplyData, reply: e.target.value }) }} />
                                                <button className='border-0 p-2 bg-white' disabled={!currentUser || !commentReplyData.reply}><i class="fa-brands fa-telegram fa-xl"></i></button>
                                            </form>
                                        </div>
                                        :
                                        <form action="" className='d-flex w-100' onSubmit={handleAddComment}>
                                            <input type="text" placeholder='Comment Here' style={{ width: "225px" }} onChange={(e) => { setCommentData({ ...commentData, comment: e.target.value }) }} />
                                            <button className='border-0 p-2 bg-white' disabled={!currentUser || !commentData.comment}><i class="fa-brands fa-telegram fa-xl"></i></button>
                                        </form>
                                }

                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CommentBox