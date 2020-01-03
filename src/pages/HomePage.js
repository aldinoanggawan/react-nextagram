import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios'
import LoadingIndicator from '../components/LoadingIndicator'
import UserImages from '../containers/UserImages'

import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [users, setUsers] = useState([])

    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    // const [users, setUsers] = useState([
    //   {
    //     id: 1,
    //     username: "blake",
    //     profileImage:
    //       "http://next-curriculum-instagram.s3.amazonaws.com/idol2-blake.jpg"
    //   },
    //   {
    //     id: 2,
    //     username: "ryanG",
    //     profileImage:
    //       "http://next-curriculum-instagram.s3.amazonaws.com/idol1-ryan.jpg"
    //   },
    //   {
    //     id: 3,
    //     username: "bigfan",
    //     profileImage:
    //       "http://next-curriculum-instagram.s3.amazonaws.com/bigfan-9AE7468E-4C35-41D1-AA68-31939891B5E1.png"
    //   }
    // ]);

    useEffect(() => {
        axios.get('https://insta.nextacademy.com/api/v1/users')
            .then(result => {
                // console.log(result)
                setUsers(result.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log('ERROR: ', error)
            })
    }, [])

    // if (isLoading) {
    //     return <LoadingIndicator />
    // }

    return (

        <div>
            <h4>Home</h4>
            {
                isLoading ? <LoadingIndicator/>
                :
                users.map(({username, profileImage, id}) => (
                    <Container key={id} className="themed-container">
                        <Row>
                            <Col sm="3">
                                <div><Link to={`/users/${id}`}><b>{username}</b></Link></div>
                                <div><img className="avatar" src={profileImage} width="150" /></div>
                            </Col>
                            <Col sm="9">
                                <Row>
                                <UserImages profileId={id}/>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                ))
            }

        </div>
    );
}

export default HomePage
