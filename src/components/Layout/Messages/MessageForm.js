import React from "react";
import { Segment, Button, Input } from "semantic-ui-react";

class MessageForm extends React.Component {
    state = {
        message: "",
        loading: false,
        errors: []
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
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

    createNewMessageOnEnter = (event) => {
        if(this.state.message.trim() === "") {
            return null;
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
                disabled = {this.props.selectedChannel ? false: true}
                icon="send"
                onClick={this.createNewMessage}
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
