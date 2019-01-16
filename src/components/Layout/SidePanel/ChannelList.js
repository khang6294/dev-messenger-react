import React from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class ChannelList extends React.Component {
    state = {
        channels: [],
        channelName: "",
        channelDescription: "",
        modal: false
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    openModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });

    render() {
        const { channels, modal } = this.state;

        return (
        <React.Fragment>
            <Menu.Menu style={{ paddingBottom: "2em" }}>
            <Menu.Item>
                <span>
                <Icon name="exchange" /> CHANNELS
                </span>{" "}
                ({channels.length}) <Icon name="add" onClick={this.openModal} />
            </Menu.Item>
            {/* Channels */}
            </Menu.Menu>

            <Modal open={modal} onClose={this.closeModal} size="tiny">
                <Modal.Header>New Channel</Modal.Header>
                <Modal.Content>
                    <Form>
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
                    <Button color="green" inverted>
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
