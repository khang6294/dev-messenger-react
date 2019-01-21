import firebase from '../../firebaseConfig'
import * as actionTypes from './actionTypes';
import {store} from '../../index'

export const createNewMessage = (message) => {

    const newMessage = {
        ...message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    }

    const channelId = store.getState().channel.selectedChannel.id
    const userUID = store.getState().auth.user.uid
    return dispatch => {
        firebase.database().ref("messages")
            .child(channelId)
            .push()
            .set(newMessage)
            .then(() => {
                firebase.database().ref("typing")
                    .child(channelId)
                    .child(userUID)
                    .remove();
                firebase.database().ref("messages").child(channelId).endAt().limitToLast(1).once("child_added", snap => {
                    dispatch({type: actionTypes.CREATE_MESSAGE,payload: snap.val()})
                })

                  
            })
            .catch(err => {
                console.error(err);
            });
    }
}


export const loadMessages = (channelId) => {
    return dispatch => {
        firebase.database().ref("messages").child(channelId).once("value", snap => {
            if(!snap.val()){
                dispatch({type:actionTypes.LOAD_MESSAGES,payload: []})
            } else {
                let loadedMessages = [];
                const messageKeys = Object.keys(snap.val())
                const messagesObj = snap.val();
                for(let i = 0; i< messageKeys.length; i++){
                    loadedMessages.push(messagesObj[messageKeys[i]])
                }
                dispatch({type:actionTypes.LOAD_MESSAGES,payload: loadedMessages})
            }
        })
    }
    
}