import React from "react";
import {Grid,Form,Segment,Button,Header,Message} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from '../Logo/Logo'

class Register extends React.Component {
    
    state = {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        loading: false
    };

    componentDidUpdate(prevProps,prevState){
        if(this.props.userRegister.user && prevProps.userRegister.user !== this.props.userRegister.user){
            this.props.history.push('/login')
        }
        if(this.props.errors[0]){
            if(prevProps.errors[0]){
                if(this.props.errors[0].message !== prevProps.errors[0].message){
                    this.setState({
                        loading: false
                    })
                } else if(this.props.errors[0].message === prevProps.errors[0].message && prevState.loading === true){

                    this.setState({
                        loading:false
                    })
                }
            } else {
                this.setState({
                    loading: false
                })
            }
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        this.props.validateForm(this.state,this.props.match.path)
    };

    handleInputError = (errors, inputName) => {
        if(errors){
            return errors.some(error => error.message.toLowerCase().includes(inputName))
            ? "error"
            : "";
        }
    };

    displayErrors = errors => {
        return errors.map((error, i) => <p key={i}>{error.message}</p>);
    }


    render() {
        const {name,email,password,passwordConfirmation,loading} = this.state;
        const {errors} = this.props
        return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" icon color="violet" textAlign="center">
                <Logo size="h1" floated="" inverted={false}/>

                Register
            </Header>
            <Form onSubmit={this.handleSubmit} size="large" loading={loading}>
                <Segment stacked>
                <Form.Input
                    fluid
                    name="name"
                    icon="user"
                    iconPosition="left"
                    placeholder="Full name"
                    onChange={this.handleChange}
                    value={name}
                    type="text"
                />

                <Form.Input
                    fluid
                    name="email"
                    icon="mail"
                    iconPosition="left"
                    placeholder="Email Address"
                    onChange={this.handleChange}
                    value={email}
                    className={this.handleInputError(errors, "email")}
                    type="email"
                />

                <Form.Input
                    fluid
                    name="password"
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    onChange={this.handleChange}
                    value={password}
                    className={this.handleInputError(errors, "password")}
                    type="password"
                />

                <Form.Input
                    fluid
                    name="passwordConfirmation"
                    icon="repeat"
                    iconPosition="left"
                    placeholder="Password Confirmation"
                    onChange={this.handleChange}
                    value={passwordConfirmation}
                    className={this.handleInputError(errors, "password")}
                    type="password"
                />
                <Button
                    disabled={loading}
                    color="violet"
                    fluid
                    size="large"
                >
                    Submit
                </Button>
                </Segment>
            </Form>
            {errors && errors.length > 0 && (
                <Message error>
                    <h3>Error</h3>
                    {this.displayErrors(errors)}
                </Message>
            )}
            <Message>
                Already a user? <Link to="/login">Login</Link>
            </Message>
            </Grid.Column>
        </Grid>
        );
    }
}

export default Register;
