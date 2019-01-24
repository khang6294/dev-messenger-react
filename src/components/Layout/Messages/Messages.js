import React from "react";
import firebase from '../../../firebaseConfig'
import {connect} from 'react-redux'
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import MessageDisplay from './MessageDisplay'
import * as actionCreators from '../../../store/actions/index'
class Messages extends React.Component {
    state = {
        searchResults: null,
        typingRef: firebase.database().ref("typing"),
        typingUsers: [],
        connectedRef: firebase.database().ref(".info/connected"),
        privateMessagesRef: firebase.database().ref("privateMessages")
    };

    componentDidUpdate(){
        if(this.messagesEnd){
            this.scrollToBottom()
        }
    }

    componentDidMount() {
        if(this.props.selectedChannel){
            this.props.loadMessages(this.props.selectedChannel.id)
            this.addTypingListeners(this.props.selectedChannel.id)      
        }
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior:'smooth'})
    }

    setScrollRef = (node) => {
        this.messagesEnd = node
    }

    displayChannelName = () => 
        this.props.selectedChannel ? this.props.selectedChannel.name : "Channel"

    displayNumOfUsers = () => {
        const numOfUsers = this.props.loadedMessages.reduce((userArr,message) => {
            const user = message.user.name
            if(!userArr.includes(user)){
                userArr.push(user)
            }
            return userArr
        },[])
        return `${numOfUsers.length} user${numOfUsers.length > 1 ? "s": ""}`
    }

    onSearch = (searchTerm) => {
        if(searchTerm === ""){
            this.setState({
                searchResults: null
            })
        } else {
            const searchResults = this.props.loadedMessages.reduce((searchRes,message) => {
                const content = message.content
                const userName = message.user.name
                if(content){
                    if(content.includes(searchTerm) || userName.includes(searchTerm)){
                        searchRes.push(message)
                    }
                }
                return searchRes
            },[])
            this.setState({
                searchResults: searchResults
            })
        }
    }

    addTypingListeners = channelId => {
        let typingUsers = [];
        this.state.typingRef.child(channelId).on("child_added", snap => {
            if (snap.key !== this.props.user.uid) {
                typingUsers = typingUsers.concat({
                    id: snap.key,
                    name: snap.val()
                });
                this.setState({ typingUsers });
            }
        });
    
        this.state.typingRef.child(channelId).on("child_removed", snap => {
            const index = typingUsers.findIndex(user => user.id === snap.key);
            if (index !== -1) {
                typingUsers = typingUsers.filter(user => user.id !== snap.key);
                this.setState({ typingUsers });
            }
        });
    
        this.state.connectedRef.on("value", snap => {
            if(this.props.user.uid){
                if (snap.val() === true) {
                    this.state.typingRef
                        .child(channelId)
                        .child(this.props.user.uid)
                        .onDisconnect()
                        .remove(err => {
                            if (err !== null) {
                                console.error(err);
                            }
                        });
                }
            }   
        });
    };

    render() {
        return (
        <React.Fragment>
            <MessagesHeader 
                selectedChannel = {this.props.selectedChannel}
                channelName = {this.displayChannelName()}
                numOfUsers = {this.displayNumOfUsers()}
                onSearch = {(searchTerm) => this.onSearch(searchTerm)}
                isPrivateChannel = {this.props.isPrivateChannel}
            />
            <MessageDisplay
                loadedMessages =  {this.props.loadedMessages}
                user = {this.props.user}
                searchResults = {this.state.searchResults}
                setScrollRef={this.setScrollRef}
                typingUsers = {this.state.typingUsers}
                messageLoading = {this.props.messageLoading}
            />
            <MessageForm
                selectedChannel={this.props.selectedChannel}
                user={this.props.user}
                createNewMessage = {(message) => {
                    this.props.createNewMessage(message)
                }}
                isPrivateChannel = {this.props.isPrivateChannel}
            />
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    selectedChannel: state.channel.selectedChannel,
    isPrivateChannel: state.channel.isPrivateChannel,
    loadedMessages: state.message.loadedMessages,
    messageLoading: state.message.messageLoading,
})

export default connect(mapStateToProps,{
    createNewMessage: actionCreators.createNewMessage,
    loadMessages: actionCreators.loadMessages
})(Messages);
