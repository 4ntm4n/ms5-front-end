import React, { useRef } from 'react'
import { Form } from 'react-bootstrap'
import styles from "../styles/ProfilePicForm.module.css"

function ProfilePicForm() {
    const imgInputRef = useRef(null)

    const triggerImgChoice = () => {
        if(imgInputRef.current)
        imgInputRef.current.click();
    }
    
    const handleUpload = () => {
        console.log("form trying to upload")
    }


  return (
    <div>
        <div onClick={triggerImgChoice} className={styles.UploadContainer}>red square</div>
        <Form.Group className="mb-3" controlId="image-upload">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
                
                id="image-upload"
                type="file"
                size="sm"
                accept="image/*"
                ref={imgInputRef}
              />
        </Form.Group>
    </div>
  )
}

export default ProfilePicForm