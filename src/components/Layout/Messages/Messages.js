import React from "react";
import {connect} from 'react-redux'
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import MessageDisplay from './MessageDisplay'
import * as actionCreators from '../../../store/actions/index'

class Messages extends React.Component {
    state = {
        messagesLoading: true,
        searchResults: null
    };

    componentDidMount() {
        if(this.props.selectedChannel){
            this.props.loadMessages(this.props.selectedChannel.id)      
        }
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

    render() {
        return (
        <React.Fragment>
            <MessagesHeader 
                selectedChannel = {this.props.selectedChannel}
                channelName = {this.displayChannelName()}
                numOfUsers = {this.displayNumOfUsers()}
                onSearch = {(searchTerm) => this.onSearch(searchTerm)}
            />
            <MessageDisplay
                loadedMessages =  {this.props.loadedMessages}
                user = {this.props.user}
                searchResults = {this.state.searchResults}
            />
            <MessageForm
                selectedChannel={this.props.selectedChannel}
                user={this.props.user}
                createNewMessage = {(message) => {
                    this.props.createNewMessage(message)
                }}
            />
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    selectedChannel: state.channel.selectedChannel,
    loadedMessages: state.message.loadedMessages
})

export default connect(mapStateToProps,{
    createNewMessage: actionCreators.createNewMessage,
    loadMessages: actionCreators.loadMessages
})(Messages);
