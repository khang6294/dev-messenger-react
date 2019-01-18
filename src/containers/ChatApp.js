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
            />
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    selectedChannel: state.channel.selectedChannel
});


export default connect(mapStateToProps)(ChatApp);