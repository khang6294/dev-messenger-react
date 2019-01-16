import firebase from '../../firebaseConfig'
import * as actionTypes from './actionTypes';

export const handleAddChannel = (newChannel) => {
    newChannel = {
        ...newChannel,
        id: firebase.database().ref("channels").push().key
    }
    return dispatch => {
        firebase.database().ref("channels")
            .child(firebase.database().ref("channels").push().key)
            .update(newChannel)
            .then(() => {
                dispatch({type:actionTypes.ADD_CHANNEL , payload:''})
            })
            .catch(err => {
                console.error(err);
            });
    }
}

export const loadChannelList = () => {
    return dispatch => {
        let channelList = [];
        firebase.database().ref("channels").on("child_added", snap => {
            channelList.push(snap.val());
            return dispatch({type:actionTypes.LOAD_CHANNEL_LIST,payload: channelList})
          });
    }
}

export const setSelectedChannel = (channel) => {
    return ({type:actionTypes.SET_SELECTED_CHANNEL, payload: channel})
}

export const removeLoadChannelList = () => {
    return dispatch => {
        firebase.database().ref("channels").off();
    }
}
