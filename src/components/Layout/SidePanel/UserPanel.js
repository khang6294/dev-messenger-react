import React from "react";
import { Grid, Header, Dropdown, Image,Icon } from "semantic-ui-react";
import Logo from '../../Logo/Logo'
class UserPanel extends React.Component {

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
                                            <Dropdown.Item>
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
            </Grid>
        );
    }
}


export default UserPanel
