import React, { useState } from 'react'
import {
    NavItem,
    NavLink,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Button
} from 'reactstrap'

import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const AuthModal = ({loggedIn, setLoggedIn}) => {
    const [showModal, setShowModal] = useState(false)
    const [showLogin, setShowLogin] = useState(true)

    const toggleModal = () => setShowModal(!showModal)
    const toggleForm = () => setShowLogin(!showLogin)


    return (
        <>
            <NavItem>
                <NavLink onClick={toggleModal}>
                    Login
                </NavLink>
            </NavItem>
            <Modal isOpen={showModal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>{showLogin ? 'Login Form' : 'Sign Up Form'}</ModalHeader>
                <ModalBody>
                    {showLogin ? <LoginForm toggleModal={toggleModal} setLoggedIn={setLoggedIn}/> : <SignUpForm toggleModal={toggleModal}/>}

                    <a onClick={toggleForm} className="d-block" href="#">
                        {showLogin 
                        ? 'Not a member ? Click here to sign up!'
                        : 'Click here to log in'}
                    </a>

                </ModalBody>
            </Modal>
        </>
    )
}

export default AuthModal