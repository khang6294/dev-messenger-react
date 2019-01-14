import firebase from '../../firebaseConfig'
import * as actionTypes from './actionTypes';
import md5 from 'md5'

export const register = (registerInfo) => {
    return dispatch => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(registerInfo.email, registerInfo.password)
            .then(createdUser => {
                createdUser.user.updateProfile({
                    displayName: registerInfo.name,
                    photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                })
                    .then(() => {
                        dispatch({type:actionTypes.REGISTER_SUCCESS,payload: createdUser})
                    })
                // .then(() => {
                //     this.saveUser(createdUser)
                //         .then((createdUserUpdated) => {
                //             dispatch({type:actionTypes.REGISTER_SUCCESS,payload: createdUserUpdated})
                //         });
                // })
                
            })
            .catch(err => {
                dispatch({type: actionTypes.REGISTER_FAIL,payload:err})
            });
    }
}