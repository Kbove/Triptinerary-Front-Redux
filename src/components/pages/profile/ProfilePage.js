import { Rating } from 'react-simple-star-rating'
import React, { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './ProfilePage.css'
import Card from 'react-bootstrap/Card'
import API from '../../utils/API'
import auth from '../../utils/auth'
import { NotBeforeError } from 'jsonwebtoken'
import e from 'cors'

function ProfilePage() {
    const [rating, setRating] = useState(0)



    const handleRating = (rating, _id) => {
            const user_id = auth.getProfile().data._id
            console.log('itin id', _id, 'user id', user_id, 'rating', rating)
            API.rateItinerary(localStorage.getItem('id_token'), { rating, _id, user_id }).then((response) => {
                console.log(response)
            }).catch((err) => {
                alert('You have already rated this')
                console.log(err)
            })
    }

    const displayRating = (rating) => {
        if (!rating) {
            return
        }
        let sum = 0
        if (rating.length > 0) {
            for (let note of rating) {
                sum += note
            }
            return `${sum / rating.length} out of 100`
        }
        return 'Not yet rated'
    }

    const [purchased, setPurchased] = useState([])
    const [saved, setSaved] = useState([])
    const loadPurchased = async () => {
        try {
            const token = localStorage.getItem('id_token')
            const response = await API.getPurchasedItineraries(token)
            const purchased = response.data.purchased_itinerary.slice(1)
            const saved = response.data.saved_itinerary
            setPurchased(purchased)
            setSaved(saved)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => [
        loadPurchased()
    ], [])

    return (
        <>
            <div className='section3'>
                <h2>Purchased Itineraries</h2>
            </div>
            <div className='profileCards'>
                {purchased.map((card) => (
                    <Card className='profileCard' id={card._id}>
                        <Card.Img className='cardImg' src={card.image} />
                        <Card.Body>
                            <Card.Title>{card.title}</Card.Title>
                            <Card.Text>{card.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Rating onClick={(rating) => handleRating(rating, card._id)} ratingValue={rating} />
                        </Card.Footer>
                    </Card>
                ))}
            </div>
            <div className='section3'>
                <h2>Your Itineraries</h2>
            </div>
            <div className='profileCards'>
                {saved.length > 1 ? (saved.map((card) => (
                    <Card className='profileCard'>
                        <Card.Img className='cardImg' src={card.image} />
                        <Card.Body>
                            <Card.Title>{card.title}</Card.Title>
                            <Card.Text>{card.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small>Rating: {displayRating(card.ratings)}</small>
                        </Card.Footer>
                    </Card>
                ))) : (
                    <div>
                        <h3>You have not created any itineraries</h3>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProfilePage;