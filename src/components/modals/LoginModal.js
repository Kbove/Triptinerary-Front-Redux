import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'

import API from '../utils/API'
import Auth from '../utils/auth'

import './Modals.css'

const LoginModal = () => {
    const [userFormData, setUserFormData] = useState({ email: "", password: "" })
    const [showAlert, setShowAlert] = useState(false)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUserFormData({ ...userFormData, [name]: value})
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }

        try {
            const response = await API.login(userFormData)
            console.log(response)

            const token = await response.data.token
            console.log(token)
            Auth.login(token)
        } catch (err) {
            console.error(err)
            setShowAlert(true)
        }

        setUserFormData({
            email: "",
            password: ""
        })
    }

    return (
        <>
        <Form onSubmit={handleFormSubmit} className='LoginModal'>
            <Alert
            dismissable
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
            >Something went wrong with your login credentials
            </Alert>
            <Form.Group>
                <Form.Label className='mt-2'>Email</Form.Label>
                <Form.Control
                type="text"
                placeholder='Your email'
                name='email'
                onChange={handleInputChange}
                value={userFormData.email}
                required
                />
                <Form.Control.Feedback type='invalid'>
                    Email is required!
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
                <Form.Label className='mt-2'>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Your Password'
                name='password'
                onChange={handleInputChange}
                value={userFormData.password}
                required
                />
                <Form.Control.Feedback type='invalid'>
                    Password is required
                </Form.Control.Feedback>
            </Form.Group>
            <Button
            className='mt-3'
            disabled={!(userFormData.email && userFormData.password)}
            type='submit'
            variant='success'
            >
                Submit
            </Button>
        </Form>
        </>
    )
}

export default LoginModal;