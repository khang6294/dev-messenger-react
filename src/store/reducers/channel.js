import * as actionTypes from '../actions/actionTypes'

const initialState = {
    channelList: [],
    selectedChannel:null,
    isPrivateChannel: false
}


const channelReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_CHANNEL:
        let channelListClone = [...state.channelList]
        channelListClone.push(action.payload)
        return {
            ...state,
            channelList: channelListClone       
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
        case actionTypes.SET_PRIVATE_CHANNEL:
        return {
            ...state,
            isPrivateChannel: action.payload.isPrivateChannel
        };
        default:
        return state
    }
}

export default channelReducer