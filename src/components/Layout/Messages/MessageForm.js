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
        if(event.keyCode === 13){
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
        const { errors, message, loading } = this.state;

        return (
        <Segment className="message__form">
            <Input
                fluid
                name="message"
                onChange={this.handleChange}
                onKeyUp={this.createNewMessageOnEnter}
                value={message}
                style={{ marginBottom: "0.7em" }}
                label={<Button icon={"add"} />}
                labelPosition="left"
                className={
                    errors.some(error => error.message.includes("message"))
                    ? "error"
                    : ""
                }
                placeholder="Write your message"
                disabled = {this.props.selectedChannel ? false: true}
            />
            <Button.Group icon widths="2">
            <Button
                onClick={this.createNewMessage}
                disabled = {this.props.selectedChannel ? false: true}
                color="orange"
                content="Add Reply"
                labelPosition="left"
                icon="edit"
            />
            <Button
                disabled = {this.props.selectedChannel ? false: true}
                color="teal"
                content="Upload Media"
                labelPosition="right"
                icon="cloud upload"
            />
            </Button.Group>
        </Segment>
        );
    }
}

export default MessageForm;
