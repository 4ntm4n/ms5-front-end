import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import styles from "../styles/ProfilePicForm.module.css"

function ProfilePicForm() {
    const imgInputRef = useRef(null)
    const [profilePayLoad, setProfilePayload] = useState({
        image: null,
    })

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

    const handleUpload = () => {
        console.log("form trying to server")
    }


  return (
    <div>
        <div onClick={triggerImgChoice} className={styles.UploadContainer}>{profilePayLoad.image && renderImagePreview()}</div>
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
    </div>
  )
}

export default ProfilePicForm