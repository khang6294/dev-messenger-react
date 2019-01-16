import React from 'react';
import { Header, Icon} from "semantic-ui-react";


const logo = (props) => {
    return(
        <Header inverted floated="left" as={props.size}>
            <Icon name="code" />
            <Header.Content>DevMess</Header.Content>
        </Header>
    )
}

export default logo