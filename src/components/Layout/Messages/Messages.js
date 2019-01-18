import React from "react";
import {connect} from 'react-redux'
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import MessageDisplay from './MessageDisplay'
import * as actionCreators from '../../../store/actions/index'

class Messages extends React.Component {
    state = {
        messagesLoading: true,
    };

    componentDidMount() {
        if(this.props.selectedChannel){
            this.props.loadMessages(this.props.selectedChannel.id)      
        }
    }

    render() {
        return (
        <React.Fragment>
            <MessagesHeader 
                selectedChannel = {this.props.selectedChannel}
            />
            <MessageDisplay
                loadedMessages =  {this.props.loadedMessages}
                user = {this.props.user}
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
