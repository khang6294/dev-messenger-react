import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loadedMessages : [],
    messageLoading: true
}


const messageReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.CREATE_MESSAGE:
        let loadedMessagesClone = [...state.loadedMessages]
        loadedMessagesClone.push(action.payload)
        return {
            ...state,
            loadedMessages: loadedMessagesClone       
        }
        case actionTypes.LOAD_MESSAGES:
        return {
            ...state,
            loadedMessages: action.payload,
            messageLoading: false
        }
        default:
        return state
    }
}

export default messageReducer