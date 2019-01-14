import firebase from '../../firebaseConfig'
import * as actionTypes from './actionTypes';

export const register = (registerInfo) => {
    return dispatch => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(registerInfo.email, registerInfo.password)
            .then(createdUser => {
                dispatch({type:actionTypes.REGISTER_SUCCESS,payload: createdUser})
            })
            .catch(err => {
                dispatch({type: actionTypes.REGISTER_FAIL,payload:err})
            });
    }
}