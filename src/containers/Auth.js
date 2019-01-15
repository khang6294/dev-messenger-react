import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/index'
import Register from '../components/Auth/Register'
import Login from '../components/Auth/Login'
import {Route} from 'react-router-dom'

class AuthContainer extends Component{

    state = {
        errors:[]
    }

    componentDidUpdate(prevProps,prevState){
        if(JSON.stringify(this.props.error) !== JSON.stringify(prevProps.error)){
            let errors = []
            this.setState({
                errors: errors.concat(this.props.error)
            })
        }
        if (prevProps.location && this.props.location.pathname !== prevProps.location.pathname){
            this.setState({
                errors: []
            })
        }
        
    }

    

    isFormValid = (info,form) => {
        let errors = [];
        let error;
        if (this.isFormEmpty(info,form)) {
            error = { message: "Fill in all fields" };
            this.setState({
                errors: errors.concat(error) 
            });
        } else if(!this.isPasswordValid(info,form) ){
            error = { message: "Password is invalid" };
            this.setState({
                errors: errors.concat(error) 
            });
        } else {
            if(form === '/register'){
                const registerInfo = {
                    email: info.email,
                    password: info.password,
                    name: info.name
                }
                this.props.register(registerInfo)
            } else if (form === '/login') {
                const loginInfo = {
                    email: info.email,
                    password: info.password
                }
                this.props.login(loginInfo)
            }

        }
    };

    isFormEmpty = (info,form) => {
        if(form === '/register'){
            return (
                !info.name.length ||
                !info.email.length ||
                !info.password.length ||
                !info.passwordConfirmation.length
            );
        } else if(form === '/login'){
            return (
                !info.email.length ||
                !info.password.length
            );
        }
        
    };

    isPasswordValid = (info,form) => {
        if(form ==='/register'){
            if (info.password.length < 6 || info.passwordConfirmation.length < 6) {
                return false;
            } else if (info.password !== info.passwordConfirmation) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
        
    };

    render(){
        console.log(this.props.user)
        return(
            <>
            <Route 
                exact
                path = "/register" 
                render = {props => {
                    return (
                    <Register
                        {...props}
                        userRegister = {this.props.userRegister}
                        validateForm = {(info,form) => {
                            this.isFormValid(info,form)
                        }}
                        errors = {this.state.errors}
                    />
                    )
                }} 
            />

            <Route 
                exact
                path = "/login" 
                render = {props => {
                    return (
                    <Login
                        {...props}
                        validateForm = {(info,form) => {
                            this.isFormValid(info,form)
                        }}
                        errors = {this.state.errors}
                        user={this.props.user}
                    />
                    )
                }} 
            />
            </>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        userRegister: state.auth.userRegister,
        error: state.auth.error,
        user: state.auth.user
    }
}


export default connect(mapStateToProps,
    {
        register: actionCreators.register,
        login: actionCreators.login
    }
)(AuthContainer)