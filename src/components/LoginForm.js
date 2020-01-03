import React, { useState } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation'
import Axios from 'axios';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';

const LoginForm = ({toggleModal, setLoggedIn}) => {
    const history = useHistory()

    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    // const [loading,setLoading] = useState(false)

    const handleUsername = e => {
        setUsernameInput(e.target.value)
    }
    const handlePassword = e2 => {
        setPasswordInput(e2.target.value)
    }

    // const handleSubmit = () => {
    //     console.log(`Username: ${usernameInput} , `, `Password: ${passwordInput} .`)
    // }
    const handleSubmit = e => {
        e.preventDefault()
        // console.log(`Username: ${usernameInput} , `, `Password: ${passwordInput} .`)
        Axios.post('https://insta.nextacademy.com/api/v1/login', {
            username: `${usernameInput}`,
            password: `${passwordInput}`
        })
        .then(result => {
            const {auth_token, message} = result.data
            // console.log(result)

            localStorage.setItem('jwt', auth_token)
            setLoggedIn(true)
            toast(message)
            toggleModal()
            history.push(`/users/${result.data.user.id}`)
        }).catch(err => {
            console.log(err.response)
            toast(err.response.data.message)
        })
    }

    return (
        <AvForm onSubmit={handleSubmit}>
            <AvField name="username" type="text" placeholder="Username" onChange={handleUsername} value={usernameInput} validate={{
                required: {value: true, errorMessage: 'Please enter username'}
            }} />
            <AvField name="pass" type="password" placeholder="Password" onChange={handlePassword} value={passwordInput} validate={{
                required: {value: true, errorMessage: 'Please enter password'}
            }} />
            <Input className="btn btn-info" type="submit" disabled={!usernameInput || !passwordInput} value="Sign in"/>
        </AvForm>
    )
}

// disabled={loading} value={loading ? 'Signing in' : 'Sign in'}

export default LoginForm