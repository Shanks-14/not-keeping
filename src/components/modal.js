import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import './Modal.css';

export default function Modal(props){
    const [title, setTitle] = useState(null)
    const [content, setcontent] = useState(null)
    let loc = useLocation()
    const handleSubmit = (e) => {
        
        e.preventDefault();
        const body = {
            "title": title,
            "content": content,
            "userId": loc.state.userId
        }
        axios.post('https://d6l5hytbyg.execute-api.us-east-2.amazonaws.com/Dev/addnote',
            body)
            .then(response => {
                console.log(response)
                window.location.reload(false)
            } 
        );

        
    }

    if(!props.show){
        return null
    }

    return(
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Create a new note</h4>
                </div>
                <div className="modal-body">
                    <Form>
                        <Form.Group controlId="SignUpName">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="Title" onChange={e => setTitle(e.target.value)} placeholder="Title" />   
                        </Form.Group>
                        <Form.Group controlId="SignUpEmail">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={3} type="test" name="Content" onChange={e => setcontent(e.target.value)} placeholder="Enter text" />
                        </Form.Group>
                        <Button disabled={!title || !content}variant="primary" type="submit" onClick={handleSubmit}>
                            Add Note
                        </Button>
                        <Button onClick={props.onClose}>
                            Close
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}