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
                firebase.database().ref("channels").endAt().limitToLast(1).once("child_added", snap => {
                    dispatch({type: actionTypes.ADD_CHANNEL,payload: snap.val()})
                })
            })
            .catch(err => {
                console.error(err);
            });
    }
}

export const loadChannelList = () => {
    return dispatch => {
        firebase.database().ref("channels").once("value", snap => {
            let channelList = [];
            const channelKeys = Object.keys(snap.val())
            const channelsObj = snap.val();
            for(let i = 0; i< channelKeys.length; i++){
                channelList.push(channelsObj[channelKeys[i]])
            }
            return dispatch({type:actionTypes.LOAD_CHANNEL_LIST,payload: channelList})
          });
    }
}

export const setSelectedChannel = (channel) => {
    return ({type:actionTypes.SET_SELECTED_CHANNEL, payload: channel})
}

export const setPrivateChannel = isPrivateChannel => {
    return {
        type: actionTypes.SET_PRIVATE_CHANNEL,
        payload: {
            isPrivateChannel
        }
    };
};

export const removeLoadChannelList = () => {
    return dispatch => {
        firebase.database().ref("channels").off();
    }
}
