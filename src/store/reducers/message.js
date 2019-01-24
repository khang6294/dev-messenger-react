import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loadedMessages : [],
    messageLoading: true
}


const messageReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.CREATE_MESSAGE:
        return {
            ...state,
        }
        case actionTypes.LOAD_MESSAGES:
        return {
            loadedMessages: action.payload,
            messageLoading: false
        }
        default:
        return state
    }
}

export default messageReducer