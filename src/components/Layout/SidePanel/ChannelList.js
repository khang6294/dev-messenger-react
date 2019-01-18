import React from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class ChannelList extends React.Component {
    state = {
        channelName: "",
        channelDescription: "",
        modal: false
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

    changeChannel = channel => {
        this.setState({ 
            activeChannel: channel.id 
        });
        this.props.setSelectedChannel(channel);
    };
    
    render() {
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
                    active={channel.id === this.state.activeChannel}
                >
                # {channel.name}
                </Menu.Item>
            ))
        }
        return (
        <React.Fragment>
            <Menu.Menu style={{ paddingBottom: "2em" }}>
            <Menu.Item>
                <span>
                <Icon name="exchange" /> CHANNELS
                </span>{" "}
                ({channelList.length}) <Icon name="add" onClick={this.openModal} />
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
