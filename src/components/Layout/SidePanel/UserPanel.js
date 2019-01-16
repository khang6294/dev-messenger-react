import React from "react";
// import firebase from "../../firebase";
import { Grid, Header, Dropdown, Image } from "semantic-ui-react";
import Logo from '../../Logo/Logo'

class UserPanel extends React.Component {


    dropdownOptions = () => [
        {
            key: "user",
            text: (
                <span>
                    Signed in as <strong>{this.props.user.displayName}</strong>
                </span>
        ),
            disabled: true
        },
        {
            key: "avatar",
            text: <span>Change Avatar</span>
        },
        {
            key: "signout",
            text: <span onClick={this.handleSignout}>Sign Out</span>
        }
    ];

  // handleSignout = () => {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => console.log("signed out!"));
  // };

    render() {
        const {user} = this.props
        return (
            <Grid style={{ background: "#4c3c4c" }}>
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
                                        options={this.dropdownOptions()}
                                    />
                                </Header>
                            </Grid.Column>
                            <Grid.Column>
                                <Logo size="h3"/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid>
        );
    }
}

export default UserPanel;
