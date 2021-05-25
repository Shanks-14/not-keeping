import React from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';


export default function Dashboard(props){
    let history = useHistory()
    return(
        <Container className="p-3">
            <Jumbotron>
                <Button onClick={history.push('/signup')}>
                    Sign Up
                </Button>    
                <Button onClick={history.push('/login')}>
                    Login
                </Button>
            </Jumbotron>
                            
        </Container>
    )
}