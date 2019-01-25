import React from "react";
import { Segment, Button, Input,Popup } from "semantic-ui-react";
import { Picker, emojiIndex } from "emoji-mart";
import firebase from '../../../firebaseConfig'
import "emoji-mart/css/emoji-mart.css";
import uuidv4 from "uuid/v4";
import mime from "mime-types";

class MessageForm extends React.Component {
    state = {
        message: "",
        loading: false,
        uploadTask: null,
        uploadState: "",
        percentUploaded: 0,
        errors: [],
        storageRef: firebase.storage().ref(),
        typingRef: firebase.database().ref("typing"),
        file: null,
        authorized: ["image/jpeg", "image/png"],
        messageRef: firebase.database().ref("messages"),
        privateMessagesRef: firebase.database().ref("privateMessages")
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    createNewMessage = (fileUrl = null) => {
        const { message } = this.state;

        const newMessage = {
            user: {
                id: this.props.user.uid,
                name: this.props.user.displayName,
                avatar: this.props.user.photoURL
            }
        };
        if (fileUrl !== null) {
            newMessage["image"] = fileUrl;
          } else {
            newMessage["content"] = message;
          }

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

    onChangeFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            this.setState({ file },() => this.sendFile());
        }
    }
    
    sendFile = () => {
        const { file } = this.state;    
        if (file !== null) {
            if (this.isAuthorized(file.name)) {
                const metadata = { contentType: mime.lookup(file.name) };
                this.uploadFile(file, metadata);
                this.clearFile();
            }
        }
    };
    
    isAuthorized = filename => this.state.authorized.includes(mime.lookup(filename));
    
    clearFile = () => this.setState({ file: null });

    getPath = () => {
        if (this.props.isPrivateChannel) {
          return `chat/private/${this.props.selectedChannel.id}`;
        } else {
          return "chat/public";
        }
    };
    uploadFile = (file, metadata) => {
        const pathToUpload = this.props.selectedChannel.id;
        const ref = this.props.isPrivateChannel ? this.state.privateMessagesRef : this.state.messageRef;
        const filePath = `${this.getPath()}/${uuidv4()}.jpg`;
    
        this.setState({
            uploadState: "uploading",
            uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
        }, () => {
            this.state.uploadTask.on("state_changed", snap => {
                const percentUploaded = Math.round(
                    (snap.bytesTransferred / snap.totalBytes) * 100
                );
                this.setState({ percentUploaded });
            },
            err => {
                console.error(err);
                this.setState({
                    errors: this.state.errors.concat(err),
                    uploadState: "error",
                    uploadTask: null
                });
            },
            () => {
                this.state.uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then(downloadUrl => {
                        this.sendFileMessage(downloadUrl, ref, pathToUpload);
                    })
                    .catch(err => {
                        console.error(err);
                        this.setState({
                            // errors: this.state.errors.concat(err),
                            uploadState: "error",
                            uploadTask: null
                        });
                    });
                }
            );
        }
        );
    };
    
    sendFileMessage = (fileUrl, ref, pathToUpload) => {
        ref
            .child(pathToUpload)
            .push()
            .set(this.createNewMessage(fileUrl))
            .then(() => {
                this.setState({ uploadState: "done" });
            })
            .catch(err => {
                console.error(err);
                this.setState({
                errors: this.state.errors.concat(err)
                });
            });
    };

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
            <>
                <Button
                    as="label"
                    htmlFor="uploadInput"
                    icon="image"
                    disabled = {this.props.selectedChannel ? false: true} 
                />
                <input
                    hidden
                    id="uploadInput"
                    multiple
                    type="file"
                    onChange={this.onChangeFile} 
                />
            </>         
            </Input>            
        </Segment>
        );
    }
}

export default MessageForm;
