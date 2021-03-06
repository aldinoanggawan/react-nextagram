import React, { useState } from 'react'
import styled from 'styled-components'


import { Form, FormGroup, Input, FormText, Button, } from 'reactstrap'
import Axios from 'axios'

const Contain = styled.div`
position: absolute;
`

const UploadPage = () => {

    const [imageFile, setImageFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [message, setMessage] = useState('')

    const handleFile = e => {
        console.log(e.target.files[0])
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
        setImageFile(e.target.files[0])    
    }

    const handleSubmitFile = e => {
        e.preventDefault()

        let jwt = localStorage.getItem('jwt')
        let formData = new FormData()
        formData.append("image", imageFile)

        Axios.post('https://insta.nextacademy.com/api/v1/images/',
            formData, {
            headers: {Authorization: `Bearer ${jwt}`}
        })
        .then(result => {
            console.log(result)
            if (result.data.success) {
                setMessage('Image Uploaded Successfully!')
                setPreviewImage(null)
                setImageFile(null)
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    return(
        <Contain>
        
        <div className="card">
            {previewImage ? 
                (
                <img
                    src={previewImage}
                    width="50%"
                    height="50%"
                />
                ) :
                (
                    <h3 className="text-center">
                        {message ? message : "Live Preview"}
                    </h3>
                )
            }
        </div>

        <Form >
            <FormGroup>
                <Input
                    type="file"
                    name="image-file"
                    onChange={handleFile}
                />
                <FormText color="muted">
                    Make sure the image is a supported format
                </FormText>
            </FormGroup>
            <Button onClick={handleSubmitFile} type="submit" color="primary">Upload</Button>
        </Form>
        </Contain>
    )
}

export default UploadPage