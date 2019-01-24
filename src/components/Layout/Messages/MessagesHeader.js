import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

class MessagesHeader extends React.Component {
    state = {
        searchTerm: ''
    }

    handleChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        },() => this.props.onSearch(this.state.searchTerm))
    }
    render() {
        const {searchTerm} = this.state
        return (
        <Segment clearing>
            <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
            <span>
            {this.props.isPrivateChannel ? `@${this.props.channelName}`:`#${this.props.channelName}` }
            {!this.props.isPrivateChannel &&
            <Icon name={"star outline"} color="black" />
            }
            </span>
            {!this.props.isPrivateChannel &&
            <Header.Subheader>{this.props.numOfUsers}</Header.Subheader>
            }
            </Header>

            <Header floated="right">
            <Input
                size="mini"
                icon="search"
                name="searchTerm"
                placeholder="Search Messages"
                onChange = {this.handleChange}
                value = {searchTerm}
                disabled = {this.props.selectedChannel ? false: true}
            />
            </Header>
        </Segment>
        );
    }
}

export default MessagesHeader;
