import React, { useEffect, useState } from 'react'
import Axios from 'axios'

const MyProfilePage = () => {

    const jwt = localStorage.getItem("jwt")
    const [profileImages, setProfileImages] = useState([])
 
    useEffect(() => {
        // Axios({
        //     method:"GET",
        //     url:"https://insta.nextacademy.com/api/v1/images/me",
        //     headers:{
        //         Authorization: `Bearer ${jwt}`
        //     }
        // })
        Axios.get('https://insta.nextacademy.com/api/v1/images/me', {headers:{
            Authorization: `Bearer ${jwt}`
        }})
        .then(result => {
            console.log(result)
            setProfileImages(result.data)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [])
    
        return (
            <>
            {jwt ? 
            <>
                <h1>This is my profile page</h1>
                {profileImages.map(image => (
                    <img src={image} width="300"></img>
                ))}
            </>
            :
            null
            }
            </>
        )
    
}

export default MyProfilePage