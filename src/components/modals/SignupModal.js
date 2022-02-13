import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'

import API from '../utils/API'
import Auth from '../utils/auth'

import './Modals.css'

const SignupModal = () => {
    const [userFormData, setUserFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [showAlert, setShowAlert] = useState(false)
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUserFormData({ ...userFormData, [name]: value })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }

        try {
            const response = await API.signup(userFormData)
            const { token } = response.data
            Auth.login(token)
        } catch (err) {
            console.error(err)
            setShowAlert(true)
        }

        setUserFormData({
            username: '',
            email: '',
            password: ''
        })
    }

    return (
        <Form onSubmit={handleFormSubmit} className='SignupModal'>
            <Alert
                dismissible
                onClose={() => setShowAlert(false)}
                show={showAlert}
                variant='danger'
            >
                Something went wrong with your signup
            </Alert>
            <Form.Group>
                <Form.Label className='mt-2'>Username</Form.Label>
                <Form.Control
                type='text'
                placeholder='Your username'
                name='username'
                onChange={handleInputChange}
                value={userFormData.username}
                required
                />
                <Form.Control.Feedback type='invalid'>
                    Please enter a valid username
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label className='mt-2'>email</Form.Label>
                <Form.Control
                type='email'
                placeholder='Your email address'
                name='email'
                onChange={handleInputChange}
                value={userFormData.email}
                required
                />
                <Form.Control.Feedback type='invalid'>
                    Please enter a valid email address
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label className='mt-2'>password</Form.Label>
                <Form.Control
                type='password'
                placeholder='password'
                name='password'
                onChange={handleInputChange}
                value={userFormData.password}
                required
                />
                <Form.Control.Feedback type='invalid'>
                    Please enter a valid password
                </Form.Control.Feedback>
            </Form.Group>
            <Button
            className='mt-3'
            disabled={
                !(
                    userFormData.username &&
                    userFormData.email &&
                    userFormData.password
                )
            }
            type='submit'
            variant='success'
            >
                Signup
            </Button>
        </Form>
    )
}

export default SignupModal;
