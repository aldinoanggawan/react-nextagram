import React, { useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'

import NavLogo from '../nav-logo.svg'
import AuthModal from './AuthModal'
import { toast } from 'react-toastify'
import Axios from 'axios'

const MyNav = ({loggedIn, setLoggedIn}) => {
    const history = useHistory()

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    const logout = () => {
        toast('You have successfully logged out !')
        localStorage.removeItem('jwt')
        setLoggedIn(false)
        history.push("/")
    }

    return (
        <div>
            <Navbar color="faded" light>
                <NavbarBrand tag={Link} to="/" href="/" className="mr-auto">
                    <img height="35" width="47" src={NavLogo} alt=""/>
                    Nextagram
                    </NavbarBrand>
                <NavbarToggler onClick={toggle} className="mr-2" />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/">Home</NavLink>
                        </NavItem>
                        {
                            loggedIn ?
                            <NavItem>
                                <NavLink tag={Link} to="/profile">My Profile</NavLink>
                            </NavItem>
                            :
                            null
                        }
                        { loggedIn ?
                            <NavItem>
                                <NavLink onClick={logout}>Logout</NavLink>
                            </NavItem>
                            :
                            <AuthModal loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
                        }
                        {
                            loggedIn ?
                            <NavItem>
                                <NavLink tag={Link} to="/upload">Upload</NavLink>
                            </NavItem>
                            :
                            null
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default MyNav