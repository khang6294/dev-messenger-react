import React from "react";
import firebase from "../../../firebaseConfig";
import { Menu, Icon } from "semantic-ui-react";

class DirectMessages extends React.Component {
    state = {
        activeChannel: "",
        users: [],
        usersRef: firebase.database().ref("users"),
        connectedRef: firebase.database().ref(".info/connected"),
        presenceRef: firebase.database().ref("presence")
    };

    componentDidMount() {
        if (this.props.user) {
            this.addListeners(this.props.user.uid);
        }
    }

    addListeners = currentUserUid => {
        let loadedUsers = [];
        this.state.usersRef.on("child_added", snap => {
            if (currentUserUid !== snap.key) {
                let user = snap.val();
                user["uid"] = snap.key;
                user["status"] = "offline";
                loadedUsers.push(user);
                console.log(loadedUsers)
                this.setState({ users: loadedUsers });
            }
        });

        this.state.connectedRef.on("value", snap => {
            if (snap.val() === true) {
                if(currentUserUid){
                    const ref = this.state.presenceRef.child(currentUserUid);
                    ref.set(true);
                    ref.onDisconnect().remove(err => {
                        if (err !== null) {
                            console.error(err);
                        }
                    });
                } 
            }
        });

        this.state.presenceRef.on("child_added", snap => {
            if (currentUserUid !== snap.key) {
                this.addStatusToUser(snap.key);
            }
        });

        this.state.presenceRef.on("child_removed", snap => {
            if (currentUserUid !== snap.key) {
                this.addStatusToUser(snap.key, false);
            }
        });
    };

    addStatusToUser = (userId, connected = true) => {
        const updatedUsers = this.state.users.reduce((acc, user) => {
            if (user.uid === userId) {
                user["status"] = `${connected ? "online" : "offline"}`;
            }
            return acc.concat(user);
        }, []);
        this.setState({ users: updatedUsers });
    };

    isUserOnline = user => user.status === "online";

    changeChannel = user => {
        const channelId = this.getChannelId(user.uid);
        const channelData = {
            id: channelId,
            name: user.name
        };
        this.props.setSelectedChannel(channelData);
        this.props.setPrivateChannel();
        this.setActiveChannel(user.uid);
    };

    getChannelId = userId => {
        const currentUserId = this.props.user.uid;
        return userId < currentUserId
        ? `${userId}/${currentUserId}`
        : `${currentUserId}/${userId}`;
    };

    setActiveChannel = userId => {
        this.setState({ activeChannel: userId });
    };

    render() {
        const { users, activeChannel } = this.state;
        // console.log(users)
        return (
        <Menu.Menu className="menu">
            <Menu.Item>
            <span>
                <Icon name="mail" /> DIRECT MESSAGES
            </span>{" "}
            ({users.length})
            </Menu.Item>
            {users.map(user => (
            <Menu.Item
                key={user.uid}
                active={this.props.isPrivateChannel ? user.uid === activeChannel : false}
                onClick={() => this.changeChannel(user)}
                style={{ opacity: 0.7, fontStyle: "italic" }}
            >
                <Icon
                name="circle"
                color={this.isUserOnline(user) ? "green" : "red"}
                />
                @ {user.name}
            </Menu.Item>
            ))}
        </Menu.Menu>
        );
    }
}

export default DirectMessages;
