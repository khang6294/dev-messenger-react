import React from 'react';
import { Header, Icon} from "semantic-ui-react";


const logo = (props) => {
    return(
        <Header inverted={props.inverted} floated={props.floated} as={props.size}>
            <Icon name="code" />
            <Header.Content>DevMess</Header.Content>
        </Header>
    )
}

export default logo