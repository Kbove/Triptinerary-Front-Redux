import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'

import "bootstrap/dist/css/bootstrap.min.css";
import './Homepage.css'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import API from '../../utils/API'
import token from '../../utils/auth'
import { useHistory } from 'react-router-dom'
import createUtilityClassName from 'react-bootstrap/esm/createUtilityClasses';

function Homepage(props) {
    let history = useHistory()
    const [city, setCity] = useState('')
    const [itins, setItins] = useState([])

    const loadFeatured = async () => {
        try {
            const response = await API.getAllItineraries()
            setItins([...response.data])
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (itins.length === 0) {
            loadFeatured()
        }
    }, [itins])

    const handleInputChange = (event) => {
        setCity(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const cityQuery = {
            city: city.toString()
        }

        const res = await API.searchCity(token, cityQuery)
        props.setSearchInfo([res.data])
        history.push('/ItineraryCard')
    }

    const seeDetails = async (event) => {
        const id = event.target.getAttribute('dataKey')
        const itinerary = await API.itineraryById(id)
        props.setViewItin(itinerary.data)
        history.push('/ViewItinerary')
    }

    return (
        <>
        <div className='section1'>
            <h1>Explore and share travel itineraries</h1>
            <Form
            className='searchForm'
            onSubmit={() => API.searchCity(token, city)}
            >
                <Form.Control 
                type='search'
                placeholder='Search for a city...'
                value={city}
                name='city'
                onChange={handleInputChange}
                />
                <Button
                type='submit'
                onClick={handleFormSubmit}
                className='searchBtn'
                >
                    Search
                </Button>
            </Form>        
            </div>
            <div className='section3'>
                <h2>Featured Itineraries</h2>
            </div>
            <div className='featuredCards'>
                {itins.slice(0, 4).map((card) => (
                    <Card className='featuredCard'>
                        <Card.Body>
                            <Card.Title>{card.title}</Card.Title>
                            <Card.Img className='cardImg' src={card.image}/>
                            <Card.Text>{card.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer className='card-footer'>
                            <button className='btn' datakey={card._id} onClick={seeDetails}>See Details</button>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default Homepage;
 