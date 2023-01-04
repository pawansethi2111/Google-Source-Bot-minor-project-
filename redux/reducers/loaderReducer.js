import {SET_FEED_LOADER} from '../constants/index'

export default function loaderReducer(state={
    feedLoader:false,
}, action){
    switch(action.type){
        case SET_FEED_LOADER:
            return{
                ...state,
                feedLoader : action.payload
            }
    default:
        return state;
}
}
