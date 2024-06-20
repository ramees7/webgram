import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";

export const userRegisterApi = async (data) => {
    return await commonApi("POST", `${BASE_URL}/registeruser`, data, '')
}

export const userLoginApi = async (data) => {
    return await commonApi("POST", `${BASE_URL}/loginuser`, data, '')
}

export const getCurrentUserApi = async (headers) => {
    return await commonApi("GET", `${BASE_URL}/getcurrentuser`, '', headers)
}

export const getAllUserApi = async (search) => {
    return await commonApi("GET", `${BASE_URL}/getuserslist?search=${search}`, '', '')
}

export const getAllPostsApi = async () => {
    return await commonApi("GET", `${BASE_URL}/getallposts`, '', '')
}

export const addToFollowingApi = async (data, headers) => {
    return await commonApi("PUT", `${BASE_URL}/addtofollowing`, data, headers)
}

export const addToFollowersApi = async ( id, headers) => {
    return await commonApi("PUT", `${BASE_URL}/addtofollowers/${id}`,{}, headers)
}

export const unFollowingApi = async ( followingId, headers) => {
    return await commonApi("PUT", `${BASE_URL}/unfollowinguser/${followingId}`, {}, headers)
}
export const unFollowersApi = async (userid, headers) => {
    return await commonApi("PUT", `${BASE_URL}/unfollowersuser/${userid}`, {}, headers)
}

export const addToPostUserApi = async (headers) => {
    return await commonApi("PUT", `${BASE_URL}/addtopostsuser`, {}, headers)
}

export const addToPostApi = async (data, headers) => {
    return await commonApi("POST", `${BASE_URL}/addtoallposts`, data, headers)
}

export const deletePostApi = async (id, headers) => {
    return await commonApi("DELETE", `${BASE_URL}/deletemypost/${id}`, {}, headers)
}

export const deletePostInUserApi = async (postid, headers) => {
    return await commonApi("PUT", `${BASE_URL}/deletepostuser/${postid}`, {}, headers)
}

export const addLikeToPostAllApi=async(data,id,headers)=>{
    return await commonApi("PUT",`${BASE_URL}/addliketopostall/${id}`,data,headers)
}

export const addUserLikedPostAllApi=async(data,id,headers)=>{
    return await commonApi("PUT",`${BASE_URL}/adduserlikedpost/${id}`,data,headers)
}

export const removeLikeToPostAllApi=async(data,id,headers)=>{
    return await commonApi("PUT",`${BASE_URL}/removeliketopostall/${id}`,data,headers)
}

export const removeUserLikedPostAllApi=async(data,id,headers)=>{
    return await commonApi("PUT",`${BASE_URL}/removeuserlikedpost/${id}`,data,headers)
}

export const addCommentToPostApi=async(data,id,headers)=>{
    return await commonApi("PUT",`${BASE_URL}/addcommentintopost/${id}`,data,headers)
}

export const deleteCommentToPostApi=async(id,commentid,headers)=>{
    return await commonApi("PUT",`${BASE_URL}/deletecomment/${id}/commentid/${commentid}`,{},headers)
}

export const addCommentReplyToPostApi=async(data,id,commentid,headers)=>{
    return await commonApi("PUT",`${BASE_URL}/addcommentreply/${id}/commentid/${commentid}`,data,headers)
}

export const removeCommentReplyToPostApi=async(id,commentid,headers)=>{
    return await commonApi("PUT",`${BASE_URL}/deletecommentreply/${id}/commentid/${commentid}`,{},headers)
}

export const addSavedPostInAllPostApi=async(postid,headers)=>{
    return await commonApi("PUT",`${BASE_URL}/addsavedpostallpost/${postid}`,{},headers)
}

export const addSavedPostUserApi=async(postid,headers)=>{
    return await commonApi("PUT",`${BASE_URL}/addsavedpostuser/${postid}`,{},headers)
}

export const removeSavedPostInAllPostApi=async(postid,headers)=>{
    return await commonApi("PUT",`${BASE_URL}/removesavedpostallpost/${postid}`,{},headers)
}

export const removeSavedPostUserApi=async(postid,headers)=>{
    return await commonApi("PUT",`${BASE_URL}/removesavedpostuser/${postid}`,{},headers)
}

export const addStoryToAllStoryApi=async(data,headers)=>{
    return await commonApi("POST",`${BASE_URL}/addstorytoallstories`,data,headers)
}

export const addStoryUserApi=async(headers)=>{
    return await commonApi("PUT",`${BASE_URL}/addstorytouser`,{},headers)
}

export const getAllStoriesApi=async()=>{
    return await commonApi("GET",`${BASE_URL}/getallstories`,'',"")
}

export const updateProfileApi=async(data,headers)=>{
    return await commonApi("PATCH",`${BASE_URL}/updateuserprofile`,data,headers)
}

export const deleteStoryInAllStoriesApi=async(id,headers)=>{
    return await commonApi("DELETE",`${BASE_URL}/deletestoryallstories/${id}`,{},headers)
}

export const deleteStoryInUserApi=async(id,headers)=>{
    return await commonApi("PUT",`${BASE_URL}/deletestoryuser/${id}`,{},headers)
}