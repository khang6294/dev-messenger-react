import * as actionTypes from '../actions/actionTypes'


const initialColorsState = {
    primaryColor: "#4c3c4c",
    secondaryColor: "#eee"
};

const colorReducer = (state = initialColorsState, action) => {
    switch (action.type) {
        case actionTypes.SET_COLORS:
            return {
                primaryColor: action.payload.primaryColor,
                secondaryColor: action.payload.secondaryColor
            };
        default:
            return state;
    }
};

export default colorReducer