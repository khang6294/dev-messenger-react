import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/index'
import Register from '../components/Auth/Register'

class AuthContainer extends Component{

    state = {
        errors:[]
    }

    componentDidUpdate(prevProps){
        if(JSON.stringify(this.props.error) !== JSON.stringify(prevProps.error)){
            let errors = []
            this.setState({
                errors: errors.concat(this.props.error)
            })
        }
        
    }

    isFormValid = (info) => {
        let errors = [];
        let error;
        if (this.isFormEmpty(info)) {
            error = { message: "Fill in all fields" };
            this.setState({
                errors: errors.concat(error) 
            });
        } else if (!this.isPasswordValid(info)) {
            error = { message: "Password is invalid" };
            this.setState({
                errors: errors.concat(error) 
            });
        } else {
            const registerInfo = {
                email: info.email,
                password: info.password,
                name: info.name
            }
            this.props.register(registerInfo)
        }
    };

    isFormEmpty = (info) => {
        return (
            !info.name.length ||
            !info.email.length ||
            !info.password.length ||
            !info.passwordConfirmation.length
        );
    };

    isPasswordValid = (info) => {
        if (info.password.length < 6 || info.passwordConfirmation.length < 6) {
            return false;
        } else if (info.password !== info.passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    };

    render(){
        return(
            <Register
                userRegister = {this.props.userRegister}
                validateForm = {(info) => {
                    this.isFormValid(info)
                }}
                errors = {this.state.errors}
                resetError = {() => this.setState({errors:[]})}
            />
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        userRegister: state.auth.userRegister,
        error: state.auth.error
    }
}


export default connect(mapStateToProps,
    {
        register: actionCreators.register
    }
)(AuthContainer)