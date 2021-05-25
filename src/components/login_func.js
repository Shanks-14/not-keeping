import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';

export default class Login extends Component{
    constructor() {
        super();
        this.state = {
        email: null,
        password: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }
    
    handleSubmit(e) {
        let history = useHistory()
        e.preventDefault();
        const body = {
            "email": this.state.email,
            "password": this.state.password
        }
        axios.post('https://d6l5hytbyg.execute-api.us-east-2.amazonaws.com/Dev/login',
            body)
            .then(response => {
                console.log(this.state)
                if(response.data.message !== 'Failure'){
                    history.push('/notes');
                }
            });
        
    }
    render() {
        if (this.state.redirect) {
            console.log(this.state)
            
        }

        return(
            <Container className="p-3">
                <Jumbotron>
                    <h3 className="header">Login</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="LoginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={this.state.name} name="email" onChange={(event) =>this.handleUserInput(event)} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="LoginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={this.state.name} name="password" onChange={(event) =>this.handleUserInput(event)} placeholder="Password" />
                        </Form.Group>
                        <Button disabled={!this.state.email || !this.state.password} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Jumbotron>
                                
            </Container>
        )
    }
}