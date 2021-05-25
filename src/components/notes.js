import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Container, Card, Button, CardDeck } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Modal from './modal';
export default function Notes(props) {
    let loc = useLocation()
    const username = loc.state.username
    const [count, setCount] = useState(0)
    const [listItems, setListItems] = useState(null) 
    const [showModal, setShowModal] = useState(false)
    
    


    useEffect(() => {
        if(listItems === null){
            const body ={
                "userId" : loc.state.userId
            }
            axios.post('https://d6l5hytbyg.execute-api.us-east-2.amazonaws.com/Dev/getnotes', body)
            .then(resp => {
                console.log(resp.data.message)
                setListItems(resp.data.data)
                console.log(listItems, showModal)
            })
        }
    })

    const handleDelete =(e) =>{
        let id = e.target.parentNode.getAttribute("note_id")
        let userId = loc.state.userId

        const body = {
            "noteId": id,
            "userId": userId
        }

        console.log(body)
        axios.post('https://d6l5hytbyg.execute-api.us-east-2.amazonaws.com/Dev/deletenode', body)
            .then(resp => {
                console.log(resp.data.message)
                window.location.reload(false)
            })
    }

    const renderCard =(card, index) => {
        return(
            <Card style={{ width: '18rem', flex: 1 }} key={index}>
                <Card.Body note_id={card.note_id}>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{card.date_created}</Card.Subtitle>
                    <Card.Text>{card.content}</Card.Text>
                    <Button variant="primary" onClick={handleDelete}>Delete</Button>
                </Card.Body>
            </Card>
        )
    }

    return (
        <Container>
            <h1 style={{color: "white"}}> Welcome {username}</h1>
            <CardDeck style={{display: 'flex', flexDirection: 'row'}}>{listItems !== null ? listItems.map(renderCard): null}</CardDeck>
            <Button onClick={() => setShowModal(!showModal)}>New Note</Button>
            <Modal onClose={() => setShowModal(false)} show={showModal}/>
        </Container>
    )

}