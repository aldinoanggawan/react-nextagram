import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Container, Row, Col } from 'reactstrap'
import UserImages from '../containers/UserImages'

const Page = styled.div`
    text-align : center;

    .profile-img {
        display: block;
        height: 150px;
        border-radius: 50%;
        margin: auto;
    }
`

const UserProfilePage = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        Axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
        .then(result => {
            setUser(result.data)
        })
    }, [id])
    return (
        <>
        {
            user ?
            <>
                <Page>
                    <h2>{user.username}</h2>
                    <img className="profile-img" src={user.profileImage} />
                </Page>
                <Container className="themed-container">
                    <Row>
                        <UserImages profileId={user.id}/>
                    </Row>
                </Container>
            </>
            :null
        }
        </>
    )
}

export default UserProfilePage