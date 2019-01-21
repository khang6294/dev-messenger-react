import React from 'react';
import Message from "./Message";
import { Segment, Comment } from "semantic-ui-react";
import Typing from './Typing'
const messageDisplay = (props) => {
    const {loadedMessages,user,searchResults,selectedChannel,typingUsers} = props
    let displayMessages = null
    if(searchResults){
        displayMessages = searchResults.map(message => <Message
            key={message.timestamp}
            message={message}
            user={user}
        />)
    } else if(loadedMessages.length > 0){
        displayMessages = loadedMessages.map(message => <Message
            key={message.timestamp}
            message={message}
            user={user}
        />)
    } else if(!selectedChannel){
        displayMessages = <p>Please select channel</p>
    }
    else {
        displayMessages = <p>Loading...</p>
    }
    return (
        <Segment>
            <Comment.Group className="messages">
                {displayMessages}
                {
                    typingUsers.length > 0 &&
                    typingUsers.map(user => (
                      <div
                        style={{ display: "flex", alignItems: "center", marginBottom: "0.2em" }}
                        key={user.id}
                      >
                        <span className="user__typing">{user.name} is typing</span> <Typing />
                      </div>
                    ))
                }
                <div ref={props.setScrollRef}>
                </div>
            </Comment.Group>
        </Segment>
    )
}

export default messageDisplay;