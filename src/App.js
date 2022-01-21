import { React, useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Homepage from './components/pages/homepage/Homepage'
import Footer from './components/Footer'
import CreateItinerary from './components/pages/itinerary/CreateItinerary'
import ProfilePage from './components/pages/profile/ProfilePage'
import SignupModal from './components/modals/SignupModal'
import NavBar from './components/NavBar'
import ItineraryCard from './components/pages/itinerary/ItineraryCard'
import ViewItinerary from './components/pages/itinerary/ViewItinerary'
import Explore from './components/pages/explore/Explore'

function App() {
    const [searchInfo, serSearchInfo] = useState([])
    const [viewItin, setViewItin] = useState([[]])

    return (
        <Router>
            <NavBar/>
            <Switch>
            </Switch>
        </Router>
    )
}