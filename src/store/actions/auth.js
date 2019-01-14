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
                        firebase.database().ref("users").child(createdUser.user.uid).set({
                            name: createdUser.user.displayName,
                            avatar: createdUser.user.photoURL
                        })
                            .then(() => {
                                dispatch({type:actionTypes.REGISTER_SUCCESS,payload: createdUser})
                            })
                    })
                    .catch(err => {
                        dispatch({type: actionTypes.REGISTER_FAIL,payload:err})
                    });
                
            })
            .catch(err => {
                dispatch({type: actionTypes.REGISTER_FAIL,payload:err})
            });
    }
}