import { SET_ACTIVE_SEARCH_COMBO_INDEX } from "../constants";

export default function botsReducer(state={
    activeSearchComboIndex:0,
}, action){
    switch(action.type){
        case SET_ACTIVE_SEARCH_COMBO_INDEX:
            return{
                ...state,
                activeSearchComboIndex : action.payload
            }
    default:
        return state;
}
}
