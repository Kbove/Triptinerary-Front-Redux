import React, { useState, useEffect } from 'react'
import { Rating } from 'react-simple-star-rating'

import 'bootstrap/dist/css/bootstrap.min.css'
import "./Explore.css"
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import API from '../../utils/API'
import token from '../../utils/auth'
import { useHistory } from 'react-router-dom'

function Explore(props) {
    let history = useHistory

    const [city, setCity] = useState('')
    const [itins, setItins] = useState([])

    const leadFeatured = async () => {
        try {
            const response = await API.getAllItineraries()
            setItins([...response.data])
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (itins.length === 0) {
            leadFeatured()
        }
        console.log(itins)
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

    const displayRating = (ratings) => {
        if (!ratings) {
            return
        }
  
    let sum = 0;

    if (ratings.length > 0) {
        ratings.map(rating => sum+=rating)
        return `${Math.floor(sum/ratings.length)} out of 100`
    }
    return "Not yet rated"
  }

  const submitPurchased = async (event) => {
      event.preventDefault()
      try {
          const token = localStorage.getItem('id_token')
          const _id = {_id: event.target.getAttribute("dataKey")}
          const res = await API.purchaseItinerary(token, _id)
          if (res) {
              alert('Itinerary purchase')
          }
      } catch (err) {
          console.log(err)
      }
  }

  return (
      <>
      <div className='titleformarea'>
          <h2>All Itineraries</h2>
          <div>
              <Form 
              className='searchForm'
              onSubmit={() => API.searchCity(token, city)}
              >
              <FormControl
              type='search'
              placeholder="Search for city"
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
      </div>
      
      <div className=''>
      </div>

      <div className="featuredCards">
        {itins.map((card) => (
          <Card className="featuredCard">
            <Card.Img className="cardImg" src={card.image} />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.description}</Card.Text>
              <Card.Text>{card.price}</Card.Text>
              <button datakey={card._id} onClick={submitPurchase}>Purchase</button>
            </Card.Body>
            <Card.Footer>
              <small>Rating: {displayRating(card.ratings)}</small>
            </Card.Footer>
          </Card>
        ))}
      </div>

      </>
  )
}