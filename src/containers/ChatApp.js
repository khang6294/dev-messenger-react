import React,{Component} from 'react';
import Layout from '../components/Layout/Layout'
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/index'
class ChatApp extends Component {
    render(){
        return (
            <>
            <Layout 
                user = {this.props.user}
                selectedChannel = {this.props.selectedChannel}
                secondaryColor= {this.props.secondaryColor}
                isPrivateChannel = {this.props.isPrivateChannel}
            />
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    selectedChannel: state.channel.selectedChannel,
    isPrivateChannel: state.channel.isPrivateChannel,
    secondaryColor: state.color.secondaryColor
});


export default connect(mapStateToProps)(ChatApp);