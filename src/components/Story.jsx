import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Carousel, Modal } from "react-bootstrap";
import {
  addStoryToAllStoryApi,
  addStoryUserApi,
  deleteStoryInAllStoriesApi,
  deleteStoryInUserApi,
  getAllStoriesApi,
  getAllUserApi,
  getCurrentUserApi,
} from "../Services/allApis";
import { message } from "antd";
import { BASE_URL } from "../Services/baseUrl";
// import { useNavigate } from 'react-router-dom'
import nonUserDp from "../Assets/profile-non-user.jpg";
import addStoryPng from "../Assets/addstorypng.png";
import { storyResponseContext } from "../Context/ContextShares";

function Story() {
  const [search, setSearch] = useState("");
  const [showAddStory, setShowAddStory] = useState(false);
  const [showViewCurrentUserStory, setShowViewCurrentUserStory] =
    useState(false);
  const [showViewStory, setShowViewStory] = useState(false);
  const [newStoryData, setNewStoryData] = useState({
    image: "",
    username: "",
    dateOfPostedStory: new Date(),
  });
  const [currentUser, setCurrentUser] = useState("");
  const [token, setToken] = useState("");
  const [preview, setPreview] = useState("");
  const [allStories, setAllStories] = useState("");
  const [AllUsers, setAllUsers] = useState("");
  const [followingUsersStory, setFollowingUsersStory] = useState("");
  const [followingUsersStoryView, setFollowingUsersStoryView] = useState("");
  const [followingUsersStoryViewSingle, setFollowingUsersStoryViewSingle] =
    useState("");
  // const navigate = useNavigate()
  const { storyResponse, setStoryResponse } = useContext(storyResponseContext);

  useEffect(() => {
    // setCurrentUser(JSON.parse(sessionStorage.getItem("Existing User")))
    setToken(sessionStorage.getItem("Token"));
    handleGetCurrentUser();
    handleGetAllUsers();
  }, [token]);

  useEffect(() => {
    if (newStoryData.image) {
      setPreview(URL.createObjectURL(newStoryData.image));
    }
    // console.log(newStoryData, "polop");
  }, [newStoryData.image]);

  useEffect(() => {
    handleGetAllStories();
  }, [storyResponse]);

  useEffect(() => {
    if (allStories && currentUser && AllUsers) {
      const storyUsers =
        allStories.length > 0 &&
        allStories.filter((stories) =>
          currentUser.following.some(
            (following) => following.userId === stories.userId
          )
        );
      setFollowingUsersStory(
        AllUsers.length > 0 &&
          AllUsers.filter(
            (usersAll) =>
              storyUsers.length > 0 &&
              storyUsers.some((userStory) => userStory.userId === usersAll._id)
          )
      );
      // console.log(storyUsers,"mmmmmmmmm");
    }
    // console.log(AllUsers, "oppppppppppppppppp")
  }, [allStories, currentUser, AllUsers]);

  const reqHeaderForm = {
    "Content-Type": "multipart/form-data",
    Authorization: `bearer ${token}`,
  };

  const reqHeader = {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  };

  const handleGetAllUsers = async () => {
    const res = await getAllUserApi(search);
    if (res.status === 200) {
      setAllUsers(res.data);
      // console.log(res,"resssssssss");
    }
  };

  const handleGetCurrentUser = async () => {
    const res = await getCurrentUserApi(reqHeader);
    if (res.status === 200) {
      setCurrentUser(res.data);
    }
  };

  const handleAddNewStory = async (e) => {
    e.preventDefault();
    if (currentUser) {
      const formData = new FormData();
      formData.append("image", newStoryData.image);
      formData.append("username", currentUser.username);
      formData.append("dateOfPostedStory", newStoryData.dateOfPostedStory);
      const result = await addStoryToAllStoryApi(formData, reqHeaderForm);
      if (result.status === 200) {
        // console.log(result, "res")
        const result2 = await addStoryUserApi(reqHeader);
        if (result2.status === 200) {
          // console.log(result2, "22")
          message.success("New Story Added");
          handleCloseAddStory();
          setPreview("");
          handleGetAllStories();
          setStoryResponse(result2);
        } else {
          // console.log(result2);
        }
      } else {
        // console.log(result);
      }
    } else {
      message.warning("Please Login First");
    }
  };

  const handleGetAllStories = async () => {
    const res = await getAllStoriesApi();
    if (res.status === 200) {
      // console.log(res, "stories")
      setAllStories(res.data);
    } else {
      // console.log(res)
    }
  };

  const handleDeleteStory = async (items) => {
    const res = await deleteStoryInAllStoriesApi(items._id, reqHeader);
    if (res.status === 200) {
      // console.log(res)
      const result = await deleteStoryInUserApi(items._id, reqHeader);
      if (result.status === 200) {
        // console.log(result)
        message.success("Story Deleted");
        handleGetAllStories();
        setStoryResponse(result);
      }
    }
  };

  const handleViewStroy = (item) => {
    setFollowingUsersStoryViewSingle(
      followingUsersStoryView.length > 0 &&
        followingUsersStoryView.filter((itemss) => itemss.userId === item._id)
    );
    handleShowViewStory();
  };

  useEffect(() => {
    if (currentUser) {
      setFollowingUsersStoryView(
        allStories.length > 0 &&
          allStories.filter((stories) =>
            currentUser.following.some(
              (following) => following.userId === stories.userId
            )
          )
      );
    }
    // const b = allStories.length > 0 && allStories.filter(item => item.userId === currentUser._id)
    // console.log(b, "bbbbbbbbbbbbbbbbbbbbbbbbb");
  }, [allStories, currentUser]);

  // console.log(followingUsersStory, "foloooooooooooooooooo");
  // console.log(followingUsersStoryViewSingle, "viewwwwwwwwwwwwwwwwww");

  const handleCloseAddStory = () => setShowAddStory(false);
  const handleShowAddStory = () => setShowAddStory(true);
  const handleCloseViewStory = () => setShowViewStory(false);
  const handleShowViewStory = () => setShowViewStory(true);
  const handleCloseViewCurrentUserStory = () =>
    setShowViewCurrentUserStory(false);
  const handleShowViewCurrentUserStory = () =>
    setShowViewCurrentUserStory(true);

  return (
    <div className=" row g-0">
      <div className="d-flex" style={{ overflowX: "scroll" }}>
        <div className="d-flex">
          <div>
            <Card
              className=" text-white me-3"
              style={{ width: "130px" }}
              onClick={handleShowAddStory}
              title="Add Story"
            >
              <Card.Img
                src={addStoryPng}
                alt="Card image"
                style={{ width: "130px", height: "170px" }}
                className="img-fluid py-5 px-3"
              />
              <Card.ImgOverlay className="d-flex justify-content-center">
                <Card.Title className="">
                  <img
                    src={
                      currentUser
                        ? `${BASE_URL}/upload/${currentUser.image}`
                        : nonUserDp
                    }
                    alt=""
                    style={{
                      width: "45px",
                      height: "45px",
                      border: "2px solid #6b4ce6 ",
                      borderRadius: "50%",
                    }}
                  />
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
            <Modal show={showAddStory} onHide={handleCloseAddStory}>
              <div>
                <form action="">
                  <label
                    htmlFor="addpost"
                    className="w-100 d-flex justify-content-center"
                  >
                    <input
                      type="file"
                      id="addpost"
                      style={{ display: "none" }}
                      className="w-100 "
                      required
                      onChange={(e) => {
                        setNewStoryData({
                          ...newStoryData,
                          image: e.target.files[0],
                        });
                      }}
                    />
                    <img
                      src={preview ? preview : addStoryPng}
                      alt=""
                      className="img-fluid p-3"
                      style={{ height: "300px", borderRadius: "10px" }}
                    />
                  </label>
                  <div className="d-flex justify-content-center w-100 my-2">
                    <Button
                      type="submit"
                      style={{
                        border: "none",
                        backgroundColor: "#6b4ce6",
                        borderRadius: "15px",
                        color: "#fff",
                      }}
                      className="py-2 px-5"
                      disabled={!newStoryData.image || !currentUser}
                      onClick={(e) => handleAddNewStory(e)}
                    >
                      Post Now
                    </Button>
                  </div>
                  {/* <button type='submit' className='text-center my-2 w-100 border-none' disabled={!newStoryData.image || !currentUser} onClick={(e) => handleAddNewStory(e)}>Post Now</button> */}
                </form>
              </div>
            </Modal>
          </div>
          <div>
            {currentUser &&
              allStories.length > 0 &&
              allStories.filter((item) => item.userId === currentUser._id)
                .length > 0 && (
                <>
                  <Card
                    className=" text-white me-3"
                    style={{ width: "130px" }}
                    onClick={handleShowViewCurrentUserStory}
                    title="View Story"
                  >
                    <Card.Img
                      src={`${BASE_URL}/upload/${currentUser.image}`}
                      alt="Card image"
                      style={{ width: "130px", height: "170px" }}
                      className=""
                    />
                    <Card.ImgOverlay className="d-flex justify-content-center">
                      <Card.Title className="">
                        <img
                          src={`${BASE_URL}/upload/${currentUser.image}`}
                          alt=""
                          style={{
                            width: "45px",
                            height: "45px",
                            border: "2px solid #6b4ce6 ",
                            borderRadius: "50%",
                          }}
                        />
                      </Card.Title>
                    </Card.ImgOverlay>
                    <Card.ImgOverlay className="d-flex justify-content-center">
                      <Card.Title
                        style={{ marginTop: "125%", color: "#000" }}
                        className=""
                      >
                        You
                      </Card.Title>
                    </Card.ImgOverlay>
                  </Card>
                  <div>
                    <Modal
                      show={showViewCurrentUserStory}
                      onHide={handleCloseViewCurrentUserStory}
                    >
                      <Carousel>
                        {allStories
                          .filter((item) => item.userId === currentUser._id)
                          .map((items) => (
                            <Carousel.Item>
                              <div>
                                <div
                                  style={{ position: "absolute", top: "20px" }}
                                  className=" d-flex align-items-center justify-content-between w-100 pe-5"
                                >
                                  <div className="mx-4 d-flex align-items-center">
                                    <img
                                      src={`${BASE_URL}/upload/${currentUser.image}`}
                                      alt=""
                                      style={{
                                        width: "45px",
                                        height: "45px",
                                        border: "2px solid #6b4ce6 ",
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <div>
                                      <h6 className="mx-2 mb-0">
                                        {currentUser.username}
                                      </h6>
                                      <h6
                                        className="mx-2 mb-0"
                                        style={{ fontSize: "10px" }}
                                      >
                                        {items.dateOfPostedStory.slice(0, 10)}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="p-2" style={{ zIndex: "2" }}>
                                    <i
                                      className="fa-solid fa-trash"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => handleDeleteStory(items)}
                                    ></i>
                                  </div>
                                </div>

                                <img
                                  src={`${BASE_URL}/upload/${items.image}`}
                                  alt=""
                                  className="img-fluid w-100 "
                                  style={{ height: "70vh" }}
                                />
                              </div>
                            </Carousel.Item>
                          ))}
                      </Carousel>
                    </Modal>
                  </div>
                </>
              )}
          </div>
          <>
            {followingUsersStory &&
              // followingUsersStoryView&&
              followingUsersStory.map((item) => (
                <>
                  <Card
                    className=" text-white me-3"
                    style={{ width: "130px" }}
                    onClick={() => handleViewStroy(item)}
                    title="View Story"
                  >
                    <Card.Img
                      src={`${BASE_URL}/upload/${item.image}`}
                      alt="Card image"
                      style={{ width: "130px", height: "170px" }}
                      className=""
                    />
                    <Card.ImgOverlay className="d-flex justify-content-center">
                      <Card.Title className="">
                        <img
                          src={`${BASE_URL}/upload/${item.image}`}
                          alt=""
                          style={{
                            width: "45px",
                            height: "45px",
                            border: "2px solid #6b4ce6 ",
                            borderRadius: "50%",
                          }}
                        />
                      </Card.Title>
                    </Card.ImgOverlay>
                    <Card.ImgOverlay className="d-flex justify-content-center">
                      <Card.Title
                        style={{ marginTop: "125%", color: "#000" }}
                        className=""
                      >
                        {item?.username}
                      </Card.Title>
                    </Card.ImgOverlay>
                  </Card>
                  <div>
                    <Modal show={showViewStory} onHide={handleCloseViewStory}>
                      <Carousel>
                        {currentUser &&
                          currentUser.following.length > 0 &&
                          followingUsersStoryView.length > 0 &&
                          followingUsersStoryViewSingle.length > 0 &&
                          followingUsersStoryViewSingle.map((view) => (
                            <Carousel.Item>
                              <div>
                                {followingUsersStoryViewSingle && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "20px",
                                    }}
                                    className="mx-4 d-flex align-items-center"
                                  >
                                    <img
                                      src={`${BASE_URL}/upload/${followingUsersStoryViewSingle[0].image}`}
                                      alt=""
                                      style={{
                                        width: "45px",
                                        height: "45px",
                                        border: "2px solid #6b4ce6 ",
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <div>
                                      <h6 className="mx-2 mb-0">
                                        {
                                          followingUsersStoryViewSingle[0]
                                            .username
                                        }
                                      </h6>
                                      <h6
                                        className="mx-2 mb-0"
                                        style={{ fontSize: "10px" }}
                                      >
                                        {view.dateOfPostedStory.slice(0, 10)}
                                      </h6>
                                    </div>
                                  </div>
                                )}

                                <img
                                  src={`${BASE_URL}/upload/${view.image}`}
                                  alt=""
                                  className="img-fluid w-100 "
                                  style={{ height: "70vh" }}
                                />
                              </div>
                            </Carousel.Item>
                          ))}
                      </Carousel>
                    </Modal>
                  </div>
                </>
              ))}
          </>
        </div>
      </div>
    </div>
  );
}

export default Story;
