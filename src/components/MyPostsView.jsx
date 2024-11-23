import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import "./All.css";
import { Link } from "react-router-dom";
import {
  addLikeToPostAllApi,
  addSavedPostInAllPostApi,
  addSavedPostUserApi,
  addUserLikedPostAllApi,
  deletePostApi,
  deletePostInUserApi,
  getAllPostsApi,
  getCurrentUserApi,
  removeLikeToPostAllApi,
  removeSavedPostInAllPostApi,
  removeSavedPostUserApi,
  removeUserLikedPostAllApi,
} from "../Services/allApis";
import { BASE_URL } from "../Services/baseUrl";
import { message } from "antd";
import CommentBox from "./CommentBox";
import {
  commentResponseContext,
  likedPostsCountContext,
  myPostsCountContext,
  savedPostsCountContext,
} from "../Context/ContextShares";
import noPostsImg from "../Assets/no posts.png";

function MyPostsView({ addpostcomp }) {
  const [myPosts, setMyPosts] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [token, setToken] = useState("");
  const [allPosts, setAllPosts] = useState("");
  const [alreadyLikedPost, setAllreadyLikedPost] = useState(false);
  const { setLikedPostsCount } = useContext(likedPostsCountContext);
  const { setSavedPostsCount } = useContext(savedPostsCountContext);
  const { setMyPostsCount } = useContext(myPostsCountContext);
  const { commentResponse } = useContext(
    commentResponseContext
  );

  useEffect(() => {
    setToken(sessionStorage.getItem("Token"));
    // console.log(token)
    console.log(allPosts, alreadyLikedPost, "demo");
  }, []);

  useEffect(() => {
    handleMyPosts();
  }, [token, commentResponse]);

  const reqHeader = {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  };

  const handleMyPosts = async () => {
    const res = await getCurrentUserApi(reqHeader);
    if (res.status === 200) {
      setCurrentUser(res.data);
      const res1 = await getAllPostsApi();
      if (res1.status === 200) {
        setAllPosts(res1.data);
        setMyPosts(res1.data.filter((item) => item.userId === res.data._id));
        // console.log(myPosts, "myyyyyyyyyyyyy")
        setLikedPostsCount(res1);
        setSavedPostsCount(res1);
        setMyPostsCount(res1);
      }
    }
  };

  const handlePostDelete = async (item) => {
    const likeToPostAllData = {
      likedUserId: currentUser._id,
    };
    const userLikedData = {
      postId: item._id,
    };
    const res = await deletePostApi(item._id, reqHeader);
    if (res.status === 200) {
      // console.log(res)
      const res2 = await deletePostInUserApi(item._id, reqHeader);
      if (res2.status === 200) {
        // console.log(res2,"res2")
        const res3 = await removeLikeToPostAllApi(
          likeToPostAllData,
          item._id,
          reqHeader
        );
        if (res3.status === 200) {
          // console.log(res3,"res3")
          const res4 = await removeUserLikedPostAllApi(
            userLikedData,
            currentUser._id,
            reqHeader
          );
          if (res4.status === 200) {
            // console.log(res4,"res4")
            const res5 = await removeSavedPostInAllPostApi(item._id, reqHeader);
            if (res5.status === 200) {
              // console.log(res5,"res5")
              const res6 = await removeSavedPostUserApi(item._id, reqHeader);
              if (res6.status === 200) {
                // console.log(res6,"res6")
                message.success("Post Deleted");
                handleMyPosts();
              }
            }
          }
        }
      }
    } else {
      // console.log(res)
      message.error("Something Went Wrong");
    }
  };

  // ------------------------------------------------
  const handleAddLikeToPost = async (item) => {
    // console.log(item, "itemmmmmmmmmmm");
    if (currentUser) {
      // console.log(currentUser, "userrrr")
      const likeToPostAllData = {
        likedUserId: currentUser._id,
      };
      const userLikedData = {
        postId: item._id,
      };
      const alreadyLiked = item.likes.filter(
        (item) => item.likedUserId === currentUser._id
      );
      if (alreadyLiked.length === 0) {
        const res = await addLikeToPostAllApi(
          likeToPostAllData,
          item._id,
          reqHeader
        );
        if (res.status === 200) {
          // console.log(res, "res")
          const res1 = await addUserLikedPostAllApi(
            userLikedData,
            currentUser._id,
            reqHeader
          );
          if (res1.status === 200) {
            // console.log(res1, "res1");
            message.success("liked");
            setAllreadyLikedPost(true);
            handleMyPosts();
          } else {
            // console.log(res1, "res1");
          }
        } else {
          // console.log(res)
        }
      } else {
        const res = await removeLikeToPostAllApi(
          likeToPostAllData,
          item._id,
          reqHeader
        );
        if (res.status === 200) {
          // console.log(res, "res")
          const res1 = await removeUserLikedPostAllApi(
            userLikedData,
            currentUser._id,
            reqHeader
          );
          if (res1.status === 200) {
            // console.log(res1, "res1")
            message.success("removed");
            setAllreadyLikedPost(false);
            handleMyPosts();
          } else {
            // console.log(res1, "res1");
          }
        } else {
          // console.log(res)
        }
      }
    } else {
      message.warning("Please Login First");
    }
  };

  const handleAddToSavedPost = async (id) => {
    const res = await addSavedPostInAllPostApi(id, reqHeader);
    if (res.status === 200) {
      // console.log(res)
      const res1 = await addSavedPostUserApi(id, reqHeader);
      if (res1.status === 200) {
        // console.log(res1)
        message.success("Saved Post");
        handleMyPosts();
      } else {
        // console.log(res1)
      }
    } else {
      // console.log(res)
    }
  };

  const handleRemoveToSavedPost = async (id) => {
    const res = await removeSavedPostInAllPostApi(id, reqHeader);
    if (res.status === 200) {
      // console.log(res)
      const res1 = await removeSavedPostUserApi(id, reqHeader);
      if (res1.status === 200) {
        // console.log(res1)
        message.success("Removed From Saved Post");
        handleMyPosts();
      } else {
        // console.log(res1)
      }
    } else {
      // console.log(res)
    }
  };
  // ------------------------------------------------

  const addPostComponent = addpostcomp ? false : true;
  return (
    <div>
      {addPostComponent ? (
        <div
          style={{ backgroundColor: "#fff", borderRadius: "10px" }}
          className="p-3 mb-2 w-100 d-flex justify-content-between align-items-center"
        >
          <h6
            className="mb-0"
            style={{ fontSize: "clamp(0.75rem, 0.3125rem + 1vw, 1.125rem)" }}
          >
            What's Your Mind Name
          </h6>
          <Link to={"/addposts"}>
            <button
              style={{
                border: "none",
                backgroundColor: "#6b4ce6",
                borderRadius: "15px",
                color: "#fff",
              }}
              className="py-2 px-3 "
            >
              Post
            </button>
          </Link>
        </div>
      ) : (
        <h3 className="text-center pt-5 pb-3 fw-bold">Your Posts</h3>
      )}

      <div
        className="p-3"
        style={{ backgroundColor: "#fff", borderRadius: "10px" }}
      >
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="mb-3"
          fill
          style={{ color: "#000" }}
        >
          <Tab
            eventKey="profile"
            title={<i class="fa-solid fa-table"></i>}
            style={{ minHeight: "55vh" }}
          >
            <Row className="d-flex p-3">
              {myPosts.length > 0 ? (
                myPosts.map((item) => (
                  <Col
                    xs="4"
                    style={{ border: "1px solid #f0eef6" }}
                    className="p-2 "
                  >
                    <div className="d-flex" style={{ height: "150px" }}>
                      <img
                        src={`${BASE_URL}/upload/${item.image}`}
                        alt=""
                        className="img-fluid w-100"
                      />
                      <i
                        className="fa-solid fa-trash"
                        style={{
                          cursor: "pointer",
                          position: "relative",
                          right: "20px",
                          top: "10px",
                        }}
                        onClick={() => handlePostDelete(item)}
                      ></i>
                    </div>
                  </Col>
                ))
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center flex-column"
                  style={{ minHeight: "438px" }}
                >
                  <img
                    src={noPostsImg}
                    alt=""
                    className="img-fluid my-3"
                    style={{ width: "200px", height: "200px" }}
                  />
                  <h4 className="fw-bold">No Post Yet</h4>
                </div>
              )}
            </Row>
          </Tab>
          <Tab
            eventKey="profile1"
            title={<i class="fa-solid fa-mobile-screen-button"></i>}
          >
            {myPosts.length > 0 ? (
              myPosts.map((item) => (
                <Row
                  className="g-0 mb-4 p-2"
                  style={{ backgroundColor: "#fff", borderRadius: "10px" }}
                >
                  <Col
                    xs={1}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <img
                      src={`${BASE_URL}/upload/${currentUser.image}`}
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                  </Col>
                  <Col xs={8} className="px-3">
                    <h5 className="mb-0 All-h5">{item.username}</h5>
                    <h6
                      className=""
                      style={{
                        fontSize:
                          "clamp(0.625rem, 0.5694rem + 0.2222vw, 0.75rem)",
                      }}
                    >
                      {item.dateOfPosted.slice(0, 10)}
                    </h6>
                  </Col>
                  {addPostComponent && (
                    <Col
                      xs={3}
                      className=" d-flex justify-content-end align-items-center"
                    >
                      <button
                        style={{
                          border: "none",
                          backgroundColor: "#6b4ce6",
                          borderRadius: "15px",
                          color: "#fff",
                        }}
                        className="py-2 px-4 "
                      >
                        Promote
                      </button>
                      <i
                        className="fa-solid fa-trash ms-3 "
                        style={{ cursor: "pointer" }}
                        onClick={() => handlePostDelete(item)}
                      ></i>
                    </Col>
                  )}
                  <Col md={12} className="my-3">
                    <img
                      src={`${BASE_URL}/upload/${item.image}`}
                      alt=""
                      className="img-fluid w-100"
                      style={{ height: "300px", borderRadius: "10px" }}
                    />
                  </Col>
                  <Col md={12} className="">
                    <h6 className="ms-3 mb-4">{item.caption}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex mt-2">
                        <div className="ms-3 d-flex justify-content-center align-items-center flex-column">
                          {currentUser ? (
                            item.likes.length > 0 ? (
                              item.likes.filter(
                                (item) => item.likedUserId === currentUser._id
                              ) ? (
                                <i
                                  className="fa-solid fa-heart mb-2 fa-lg"
                                  style={{ color: "red", cursor: "pointer" }}
                                  onClick={() => handleAddLikeToPost(item)}
                                ></i>
                              ) : (
                                <i
                                  className="fa-regular fa-heart mb-2 fa-lg "
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleAddLikeToPost(item)}
                                ></i>
                              )
                            ) : (
                              <i
                                className="fa-regular fa-heart mb-2 fa-lg"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleAddLikeToPost(item)}
                              ></i>
                            )
                          ) : (
                            <i
                              className="fa-regular fa-heart mb-2 fa-lg"
                              style={{ cursor: "pointer" }}
                            ></i>
                          )}
                          <h6 className="text-center">
                            {item.likes.length > 0 ? item.likes.length : 0}
                          </h6>
                        </div>
                        <div className="ms-3 d-flex justify-content-center align-items-center flex-column">
                          <CommentBox item={item} />
                          <h6 className="">{item.comments.length}</h6>
                        </div>
                      </div>
                      <div>
                        <i className="fa-solid fa-share-nodes me-3 fa-lg"></i>
                        {currentUser ? (
                          item.saved.length > 0 &&
                          item.saved.filter(
                            (items) => items.userId === currentUser._id
                          ) ? (
                            <i
                              className="fa-solid fa-bookmark fa-lg me-3"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleRemoveToSavedPost(item._id)}
                            ></i>
                          ) : (
                            <i
                              className="fa-regular fa-bookmark fa-lg me-3"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleAddToSavedPost(item._id)}
                            ></i>
                          )
                        ) : (
                          <i
                            className="fa-regular fa-bookmark fa-lg me-3"
                            style={{ cursor: "pointer" }}
                          ></i>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              ))
            ) : (
              <div
                className="d-flex justify-content-center align-items-center flex-column"
                style={{ minHeight: "438px" }}
              >
                <img
                  src={noPostsImg}
                  alt=""
                  className="img-fluid my-3"
                  style={{ width: "200px", height: "200px" }}
                />
                <h4 className="fw-bold">No Post Yet</h4>
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default MyPostsView;
