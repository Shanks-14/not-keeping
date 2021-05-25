import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';


export default function Login(props){
    let history = useHistory()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmit = (e) => {
        
        e.preventDefault();
        const body = {
            "email": email,
            "password": password
        }
        axios.post('https://d6l5hytbyg.execute-api.us-east-2.amazonaws.com/Dev/login',
            body)
            .then(response => {
                if(response.data.message !== 'Failure'){                    
                    history.push('/notes',{
                            userId : response.data.userId,
                            username: response.data.full_name
                        }
                    ) 
                }
            });
        
    }
        return(
            <Container className="p-3">
                <Jumbotron>
                    <h3 className="header">Login</h3>
                    <Form>
                        <Form.Group controlId="LoginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="LoginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
                        </Form.Group>
                        <Button disabled={!email || !password} variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Jumbotron>
                                
            </Container>
        )
}