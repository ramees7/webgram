import React, { createContext, useState } from 'react'

export const followCountContext = createContext()
export const likedPostsCountContext = createContext()
export const savedPostsCountContext = createContext()
export const myPostsCountContext = createContext()
export const commentResponseContext = createContext()
export const storyResponseContext = createContext()

function ContextShares({ children }) {

    const [followCount, setFollowCount] = useState({})
    const [likedpostsCount, setLikedPostsCount] = useState({})
    const [savedpostsCount, setSavedPostsCount] = useState({})
    const [mypostsCount, setMyPostsCount] = useState({})
    const [commentResponse, setCommentResponse] = useState({})
    const [storyResponse, setStoryResponse] = useState({})

    return (
        <>
            <followCountContext.Provider value={{ followCount, setFollowCount }}>
                <likedPostsCountContext.Provider value={{ likedpostsCount, setLikedPostsCount }}>
                    <savedPostsCountContext.Provider value={{ savedpostsCount, setSavedPostsCount }}>
                        <myPostsCountContext.Provider value={{ mypostsCount, setMyPostsCount }}>
                            <commentResponseContext.Provider value={{ commentResponse, setCommentResponse }}>
                                <storyResponseContext.Provider value={{storyResponse, setStoryResponse}}>
                                    {children}
                                </storyResponseContext.Provider>
                            </commentResponseContext.Provider>
                        </myPostsCountContext.Provider>
                    </savedPostsCountContext.Provider>
                </likedPostsCountContext.Provider>
            </followCountContext.Provider>
        </>
    )
}

export default ContextShares






// import React, { createContext, useState } from 'react'


// export const docterEditResContext = createContext()
// export const docterAddContext = createContext()


// function ContextShares({ children }) {
//   const [docterEditRes, setDocterEditRes] = useState({})
//   const [docterAddRes, setDocterAddRes] = useState({})

//   return (
//     <>
//       <docterEditResContext.Provider value={{ docterEditRes, setDocterEditRes }} >
//         <docterAddContext.Provider value={{docterAddRes, setDocterAddRes}}>
//           {children}
//         </docterAddContext.Provider>
//       </docterEditResContext.Provider>
//     </>
//   )
// }

// export default ContextShares