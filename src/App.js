import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MyPosts from "./pages/MyPosts";
import AddMyPosts from "./pages/AddMyPosts";
import EditProfilePage from "./pages/EditProfilePage";
import Register from "./components/Register";
import Login from "./components/Login";
import FollowUsersList from "./pages/FollowUsersList";
import AllUsers from "./pages/AllUsers";
import SavedPosts from "./pages/SavedPosts";
import LikedPosts from "./pages/LikedPosts";
import UserView from "./pages/UserView";
import Aa from "./components/Aa";
import ForgetPass from "./pages/ForgetPass";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPass />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/addposts" element={<AddMyPosts />} />
        <Route path="/editprofile" element={<EditProfilePage />} />
        <Route path="/followerslist" element={<FollowUsersList />} />
        <Route path="/allusers" element={<AllUsers />} />
        <Route path="/savedposts" element={<SavedPosts />} />
        <Route path="/likedposts" element={<LikedPosts />} />
        <Route path="/userView/:username" element={<UserView />} />
        <Route path="/aa" element={<Aa />} />

        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
