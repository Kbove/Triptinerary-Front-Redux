import React, { useState } from 'react'
import { Form, Button, Accordion } from  'react-bootstrap'
import API from '../../utils/API'
import auth from '../../utils/auth'

import { useHistory } from 'react-router-dom'

function CreateItinerary(props) {
    let history = useHistory()

    const [newItinerary, setNewItinerary] = useState({
        creator: 'Change this later',
        image: '',
        title: '',
        description: '',
        price: '',
        days: [],
    })

    const [newDay, setNewDay] = useState({
        city: '',
        activities: [],
        day_number: 1,
    })

    const [newActivities, setActivities] = useState({
        where: '',
        what: '',
        cost: ''
    })

    const handleInputChange = (event) => {
        if (
            event.target.name === "what" ||
            event.target.name === "where" ||
            event.target.name === 'cost'
        ) {
            setActivities({
                ...newActivities,
                [event.target.name]: event.target.value,
            })
            setNewDay({
                ...newDay,
                activities: [newActivities]
            })
            setNewItinerary({
                ...newItinerary,
                days: [newDay],
            })
        } else if (event.target.name === 'city') {
            setNewDay({
                ...newDay,
                [event.target.name]: event.target.value,
            })
            setNewItinerary({
                ...newItinerary,
                days: [newDay],
            })
        } else {
            setNewItinerary({
            ...newItinerary,
            [event.target.name]: event.target.value,
            })
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        props.setViewItin(newItinerary)

        const token = auth.getToken()
        const response = await API.createItinerary(token, newItinerary)

        window.search = response
        history.push('/ViewItinerary')
    }

    return (
        <div className='container'>
            <p className='form-header'>Create Your Triptinerary</p>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label id='image'>Image 📷</Form.Label>
                    <Form.Control
                    value={newItinerary.image}
                    name='image'
                    onChange={handleInputChange}
                    type='text'
                    placeholder='Add your image url here'
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label id='title'>Title</Form.Label>
                    <Form.Control
                    value={newItinerary.title}
                    name='title'
                    onChange={handleInputChange}
                    type='text'
                    placeholder='The Lone Star Experience'
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='summary'>Trip Description</Form.Label>
                    <Form.Control
                    value={newItinerary.description}
                    name='description'
                    onChange={handleInputChange}
                    type='text'
                    as='textarea'
                    placeholder='Going to an old fashion Texas rodeo'
                    rows={3}
                    />
                </Form.Group>
                <Form.Label id='price'>Itinerary Price</Form.Label>
                <Form.Group className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>Points</span>
                    </div>
                    <Form.Control
                    value={newItinerary.price}
                    name='price'
                    onChange={handleInputChange}
                    type='text'
                    placeholder='40'
                    rows={3}
                    />
                </Form.Group>
            </Form>
        </div>
    )
}

export default CreateItinerary;