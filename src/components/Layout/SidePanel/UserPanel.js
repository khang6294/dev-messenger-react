import React from "react";
import { Grid, Header, Dropdown, Image,Icon,Modal,Button,Input } from "semantic-ui-react";
import Logo from '../../Logo/Logo'
import AvatarEditor from "react-avatar-editor";
import firebase from '../../../firebaseConfig'

class UserPanel extends React.Component {
    state = {
        modal: false,
        previewImage: "",
        croppedImage: "",
        blob: null,
        uploadedCroppedImage: "",
        storageRef: firebase.storage().ref(),
        userRef: firebase.auth().currentUser,
        usersRef: firebase.database().ref("users"),
        metadata: {
            contentType: "image/jpeg"
        }
    };

    openModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });

    handleChange = event => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        if (file) {
            reader.readAsDataURL(file);
            reader.addEventListener("load", () => {
                this.setState({ previewImage: reader.result });
            });
        }
    };

    handleCropImage = () => {
        if (this.avatarEditor) {
            this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
                let imageUrl = URL.createObjectURL(blob);
                this.setState({
                    croppedImage: imageUrl,
                    blob
                });
            });
        }
    };

    uploadCroppedImage = () => {
        const { storageRef, userRef, blob, metadata } = this.state;
    
        storageRef
            .child(`avatars/user-${userRef.uid}`)
            .put(blob, metadata)
            .then(snap => {
                snap.ref.getDownloadURL().then(downloadURL => {
                    this.setState({ uploadedCroppedImage: downloadURL }, () =>
                        this.changeAvatar()
                    );
                });
            });
    };
    
    changeAvatar = () => {
        this.state.userRef
            .updateProfile({
                photoURL: this.state.uploadedCroppedImage
            })
            .then(() => {
                console.log("PhotoURL updated");
                this.closeModal();
            })
            .catch(err => {
                console.error(err);
            });
        
        this.state.usersRef
            .child(this.props.user.uid)
            .update({ avatar: this.state.uploadedCroppedImage })
            .then(() => {
                console.log("User avatar updated");
            })
            .catch(err => {
                console.error(err);
            });
    };


    render() {
        const {user} = this.props
        const { modal, previewImage, croppedImage } = this.state;
        return (
            <Grid style={{ background: this.props.primaryColor}}>
                <Grid.Column>
                    <Grid columns={2}>
                        <Grid.Row style={{ padding: "1.2em",paddingLeft:0, margin: 0 }}>
                            <Grid.Column width={7}>
                                <Header style={{ padding: "0.2em" }} as="h5" inverted>
                                    <Dropdown 
                                        trigger={
                                            <span>
                                            <Image src={user.photoURL} spaced="right" avatar />
                                                {user.displayName}
                                            </span>
                                        }
                                    >
                                        <Dropdown.Menu>
                                            <Dropdown.Header 
                                                icon='user' 
                                                content={
                                                    <span>
                                                        Signed in as <strong>{this.props.user.displayName}</strong>
                                                    </span>} 
                                            />
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={this.openModal}>
                                                <Icon name="picture" />
                                                Change Avatar
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.props.logout()}>
                                                <Icon name="log out" />
                                                Log Out
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Header>
                            </Grid.Column>
                            <Grid.Column>
                                <Logo size="h2" floated="left" inverted={true}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                {/* Change User Avatar Modal   */}
                <Modal open={modal} onClose={this.closeModal}>
                    <Modal.Header>Change Avatar</Modal.Header>
                    <Modal.Content>
                    <Input
                        onChange={this.handleChange}
                        fluid
                        type="file"
                        label="New Avatar"
                        name="previewImage"
                    />
                    <Grid centered stackable columns={2}>
                        <Grid.Row centered>
                        <Grid.Column className="ui center aligned grid">
                            {previewImage && (
                            <AvatarEditor
                                ref={node => (this.avatarEditor = node)}
                                image={previewImage}
                                width={120}
                                height={120}
                                border={50}
                                scale={1.2}
                            />
                            )}
                        </Grid.Column>
                        <Grid.Column>
                            {croppedImage && (
                            <Image
                                style={{ margin: "3.5em auto" }}
                                width={100}
                                height={100}
                                src={croppedImage}
                            />
                            )}
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                    {croppedImage && (
                        <Button
                        color="green"
                        inverted
                        onClick={this.uploadCroppedImage}
                        >
                        <Icon name="save" /> Change Avatar
                        </Button>
                    )}
                    <Button color="green" inverted onClick={this.handleCropImage}>
                        <Icon name="image" /> Preview
                    </Button>
                    <Button color="red" inverted onClick={this.closeModal}>
                        <Icon name="remove" /> Cancel
                    </Button>
                    </Modal.Actions>
                </Modal>
            </Grid>
        );
    }
}


export default UserPanel
