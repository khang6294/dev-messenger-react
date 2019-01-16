import * as actionTypes from '../actions/actionTypes'

const initialState = {
    channelList: [],
    selectedChannel:null
}


const channelReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_CHANNEL:
        return {
            ...state,
        }
        case actionTypes.LOAD_CHANNEL_LIST:
        return {
            ...state,
            channelList: action.payload
        }
        case actionTypes.SET_SELECTED_CHANNEL:
        return {
            ...state,
            selectedChannel: action.payload
        }
        default:
        return state
    }
}

export default channelReducer