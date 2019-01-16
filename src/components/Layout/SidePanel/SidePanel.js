import React from "react";
import UserPanel from "./UserPanel";
import { Menu } from "semantic-ui-react";
import ChannelList from './ChannelList'
class SidePanel extends React.Component {
    render() {

        return (
        <Menu
            size="massive"
            inverted
            fixed="left"
            vertical
            style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
        >
            <UserPanel />
            <ChannelList/>
        </Menu>
        );
    }
}

export default SidePanel;
