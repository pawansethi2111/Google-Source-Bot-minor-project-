import { ADD_PROFILE,REMOVE_PROFILE,SET_NOTIFICATIONS,SET_UNSEEN_NOTIFICATIONS_COUNT,SET_SOCKET_CONNECTION,SET_INTERESTS_OPEN } from '../constants/index';

export default function ProfileReducer(state={
    info:{},
    notifications:[],
    unseenNotifCount:0,
    socket:null,
    interests:{
        isInterestsOpen:false,
        userInterests:[],
    }
}, action){
    switch(action.type){
        case ADD_PROFILE:
            return{
                ...state,
                info : Object.assign({},{...state.info},{...action.payload})
            }
        case REMOVE_PROFILE:
            return{
                ...state,
                info : action.payload
            }
        case SET_NOTIFICATIONS:
            return{
                ...state,
                notifications : action.payload
            }
        case SET_UNSEEN_NOTIFICATIONS_COUNT:
            return{
                ...state,
                unseenNotifCount : action.payload
            }
        case SET_SOCKET_CONNECTION:
            return{
                ...state,
                socket : action.payload
            }    
        case SET_INTERESTS_OPEN:
            return{
                ...state,
                interests : {
                    ...state.interests,
                    isInterestsOpen:action.payload,
                }
            } 
    default:
        return state;
}
}