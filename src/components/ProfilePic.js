import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';


function ProfilePic({ member, size=50 }) {
    const picId = uuidv4();
    
    const picStyle = {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        objectFit: 'cover',
        objectPosition: 'center',
    }


    //set tooltip id to the same as user's profile id
    //to make sure it is unique.

    {/* <OverlayTrigger
            placement="top"
            delay={{ show: 100, hide: 0 }}
            overlay={<Tooltip id={`tooltip-${picId}`}>{owner}</Tooltip>}
        >
            
        </OverlayTrigger> */}
    return (
        <img src={member.image} alt="profile-pic" style={picStyle} />
    )
}

export default ProfilePic