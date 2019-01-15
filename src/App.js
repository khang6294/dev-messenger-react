import React, { Component } from 'react';
import './App.css';
import AuthContainer from './containers/Auth'
import {Switch,Route,withRouter} from 'react-router-dom'
import ChatAppContainer from '../src/containers/ChatApp'
import {connect} from 'react-redux';
import * as actionCreators from '../src/store/actions/index'
import Loading from '../src/components/Loading/Loading'
class App extends Component {
  
  componentDidUpdate(prevProps){
      if(this.props.user && this.props.user.email !== prevProps.user.email){
        this.props.history.push('/')
      }
      console.log(this.props)
  }

  componentDidMount() {
    this.props.setUser()
  }
  render() {
    return this.props.isLoading ? (
      <Loading />
    ) : (
      <div>       
          <Switch>
            <Route path="/" exact component={ChatAppContainer}/>
            <AuthContainer/>
          </Switch>          
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      user: state.auth.user,
      isLoading: state.auth.isLoading
  }
}

export default withRouter(connect(mapStateToProps,
  {
      setUser: actionCreators.setUser
  }
)(App))

