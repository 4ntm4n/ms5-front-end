import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

function ProfilePic({member, size}) {
    const { image, owner} = member
    const picStyle = {
        width: `${size}px`,
        height:`${size}px`,
        borderRadius: '50%',
        objectFit: 'cover',
        objectPosition: 'center',
    }

    //set tooltip id to the same as user's profile id
    //to make sure it is unique.
    const showUsername = (
        <Tooltip id={`tooltip-${owner.id}`}>
            {owner}
        </Tooltip>
    )

  return (
    <OverlayTrigger placement="bottom" overlay={showUsername}>
      <img src={image} alt="profile-pic" style={picStyle} /> 
    </OverlayTrigger>
  )
}

export default ProfilePic