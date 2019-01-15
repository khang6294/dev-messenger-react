import React from "react";
import {Grid,Form,Segment,Button,Header,Message} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Login extends React.Component {
    state = {
        email: "",
        password: "",
        loading: false
    };

    componentDidUpdate(prevProps,prevState){
        if(this.props.user.user && this.props.user.user !== prevProps.user.user){
            this.props.history.push('/')
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

    displayErrors = errors =>
        errors.map((error, i) => <p key={i}>{error.message}</p>);

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
        return errors.some(error => error.message.toLowerCase().includes(inputName))
        ? "error"
        : "";
    };

    render() {
        const { email, password, loading } = this.state;
        const {errors} = this.props
        return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" icon color="violet" textAlign="center">
                Login
            </Header>
            <Form onSubmit={this.handleSubmit} size="large" loading={loading}>
                <Segment stacked>
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
            {errors.length > 0 && (
                <Message error>
                <h3>Error</h3>
                {this.displayErrors(errors)}
                </Message>
            )}
            <Message>
                Don't have an account? <Link to="/register">Register</Link>
            </Message>
            </Grid.Column>
        </Grid>
        );
    }
}

export default Login;
