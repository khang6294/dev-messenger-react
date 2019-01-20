import * as actionTypes from './actionTypes'


export const setColors = (primaryColor, secondaryColor) => {
    return {
        type: actionTypes.SET_COLORS,
        payload: {
            primaryColor,
            secondaryColor
        }
    };
};