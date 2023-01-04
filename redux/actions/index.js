import {SET_AUTH_TOKEN,
        REMOVE_AUTH_TOKEN,
        ADD_PROFILE, SET_POSTS, SET_POLLS, SET_QNAS,
         SET_VIDEOS, SET_SEARCH_FIELD, SET_ACTIVE_FILTER, SET_FILTERED_CONTENT,SET_ALL_CONTENT,REMOVE_PROFILE,
         SET_CONTENT_BY_SLUG, SET_LEADERBOARD, SET_NOTIFICATIONS, SET_UNSEEN_NOTIFICATIONS_COUNT, SET_SOCKET_CONNECTION, SET_INTERESTS_OPEN,SET_FEED_LOADER,SET_FILTERED_VIDEOS, SET_ACTIVE_SEARCH_COMBO_INDEX, } from '../constants/index';

const userSignIn = (text) => {
    return{
        type: SET_AUTH_TOKEN,
        payload: {auth: text}
    }
}

const userSignOut = () => {
    return{
        type: REMOVE_AUTH_TOKEN,
        payload: {auth:null}
    }
}

const addProfile = (data) => ({
    type: ADD_PROFILE,
    payload: data
});

const removeProfile = (data) => ({
    type: REMOVE_PROFILE,
    payload: data
});

const setVideos = (data) => {
    return{
        type: SET_VIDEOS,
        payload: data
    }
}

const setPosts = (data) => {
    return{
        type: SET_POSTS,
        payload: data
    }
}

const setPolls = (data) => {
    return{
        type: SET_POLLS,
        payload: data
    }
}

const setQnas = (data) => {
    return{
        type: SET_QNAS,
        payload: data
    }
}

const setAllContent = (data) => {
    return{
        type: SET_ALL_CONTENT,
        payload: data
    }
}

const setSearchField = (data) => {
    return{
        type: SET_SEARCH_FIELD, 
        payload: data
    }
}

const setActiveFilter = (filter) => {
    console.log(filter)
    return{
        type: SET_ACTIVE_FILTER,
        payload: filter
    }
}

const setFilteredContent = (filteredContent) => {
    return{
        type: SET_FILTERED_CONTENT,
        payload: filteredContent
    }
}

const setFilteredVideos = (filteredVideos) => {
    return{
        type: SET_FILTERED_VIDEOS,
        payload: filteredVideos
    }
}

const setContentBySlug = (answer) => {
    return{
        type: SET_CONTENT_BY_SLUG,
        payload: answer
    }
} 

const setLeaderBoard = (data) => {
    return{
        type: SET_LEADERBOARD,
        payload:data
    }
}

const setNotifications = (data) => {
    return{
        type: SET_NOTIFICATIONS,
        payload:data
    }
}

const setUnseenNotifCount = (data) => {
    return{
        type: SET_UNSEEN_NOTIFICATIONS_COUNT,
        payload:data
    }
}

const setSocketConnection = (data) => {
    return{
        type: SET_SOCKET_CONNECTION,
        payload:data
    }
}

const setInterestsOpen = (data) => {
    return{
        type:SET_INTERESTS_OPEN,
        payload:data,
    }
}

const setFeedLoader = (data) => {
    return{
        type:SET_FEED_LOADER,
        payload:data,
    }
}

const setActiveSearchComboIndex = (data) => {
    return{
        type:SET_ACTIVE_SEARCH_COMBO_INDEX,
        payload:data,
    }
}

export { userSignIn,addProfile,userSignOut,setVideos,setSearchField,setActiveFilter,setFilteredContent,setPosts, setPolls,setQnas,setAllContent,removeProfile,setContentBySlug,setLeaderBoard,setNotifications,setUnseenNotifCount,setSocketConnection,setInterestsOpen,setFeedLoader,setFilteredVideos,setActiveSearchComboIndex }