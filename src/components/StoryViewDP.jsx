import React, { useContext, useEffect, useState } from 'react'
import nonUserDp from '../Assets/profile-non-user.jpg'
import { BASE_URL } from '../Services/baseUrl'
import { Carousel, Modal } from 'react-bootstrap';
import { deleteStoryInAllStoriesApi, deleteStoryInUserApi, getAllStoriesApi } from '../Services/allApis';
import { message } from 'antd';
import { storyResponseContext } from '../Context/ContextShares';

function StoryViewDP(item) {
    const [show, setShow] = useState(false)
    const [allStories, setAllStories] = useState('')
    const [token, setToken] = useState('')
    const { storyResponse, setStoryResponse } = useContext(storyResponseContext)


    useEffect(() => {
        setToken(sessionStorage.getItem('Token'))
    }, [token])

    useEffect(() => {
        handleGetAllStories()
    }, [storyResponse, item])

    const reqHeader = {
        "Content-Type": "application/json", "Authorization": `bearer ${token}`
    }

    // console.log(item,"iemmmmmm");
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
    // console.log(allStories.length>0&& allStories.filter(stories => stories.userId === item.item._id),"o");

    const handleDeleteStory = async (items) => {
        const res = await deleteStoryInAllStoriesApi(items._id, reqHeader)
        if (res.status === 200) {
            console.log(res)
            const result = await deleteStoryInUserApi(items._id, reqHeader)
            if (result.status === 200) {
                console.log(result)
                message.success("Story Deleted")
                handleGetAllStories()
                setStoryResponse(res)
            }
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            {
                item?.item.story?.length > 0 ?
                    <>
                        <img src={item.item.image ? `${BASE_URL}/upload/${item?.item.image}` : nonUserDp} alt="" onClick={handleShow} style={{ width: "60px", height: "60px", borderRadius: "50%", cursor: "pointer" }} />
                        {
                            item?.item.story?.length > 0 &&
                            allStories && allStories.length > 0 &&
                            allStories.filter(stories => stories.userId === item.item._id).map(userStory => (
                                <>
                                    <Modal show={show} onHide={handleClose}>
                                        <Carousel>


                                            <Carousel.Item>
                                                <div>
                                                    <div style={{ position: "absolute", top: "20px" }} className=' d-flex align-items-center justify-content-between w-100 pe-5'>
                                                        <div className='mx-4 d-flex align-items-center'>
                                                            <img src={`${BASE_URL}/upload/${item.item.image}`} alt="" style={{ width: "45px", height: "45px", border: "2px solid #6b4ce6 ", borderRadius: "50%" }} />
                                                            <div>
                                                                <h6 className='mx-2 mb-0'>{item.item.username}</h6>
                                                                <h6 className='mx-2 mb-0' style={{ fontSize: "10px" }}>{userStory.dateOfPostedStory.slice(0, 10)}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='p-2' style={{ zIndex: "2" }}>
                                                            <i className="fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={() => handleDeleteStory(userStory)}></i>
                                                        </div>
                                                    </div>

                                                    <img src={`${BASE_URL}/upload/${userStory.image}`} alt="" className='img-fluid w-100 ' style={{ height: "70vh" }} />
                                                </div>

                                            </Carousel.Item>


                                        </Carousel>

                                    </Modal>
                                </>
                            ))
                        }

                    </>

                    :
                    <img src={item.item.image ? `${BASE_URL}/upload/${item.item.image}` : nonUserDp} alt="" style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
            }


        </div>
    )
}

export default StoryViewDP