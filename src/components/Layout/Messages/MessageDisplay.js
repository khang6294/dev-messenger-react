import React from 'react';
import Message from "./Message";
import { Segment, Comment } from "semantic-ui-react";

const messageDisplay = (props) => {
    const {loadedMessages,user} = props
    let displayMessages = null
    if(loadedMessages.length > 0){
        displayMessages = loadedMessages.map(message => <Message
            key={message.timestamp}
            message={message}
            user={user}
        />)
    } else {
        displayMessages = <p>Loading...</p>
    }
    return (
        <Segment>
            <Comment.Group className="messages">
                {displayMessages}
            </Comment.Group>
        </Segment>
    )
}

export default messageDisplay;