import React, { useState } from 'react'
import Axios from 'axios'

import { Form, FormGroup, Input, FormFeedback } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

const SignUpForm = ({toggleModal}) => {
    const history = useHistory()

    // const [usernameInput, setUsernameInput] = useState("")
    // const [emailInput, setEmailInput] = useState("")
    // const [passwordInput, setPasswordInput] = useState("")
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [timer, setTimer] = useState(null)

    const [validUser, setValidUser] = useState(null)
    //null -- show no message
    //'invalid' -- show username is invalid
    //'valid' -- show username is valid

    const { username, email, password } = userInfo

    const displayHelperMessage = () => {
        if (validUser) {
            if (validUser === 'valid') {
                return <FormFeedback valid>Username is available!!</FormFeedback>
            } else {
                return<FormFeedback invalid>Username has been taken!</FormFeedback>
            }
        } else {
            return null
        }
    }
    
  
    // const handleUsername = e => {
    //     setUsernameInput(e.target.value)
    // }
    // const handleEmail = e2 => {
    //     setEmailInput(e2.target.value)
    // }
    // const handlePassword = e3 => {
    //     setPasswordInput(e3.target.value)
    // }

    const handleInput = e => {
        const { name, value } = e.target

        // if typing in 'username' field
        if (name === 'username') {
            setValidUser(null) // to clear info message
            clearTimeout(timer) // reset timer

            const newTimer = setTimeout(() => {
                // make api call to check if username is valid
                Axios.get(`https://insta.nextacademy.com/api/v1/users/check_name?username=${value}`)
                .then(result => {
                    // console.log(result)
                    setValidUser(result.data.valid ? 'valid' : 'invalid')
                })
            }, 500)
            setTimer(newTimer)
        }
        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }
    // console.log(validUser)

    // const handleSubmit = () => {
    //     console.log(`Username: ${usernameInput} , `, `Email: ${emailInput} , `, `Password: ${passwordInput} .`)
    
    /* we use e instead of () because this function gonna be used in <Form onSubmit>,*/
    /* onSubmit will always automatically reload the page once its pressed, thus preventDefault is used*/
    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        Axios.post('https://insta.nextacademy.com/api/v1/users/', {
            username,
            email,
            password
        })
        .then(result => {
            const {user, message} = result.data
            console.log(result)

            setLoading(false)
            toast(message) // show popup message
            toggleModal()  //close modal
            history.push(`/users/${user.id}`) // go to user profile page
        })
        .catch(err => {
            console.log(err.response)
            err.response.data.message.forEach(msg => toast(msg))
            setLoading(false)
        })

    }
    
    return (
        <Form onSubmit = {handleSubmit}>
            <FormGroup>
                <Input 
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleInput}
                    {...(validUser === "valid" 
                        ? {valid: true} 
                        : {invalid:true})}
                />
                {displayHelperMessage()}
            </FormGroup>
            <FormGroup>
                <Input name="email" type="email" placeholder="Email" onChange={handleInput} value={email} />
            </FormGroup>
            <FormGroup>
                <Input name="password" type="password" placeholder="Password" onChange={handleInput} value={password} />
            </FormGroup>
                <Input className="btn btn-info" type="submit" disabled={loading} value={loading ? 'Signing up' : 'Sign Up!'} />
        </Form>
    )
}

export default SignUpForm