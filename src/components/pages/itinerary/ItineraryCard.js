import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './ItineraryCard.css'
import Card from 'react-bootstrap/Card'
import CreateItinerary from './CreateItinerary'
import API from '../../utils/API'

function ItineraryCard(props) {
    const handleRating = (rating) => {
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
        return
    }

    const submitPurchase = async (event) => {
        event.preventDefault()
        try {
            const token = localStorage.getItem('id_token')
            const _id = { _id: event.target.getAttribute('dataKey') }
            const res = await API.purchaseItinerary(token, _id)
            if (res) {
                alert('Itinerary purchased!')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <h2 className="searchresultstitle">Search Results</h2>
            <div className='searchCards'>

                {props.searchInfo[0].map((itin) => (
                    <Card className='featuredCard' key={itin._id}>
                        <Card.Img className='cardImg' src={itin.image}/>
                        <Card.Body>
                            <Card.Title>{itin.title}</Card.Title>
                            <Card.Text>{itin.description}</Card.Text>
                            <Card.Text>{itin.price}</Card.Text>
                            <button datakey={itin._id} onClick={submitPurchase}>Purchase</button>

                            {itin.days.map((day) => {
                                <ul className='list-group'>
                                    <li className='list-group-item'>{day.day_number}</li>
                                    <li className='list-group-item'>{day.city}</li>
                                    {day.activities.map((activity) => {
                                        <li className='list-group-item'>
                                        {(activity.where, activity.what, activity.cost)}
                                        </li>
                                    })}
                                </ul>
                            })}
                        </Card.Body>
                        <Card.Footer>
                            <small>Rating: {handleRating(itin.ratings)}</small>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default ItineraryCard;