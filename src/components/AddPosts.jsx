import { message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { addToPostApi, addToPostUserApi } from "../Services/allApis";
import { useNavigate } from "react-router-dom";
import addPostIcon from "../Assets/addposticon.png";
import { myPostsCountContext } from "../Context/ContextShares";

function AddPosts() {
  const [validated, setValidated] = useState(false);
  const [postData, setPostData] = useState({
    caption: "",
    dateOfPosted: new Date(),
    username: "",
    image: "",
  });
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const { setMyPostsCount } = useContext(myPostsCountContext);

  const reqHeaderForm = {
    "Content-Type": "multipart/form-data",
    Authorization: `bearer ${token}`,
  };

  const reqHeader = {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  };

  useEffect(() => {
    setToken(sessionStorage.getItem("Token"));
    setUser(JSON.parse(sessionStorage.getItem("Existing User")));
  }, []);

  useEffect(() => {
    if (postData.image) {
      setPreview(URL.createObjectURL(postData.image));
    }
  }, [postData.image]);

  const handleSubmit = async (event) => {
    if (user) {
      const form = event.currentTarget;
      event.preventDefault();
      // console.log(user, "userrrrrrrrrrrrrrrrrrrrrrrrrr");
      if (form.checkValidity() === false) {
        event.stopPropagation();
        message.warning("Add Valid Data");
      } else {
        const formData = new FormData();
        formData.append("caption", postData.caption);
        formData.append("dateOfPosted", postData.dateOfPosted);
        formData.append("image", postData.image);
        formData.append("username", user.username);
        // console.log(formData)

        const result = await addToPostApi(formData, reqHeaderForm);
        if (result.status === 200) {
          setValidated(true);
          // console.log(result)
          const res = await addToPostUserApi(reqHeader);
          if (res.status === 200) {
            // console.log(res, "addpost")
            message.success("Post Added");
            navigate("/myposts");
            setMyPostsCount(res);
          } else {
            // console.log(res)
          }
        } else {
          // console.log("err");
        }
      }
    } else {
      message.warning("Please Login First");
    }
  };

  return (
    <div
      className="p-3"
      style={{ backgroundColor: "#fff", borderRadius: "10px" }}
    >
      <h3 className="text-center pb-3 fw-bold">Add Post</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Col} md="12" controlId="validationCustom01">
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
                setPostData({ ...postData, image: e.target.files[0] });
              }}
            />
            <img
              src={preview ? preview : addPostIcon}
              alt=""
              className="img-fluid"
              style={{ height: "300px", borderRadius: "10px" }}
            />
          </label>
        </Form.Group>
        <Form.Group
          as={Col}
          md="12"
          controlId="validationCustom02"
          className="my-3"
        >
          <Form.Control
            type="text"
            placeholder="Caption"
            onChange={(e) => {
              setPostData({ ...postData, caption: e.target.value });
            }}
          />
        </Form.Group>
        <div className="d-flex justify-content-center w-100">
          <Button
            type="submit"
            style={{
              border: "none",
              backgroundColor: "#6b4ce6",
              borderRadius: "15px",
              color: "#fff",
            }}
            className="py-2 px-3"
            disabled={!user}
          >
            Post
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddPosts;

// const handleSubmit = async (event) => {
//     const form = event.currentTarget
//     event.preventDefault()
//     if (form.checkValidity() === false) {
//         event.stopPropagation()
//         message.warning("Add Valid Data")
//     }
//     else {
//         const formData = new FormData()
//         formData.append('caption', postDataUser.caption)
//         formData.append('dateOfPosted', postDataUser.dateOfPosted)
//         formData.append('image', postDataUser.image)
//         console.log(formData)
//         const result = await addToPostUserApi(formData, reqHeaderForm, user._id)
//         if (result.status === 200) {
//             setValidated(true);
//             console.log(result)
//             console.log(user.username)
//             const post=result.data.data.posts.slice(-1)
//             console.log(post,"post")
//             // const {image,caption,dateOfPosted,username}=postData
//             setPostData({...postData,image:post[0].image,caption:post[0].caption,dateOfPosted:post[0].dateOfPosted,username:user.username})
//             console.log(postData,"postdata");
//             const res=await addToPostApi(postData,reqHeader)
//             if(res.status===200){
//                 console.log(res,"addpost")
//                 message.success("Post Added")
//             }
//             else{
//                 console.log(res)
//             }

//         }
//         else {
//             console.log(result)
//         }
//     }

// }
