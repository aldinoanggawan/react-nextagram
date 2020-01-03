import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col } from 'reactstrap'
import LoadingIndicator from '../components/LoadingIndicator'

const UserImages = ({ profileId }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [images, setImages] = useState([])

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${profileId}`)
        .then(result => {
            setImages(result.data)
            setIsLoading(false)
        })
        .catch(error => {
            console.log('ERROR: ', error)
        })
    }, [])

    if (isLoading) {
        return <LoadingIndicator/>
    }

    return (

        images.map(image => (
            <Col sm="4">
            <img src={image} width="250"></img>
            </Col>
            
        ))
        
    )
    
}
export default UserImages