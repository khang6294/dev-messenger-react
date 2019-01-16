import React from "react";
import UserPanel from "./UserPanel";
import { Menu } from "semantic-ui-react";
import {connect} from 'react-redux'
import ChannelList from './ChannelList'
import * as actionCreators from '../../../store/actions/index'

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
            <UserPanel
                logout = {() => this.props.logout()}
                user = {this.props.user}
            
            />
            <ChannelList
                handleAddChannel = {(newChannel) => this.props.handleAddChannel(newChannel)}
                loadChannelList = {() => this.props.loadChannelList()}
                channelList = {this.props.channelList}
                user = {this.props.user} 
                setSelectedChannel = {(channel) => this.props.setSelectedChannel(channel)}
                removeLoadChannelList = {() => this.props.removeLoadChannelList()}          
            />
        </Menu>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    channelList: state.channel.channelList
});

export default connect(mapStateToProps,{
    logout: actionCreators.logout,
    handleAddChannel: actionCreators.handleAddChannel,
    loadChannelList: actionCreators.loadChannelList,
    setSelectedChannel: actionCreators.setSelectedChannel,
    removeLoadChannelList: actionCreators.removeLoadChannelList
})(SidePanel);
