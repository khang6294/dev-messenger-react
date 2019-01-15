import * as actionTypes from '../actions/actionTypes'

const initialState = {
    userRegister: {},
    error:{},
    user:{}
}


const manageAuth = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.REGISTER_SUCCESS:
        return {
            ...state,
            userRegister: action.payload,
        }
        case actionTypes.REGISTER_FAIL:
        return {
            ...state,
            error: action.payload
        }
        case actionTypes.LOGIN_SUCCESS:
        return{
            ...state,
            user:action.payload
        }
        case actionTypes.LOGIN_FAIL:
        return {
            ...state,
            error: action.payload
        }
        default:
        return state
    }
}

export default manageAuth