import { combineReducers, createStore } from "redux";
import authReducer from './authReducer'; 
import ProfileReducer from './ProfileReducer'
import contentReducer from './contentReducer'
import loaderReducer from './loaderReducer'

// import other reducers
const rootReducer = combineReducers({
    // Key Value map of reducers
    authUser: authReducer,
    info: ProfileReducer,
    allContent:contentReducer,
    loaders:loaderReducer,

});

//Store
export const store = createStore(rootReducer);

   



export default rootReducer;
