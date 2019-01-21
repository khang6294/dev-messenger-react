import React from "react";
import {Segment,Accordion,Header,Icon,Image} from "semantic-ui-react";

class MetaPanel extends React.Component {
    state = {
        activeIndex: 0
    };

    setActiveIndex = (event, titleProps) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;
        this.setState({ activeIndex: newIndex });
    };

    formatCount = num => (num > 1 || num === 0 ? `${num} posts` : `${num} post`);

    render() {
        const { activeIndex } = this.state;
        const { selectedChannel } = this.props
        return (
        <Segment loading={!selectedChannel}>
            <Header as="h3" attached="top">
            About # {selectedChannel && selectedChannel.name}
            </Header>
            <Accordion styled attached="true">
            <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.setActiveIndex}
            >
                <Icon name="dropdown" />
                <Icon name="info" />
                Details
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
                {selectedChannel && selectedChannel.description}
            </Accordion.Content>

            <Accordion.Title
                active={activeIndex === 1}
                index={2}
                onClick={this.setActiveIndex}
            >
                <Icon name="dropdown" />
                <Icon name="pencil alternate" />
                Created By
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
                <Header as="h3">
                <Image circular src={selectedChannel && selectedChannel.createdBy.avatar} />
                {selectedChannel && selectedChannel.createdBy.name}
                </Header>
            </Accordion.Content>
            </Accordion>
        </Segment>
        );
    }
}

export default MetaPanel;
