import React from 'react'

function ProfilePic({member, size}) {
    const { image } = member
    const picStyle = {
        width: `${size}px`,
        height:`${size}px`,
        borderRadius: '50%',
        objectFit: 'cover',
        objectPosition: 'center'
    }
  return (
    <img src={image} alt="profile-pic" style={picStyle} /> 
  )
}

export default ProfilePic