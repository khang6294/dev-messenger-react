import React from "react";
import { Segment, Button, Input,Popup } from "semantic-ui-react";
import { Picker, emojiIndex } from "emoji-mart";
import firebase from '../../../firebaseConfig'
import "emoji-mart/css/emoji-mart.css";
class MessageForm extends React.Component {
    state = {
        message: "",
        loading: false,
        errors: [],
        storageRef: firebase.storage().ref(),
        typingRef: firebase.database().ref("typing")
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleKeyDown = () => {
        
    };

    createNewMessage = () => {
        const { message } = this.state;

        const newMessage = {
            user: {
                id: this.props.user.uid,
                name: this.props.user.displayName,
                avatar: this.props.user.photoURL
            },
            content: message
        };

        this.props.createNewMessage(newMessage)
        this.setState({loading: false,message:""})
    };
    
    handleAddEmoji = emoji => {
        const oldMessage = this.state.message;
        const newMessage = this.colonToUnicode(` ${oldMessage} ${emoji.colons} `);
        this.setState({ message: newMessage, emojiPicker: false });
        setTimeout(() => this.messageInputRef.focus(), 0);
    };
    
    colonToUnicode = message => {
        return message.replace(/:[A-Za-z0-9_+-]+:/g, x => {
            x = x.replace(/:/g, "");
            let emoji = emojiIndex.emojis[x];
            if (typeof emoji !== "undefined") {
                let unicode = emoji.native;
                if (typeof unicode !== "undefined") {
                return unicode;
                }
            }
            x = ":" + x + ":";
            return x;
        });
      };

    createNewMessageOnEnter = (event) => {
        const { message, typingRef } = this.state;
        const {selectedChannel,user} = this.props
        if(this.state.message.trim() === "") {
            typingRef
                .child(selectedChannel.id)
                .child(user.uid)
                .remove();
        } else if(event.keyCode === 13) {
            const { message } = this.state;

            const newMessage = {
                user: {
                    id: this.props.user.uid,
                    name: this.props.user.displayName,
                    avatar: this.props.user.photoURL
                },
                content: message
            };

            this.props.createNewMessage(newMessage)
            this.setState({loading: false,message:""})
        } else {       
            if (message !== "") {
                typingRef
                    .child(selectedChannel.id)
                    .child(user.uid)
                    .set(user.displayName);
            }
        }
    }

    render() {
        const { errors, message } = this.state;
        return (
        <Segment className="message__form">
            <Input
                fluid
                name="message"
                onChange={this.handleChange}
                onKeyUp={this.createNewMessageOnEnter}
                value={message}
                ref={node => (this.messageInputRef = node)}
                style={{ marginBottom: "0.7em" }}
                className={
                    errors.some(error => error.message.includes("message"))
                    ? "error"
                    : ""
            }
                placeholder="Write your message"
                disabled = {this.props.selectedChannel ? false: true}
                action
                
            >
            <input />
            <Button
                disabled = {this.props.selectedChannel && message.trim() !== "" ? false: true}
                icon="send"
                onClick={this.createNewMessage}
            />
            <Popup
                trigger={<Button
                    icon="smile outline"/>}
                    content={
                        <Picker
                            set="facebook"
                            onSelect={this.handleAddEmoji}
                            className="emojipicker"
                            title="Pick your emoji"
                            emoji="point_up"
                        />
                    }
                on='click'
                position='top right'
            />
            <Button
                disabled = {this.props.selectedChannel ? false: true}
                icon="cloud upload"            
                onClick={this.createNewMessage}
            />
            </Input>            
        </Segment>
        );
    }
}

export default MessageForm;
