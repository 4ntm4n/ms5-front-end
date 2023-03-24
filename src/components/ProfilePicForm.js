import React, { useRef, useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { axiosReq, axiosRes } from '../api/AxiosDefaults'
import { useCurrentUser } from '../contexts/currentUserContext'
import styles from "../styles/ProfilePicForm.module.css"

function ProfilePicForm() {
    const currentUser = useCurrentUser();
    const [userId, setUserId] = useState(null) 
    const imgInputRef = useRef(null)
    const [profilePayLoad, setProfilePayload] = useState({
        image: null,
    })

    useEffect(() => {
        console.log(currentUser)
        currentUser && setUserId(currentUser.pk)
    }, [currentUser]);


    const triggerImgChoice = () => {
        if(imgInputRef.current)
        imgInputRef.current.click();
    }
    
    const handleImagePick = (event) => {
        setProfilePayload(prevState =>({
            ...prevState,
            image: event.target.files[0],
        }));
    }

    const renderImagePreview = () => {
        if (!profilePayLoad.image) return null;

        const imageUrl = URL.createObjectURL(profilePayLoad.image)
        return <img src={imageUrl} alt="profile image preview" style={{width: '120px', height: '120px'}} />
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        if (!profilePayLoad.image){
            console.log("no image selected")
            return;
        }

        const formData = new FormData();
        formData.append('image', profilePayLoad.image);

        try {
            const { data } = await axiosRes.patch(`/profiles/${userId}`, formData)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div>
        <div onClick={triggerImgChoice} className={styles.UploadContainer}>{profilePayLoad.image && renderImagePreview()}</div>
        <Form onSubmit={handleUpload}>
        <Form.Group className="mb-3" controlId="image-upload">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
                type="file"
                size="sm"
                accept="image/*"
                onChange={handleImagePick}
                ref={imgInputRef}
              />
        </Form.Group>
        <Button type="submit">set image</Button>
        </Form>
    </div>
  )
}

export default ProfilePicForm