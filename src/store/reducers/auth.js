const initialState = {
    userRegister: {},
    error:{}
}


const manageAuth = (state = initialState, action) => {
    switch (action.type){
        case "REGISTER_SUCCESS":
        return {
            ...state,
            userRegister: action.payload,
        }
        case "REGISTER_FAIL":
        return {
            ...state,
            error: action.payload
        }
        default:
        return state
    }
}

export default manageAuth