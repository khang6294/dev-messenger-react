import React,{Component} from "react";
import firebase from "../../../firebaseConfig";
import { connect } from "react-redux";
import * as actionCreators from '../../../store/actions/index'
import { Sidebar, Menu, Divider, Button, Modal, Icon, Label, Segment,Grid } from "semantic-ui-react";
import { ChromePicker } from "react-color";

class ColorPanel extends Component {
    state = {
        modal: false,
        primary: "",
        secondary: "",
        user: this.props.user,
        usersRef: firebase.database().ref("users"),
        userColors: [{
            primary: "#4c3c4c",
            secondary: "#eee"
        }]
    };

    componentDidMount() {
        if (this.state.user) {
            this.addListener(this.state.user.uid);
        }
    }

    addListener = userId => {
        let userColors = [{
            primary: "#4c3c4c",
            secondary: "#eee"
        }];
        this.state.usersRef.child(`${userId}/colors`).on("child_added", snap => {
            userColors.unshift(snap.val());
            this.setState({ userColors });
        });
    };

    handleChangePrimary = color => this.setState({ primary: color.hex });

    handleChangeSecondary = color => this.setState({ secondary: color.hex });

    handleSaveColors = () => {
        if (this.state.primary && this.state.secondary) {
            this.saveColors(this.state.primary, this.state.secondary);
        }
    };

    saveColors = (primary, secondary) => {
        this.state.usersRef
            .child(`${this.state.user.uid}/colors`)
            .push()
            .update({
                primary,
                secondary
            })
            .then(() => {
                this.closeModal();
            })
            .catch(err => console.error(err));
    };

    displayUserColors = colors =>
        colors.length > 0 &&
        colors.map((color, i) => (
            <React.Fragment key={i}>
                <Divider />
                <div
                    className="color__container"
                    onClick={() => this.props.setColors(color.primary, color.secondary)}
                >
                <div className="color__square" style={{ background: color.primary }}>
                    <div
                        className="color__overlay"
                        style={{ background: color.secondary }}
                    />
                </div>
                </div>
            </React.Fragment>
        ));

    openModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });

    render() {
        const { modal, primary, secondary, userColors } = this.state;

        return (
        <Sidebar
            as={Menu}
            icon="labeled"
            inverted
            vertical
            visible
            width="very thin"
        >
            <Divider />
            <Button icon="add" size="small" color="blue" onClick={this.openModal} />
            {this.displayUserColors(userColors)}
            <Modal open={modal} onClose={this.closeModal}>
                <Modal.Header>Choose App Colors</Modal.Header>
                <Modal.Content>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Label content="Primary Color" />
                                    <ChromePicker
                                        color={primary}
                                        onChange={this.handleChangePrimary}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Label content="Secondary Color" />
                                    <ChromePicker
                                        color={secondary}
                                        onChange={this.handleChangeSecondary}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" inverted onClick={this.handleSaveColors}>
                    <Icon name="checkmark" /> Save Colors
                    </Button>
                    <Button color="red" inverted onClick={this.closeModal}>
                    <Icon name="remove" /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </Sidebar>
        );
    }
}

export default connect(null,
    { 
        setColors: actionCreators.setColors,
    }
)(ColorPanel);
