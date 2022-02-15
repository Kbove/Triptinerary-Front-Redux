import React, { useState } from 'react'
import 'bootstrap/dist/css/boostrap.min.css'
import './ViewItinerary.css'
import Card from 'react-bootstrap/Card'

function ViewItinerary(props) {
    <div className='youritinerarycard'>
        <Card className='featuredCard' key={props.viewItin._id}>
            <Card.Img className='cardImg' src={props.viewItin.image}/>
            <Card.Body>
                <Card.Title>{props.viewItin.title}</Card.Title>
                <Card.Text>{props.viewItin.description}</Card.Text>
                <Card.Text>Activites:</Card.Text>

                {props.viewItin.days.map((day) => (
                    <ul className='list-group'>
                        <li className='list-group-item'>Day: {day.day_number}</li>
                        <li className='list-group-item'>Location: {day.city}</li>
                        {day.activities.map((activity) => (
                            <ul>
                                <li>{activity.where}</li>
                                <li>{activity.what}</li>
                                <li>{activity.cost}</li>
                            </ul>
                        ))}
                    </ul>
                ))}
                <Card.Text>{props.viewItin.price} points to purchase</Card.Text>
            </Card.Body>
            <Card.Footer>
                <small> Rating: Not yet rated </small>
            </Card.Footer>
        </Card>
    </div>
}

export default ViewItinerary;