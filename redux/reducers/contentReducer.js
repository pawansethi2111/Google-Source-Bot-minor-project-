import { SET_VIDEOS, SET_SEARCH_FIELD, SET_ACTIVE_FILTER, ALL, SET_FILTERED_CONTENT,SET_POSTS, SET_POLLS, SET_QNAS, SET_ALL_CONTENT, SET_CONTENT_BY_SLUG, SET_FILTERED_VIDEOS} from '../constants/index'

export default function contentReducer(state={
    allContent:[],
    posts:[],
    polls:[],
    qnas:[],
    videos: [],
    searchField: '',
    activeFilter: ALL,
    filteredContent: [],
    filteredVideos:[],
    contentBySlug:false,
}, action){
    switch(action.type){
        case SET_POSTS:
            return{
                ...state,
                posts:action.payload,
            }
        case SET_POLLS:
            return{
                ...state,
                polls:action.payload,
            }
        case SET_QNAS:
            return{
                ...state,
                qnas:action.payload,
            }
        case SET_VIDEOS:
            return{
                ...state,
                videos:action.payload,
            }
        case SET_ALL_CONTENT:
            return{
                ...state,
                allContent:action.payload,
            }    
        case SET_SEARCH_FIELD:
            return{
                ...state,
                searchField:action.payload
            }
        case SET_ACTIVE_FILTER:
            return{
                ...state,
                activeFilter:action.payload
            }
        case SET_FILTERED_CONTENT:
            return{
                ...state,
                filteredContent:action.payload
            }
        case SET_FILTERED_VIDEOS:
            return{
                ...state,
                filteredVideos:action.payload
            }
        case SET_CONTENT_BY_SLUG:
            return{
                ...state,
                contentBySlug:action.payload
            }
    default:
        return state;
}
}
