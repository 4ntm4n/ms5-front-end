import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';


function ProfilePic({ member, size }) {
    const picId = uuidv4();
    const { image, owner } = member
    const picStyle = {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        objectFit: 'cover',
        objectPosition: 'center',
    }

    //set tooltip id to the same as user's profile id
    //to make sure it is unique.
    return (
        <OverlayTrigger
            placement="top"
            delay={{ show: 100, hide: 0 }}
            overlay={<Tooltip id={`tooltip-${picId}`}>{owner}</Tooltip>}
        >
            <img src={image} alt="profile-pic" style={picStyle} />
        </OverlayTrigger>
    )
}

export default ProfilePic