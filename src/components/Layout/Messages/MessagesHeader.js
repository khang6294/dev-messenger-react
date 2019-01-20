import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

class MessagesHeader extends React.Component {
    state = {
        searchTerm: ''
    }
    render() {
        const {searchTerm} = this.state
        return (
        <Segment clearing>
            <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
            <span>
            {this.props.channelName}
            <Icon name={"star outline"} color="black" />
            </span>
            <Header.Subheader>{this.props.numOfUsers}</Header.Subheader>
            </Header>

            <Header floated="right">
            <Input
                size="mini"
                icon="search"
                name="searchTerm"
                placeholder="Search Messages"
            />
            </Header>
        </Segment>
        );
    }
}

export default MessagesHeader;
