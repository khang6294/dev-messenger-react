import * as actionTypes from '../actions/actionTypes'

const initialState = {
    userRegister: {},
    error:{},
    user:{},
    isLoading:true
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
        case actionTypes.SET_USER:
        return {
            ...state,
            user: action.payload ? action.payload: {},
            isLoading:false
        }
        case actionTypes.LOGOUT:
        return {
            ...initialState,
            isLoading:false
        }
        default:
        return state
    }
}

export default manageAuth