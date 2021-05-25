import React, { useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';


export default function SignUp (){
    let history = useHistory()
    const [full_name, setFullName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    
    const handleSubmit =(e) => {
        e.preventDefault();
        const body = {
            "full_name" : full_name,
            "email" : email,
            "password" : password
        }
        axios.post('https://d6l5hytbyg.execute-api.us-east-2.amazonaws.com/Dev/signup',
            body)
            .then(response => {
                if(response.data.message === "Success"){
                    history.push("/notes", {
                        userId : response.data.userId,
                        username: response.data.full_name
                    })
                }
            });
    }
    
    return(
        <Container className="p-3">
            <Jumbotron>
                <h3 className="header">Sign-Up</h3>
                <Form>
                    <Form.Group controlId="SignUpName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="full_name" onChange={e => setFullName(e.target.value)} placeholder="Enter email" />   
                    </Form.Group>
                    <Form.Group controlId="SignUpEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="SignUpPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    </Form.Group>
                    <Button disabled={!full_name || !email || !password}variant="primary" type="submit"onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>

            </Jumbotron>
        </Container>
    )
}