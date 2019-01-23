import React from "react";
import UserPanel from "./UserPanel";
import { Menu } from "semantic-ui-react";
import {connect} from 'react-redux'
import ChannelList from './ChannelList'
import * as actionCreators from '../../../store/actions/index'
import DirectMessages from './DirectMessages'

class SidePanel extends React.Component {
    
    render() {
        return (
        <Menu
            size="massive"
            inverted
            fixed="left"
            vertical
            style={{ background: this.props.primaryColor, fontSize: "1.2rem" }}
        >
            <UserPanel
                logout = {() => this.props.logout()}
                user = {this.props.user}
                primaryColor={this.props.primaryColor}
            />
            <ChannelList
                handleAddChannel = {(newChannel) => this.props.handleAddChannel(newChannel)}
                loadChannelList = {() => this.props.loadChannelList()}
                channelList = {this.props.channelList}
                user = {this.props.user} 
                selectedChannel = {this.props.selectedChannel}
                setSelectedChannel = {(channel) => this.props.setSelectedChannel(channel)}
                removeLoadChannelList = {() => this.props.removeLoadChannelList()}
                setPrivateChannel ={() => this.props.setPrivateChannel(false)}
          
            />

            <DirectMessages 
                user={this.props.user} 
                setSelectedChannel = {(channel) => this.props.setSelectedChannel(channel)}
                setPrivateChannel ={() => this.props.setPrivateChannel(true)}
            />
        </Menu>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    selectedChannel: state.channel.selectedChannel,
    channelList: state.channel.channelList,
    primaryColor: state.color.primaryColor,
});

export default connect(mapStateToProps,{
    logout: actionCreators.logout,
    handleAddChannel: actionCreators.handleAddChannel,
    loadChannelList: actionCreators.loadChannelList,
    setSelectedChannel: actionCreators.setSelectedChannel,
    setPrivateChannel: actionCreators.setPrivateChannel,
    removeLoadChannelList: actionCreators.removeLoadChannelList,
})(SidePanel);
