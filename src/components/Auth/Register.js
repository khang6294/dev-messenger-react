import React from "react";
import {Grid,Form,Segment,Button,Header,Message} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Register extends React.Component {
    
    state = {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        loading: false
     };
    
    componentDidUpdate(prevProps,prevState){
        if(this.props.userRegister.user){
            if(prevProps.userRegister.user){
                if(this.props.userRegister.user.email !== prevProps.userRegister.user.email){
                    this.setState({
                        loading: false
                    })
                }
            } else {
                this.setState({
                    loading:false
                })
            }
        } else if(JSON.stringify(this.props.errors) !== JSON.stringify(prevProps.errors)){
            this.setState({
                loading:false
            })
        } else if(this.props.errors.length > 0 && JSON.stringify(this.props.errors) === JSON.stringify(prevProps.errors) && prevState.loading !== this.state.loading){
            this.setState({
                loading:false
            })
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            loading: true
        },() => console.log(this.state.loading))
        this.props.validateForm(this.state)
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
            <Header as="h2" icon color="orange" textAlign="center">
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
                    color="orange"
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
                Already a user? 
            </Message>
            </Grid.Column>
        </Grid>
        );
    }
}

export default Register;
