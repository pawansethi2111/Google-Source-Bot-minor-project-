import {SET_AUTH_TOKEN, REMOVE_AUTH_TOKEN} from '../constants/index';

export default function authReducer(state={
    authUser : null,
    isAuthenticated:false
}, action){
    switch(action.type){
        case SET_AUTH_TOKEN:
            return{
                ...state,
                isAuthenticated:true,
                authUser : action.payload.auth
            }
        case REMOVE_AUTH_TOKEN:
            return{
                ...state,
                isAuthenticated:false,
                authUser : action.payload.auth
            }

    default:
        return state;
}
}



