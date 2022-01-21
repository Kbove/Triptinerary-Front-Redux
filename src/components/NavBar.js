import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import SignupModal from './modals/SignupModal'
import LoginModal from './modals/LoginModal'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import auth from "../components/utils/auth";
// New imports
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import API from "../components/utils/API"
import Button from "react-bootstrap/Button";

import "../components/modals/Modals.css";

function NavBar() {
    const [showModal, setShowModal] = useState(false)
    const [points, setPoints] = userState('')
    const loadPoints = async () => {
        try {
            const token = localStorage.getItem('id_token')
            const response = await API.getPoints(token)
            const points = response.data.points
            setPoints(points)
        } catch (err) {
            alert(err)
        }
    }
    useEffect(() => {
        loadPoints()
    }, [])

    const submitPoints = async (event) => {
        event.preventDefault()
        try {
            const token = localStorage.getItem('id_token')
            const myData = await API.getProfile(token)
            if (myData) {
                const _id = myData.data[0]._id
                const res = await API.addPoints(token, _id)
                if (res) {
                    alert('10 points added')
                }
            }
        } catch (err) {
            alert(err)
        }
    }

    return (
        <>
            <Container fluid>
                <Row className='backgroundColor'>
                    <Navbar.Toggle aria-controls='offcanvasNavbar' />
                    <Navbar.Offcanvas
                        className="navPopOut"
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="start"
                    >
                </Row>
            </Container>
        </>
    )
}
