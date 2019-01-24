import React from "react";
import { Menu, Icon, Modal, Form, Input, Button,Label } from "semantic-ui-react";
import firebase from '../../../firebaseConfig'

class ChannelList extends React.Component {
    state = {
        channelName: "",
        channel: null,
        channelDescription: "",
        modal: false,
        typingRef: firebase.database().ref("typing"),
        messagesRef: firebase.database().ref("messages"),
        notifications: []
    };

    componentDidUpdate(prevProps){
        if(!this.props.selectedChannel && this.props.channelList.length > 0){
            this.props.setSelectedChannel(this.props.channelList[0])
            this.setState({ 
                activeChannel: this.props.channelList[0].id,
                channel: this.props.channelList[0].id
            },() => {
                for(let i = 0; i < this.props.channelList.length; i++){
                    this.addNotificationListener(this.props.channelList[i].id);
                }
            });
        }
    }

    addNotificationListener = channelId => {
        this.state.messagesRef.child(channelId).on("value", snap => {
            if (this.state.channel) {
                this.handleNotifications(
                    channelId,
                    this.state.channel.id,
                    this.state.notifications,
                    snap
                );
            }
        });
    };
    
    handleNotifications = (channelId, currentChannelId, notifications, snap) => {
        let lastTotal = 0;
    
        let index = notifications.findIndex(
          notification => notification.id === channelId
        );
    
        if (index !== -1) {
            if (channelId !== currentChannelId) {
                lastTotal = notifications[index].total;
        
                if (snap.numChildren() - lastTotal > 0) {
                notifications[index].count = snap.numChildren() - lastTotal;
                }
            }
            notifications[index].lastKnownTotal = snap.numChildren();
            } else {
            notifications.push({
                id: channelId,
                total: snap.numChildren(),
                lastKnownTotal: snap.numChildren(),
                count: 0
            });
        }
    
        this.setState({ notifications });
    };

    componentDidMount(){
        this.props.loadChannelList();
    }

    componentWillUnmount(){
        this.props.removeLoadChannelList();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    openModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.addChannel();
        }
    };
    
    isFormValid = ({ channelName, channelDescription }) => channelName && channelDescription;

    addChannel = () => {  
        const newChannel = {
            name: this.state.channelName,
            description: this.state.channelDescription,
            createdBy: {
                name: this.props.user.displayName,
                avatar: this.props.user.photoURL
            }
        };
        this.props.handleAddChannel(newChannel)
        this.setState({ channelName: "", channelDescription: "" });
        this.closeModal();
    };

    clearNotifications = () => {
        let index = this.state.notifications.findIndex(
            notification => notification.id === this.state.channel.id
        );
    
        if (index !== -1) {
            let updatedNotifications = [...this.state.notifications];
            updatedNotifications[index].total = this.state.notifications[
                index
            ].lastKnownTotal;
            updatedNotifications[index].count = 0;
            this.setState({ notifications: updatedNotifications });
        }
    };

    changeChannel = channel => {
        this.setState({ 
            activeChannel: channel.id,
            channel: channel 
        },() => this.clearNotifications());
        if(this.props.selectedChannel){
            this.state.typingRef
            .child(this.props.selectedChannel.id)
            .child(this.props.user.uid)
            .remove();
        }
        this.props.setPrivateChannel();
        this.props.setSelectedChannel(channel);
    };

    getNotificationCount = channel => {
        let count = 0;
    
        this.state.notifications.forEach(notification => {
            if (notification.id === channel.id) {
                count = notification.count;
            }
        });
    
        if (count > 0) return count;
    };
    
    render() {
        // console.log(this.props.selectedChannel)
        const { modal } = this.state;
        const { channelList } = this.props;
        let channelListDisplay;
        if(channelList.length > 0){
            channelListDisplay = channelList.map(channel => (
                <Menu.Item
                    key={channel.id}
                    onClick={() => this.changeChannel(channel)}
                    name={channel.name}
                    style={{ opacity: 0.8 }}
                    active={
                        !this.props.isPrivateChannel? 
                        !this.state.activeChannel && this.props.selectedChannel ? 
                        channel.id === this.props.selectedChannel.id: 
                        channel.id === this.state.activeChannel : 
                        false
                    }
                >
                {this.getNotificationCount(channel) && (
                <Label color="red">{this.getNotificationCount(channel)}</Label>
                )}
                # {channel.name}
                </Menu.Item>
            ))
        }
        return (
        <React.Fragment>
            <Menu.Menu style={{ paddingBottom: "2em" }}>
            <Menu.Item>
                <span>
                <Icon name="exchange"/> CHANNELS
                </span>{" "}
                ({channelList.length}) <Icon name="add" link onClick={this.openModal} />
            </Menu.Item>
            {channelListDisplay}
            </Menu.Menu>

            <Modal open={modal} onClose={this.closeModal} size="tiny">
                <Modal.Header>New Channel</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Input
                            fluid
                            label="Name"
                            name="channelName"
                            onChange={this.handleChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Input
                            fluid
                            label="Description"
                            name="channelDescription"
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button color="green" inverted onClick={this.handleSubmit}>
                        <Icon name="checkmark" /> Add
                    </Button>
                    <Button color="red" inverted onClick={this.closeModal}>
                        <Icon name="remove" /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </React.Fragment>
        );
    }
}

export default ChannelList;
