import firebase from '../../firebaseConfig'
import * as actionTypes from './actionTypes';
import {store} from '../../index'

export const createNewMessage = (message) => {

    const newMessage = {
        ...message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    }
    const userUID = store.getState().auth.user.uid
    const isPrivateChannel = store.getState().channel.isPrivateChannel
    const channelId = store.getState().channel.selectedChannel.id
    let messageRef;
    if(isPrivateChannel){
        messageRef = firebase.database().ref("privateMessages")
    } else messageRef = firebase.database().ref("messages")
    return dispatch => {
        messageRef
            .child(channelId)
            .push()
            .set(newMessage)
            .then(() => {
                dispatch({type: actionTypes.CREATE_MESSAGE})
                firebase.database().ref("typing")
                    .child(channelId)
                    .child(userUID)
                    .remove()
            })
            .catch(err => {
                console.error(err);
            });
    }
}


export const loadMessages = (channelId) => {
    const isPrivateChannel = store.getState().channel.isPrivateChannel
    let messageRef;
    if(isPrivateChannel){
        messageRef = firebase.database().ref("privateMessages")
    } else messageRef = firebase.database().ref("messages")
    return dispatch => {
        messageRef.child(channelId).on("value", snap => {
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
            });
            
    } 
}