import React, { useState, useEffect } from 'react'
import ProfilePic from './ProfilePic'

function ProfileSearch() {
const [profiles, setProfiles] = useState([])
const [searchField, setSearchField] = useState("")

const handleSearch = (e) => {
    setSearchField(e.current.value)
}

useEffect(() => {
    
}, [searchField]);
return (
    <div>
        <input onChange={(e) => handleSearch} ></input>
        <ul>
            {profiles.length? (
                profiles.map( profile => (
                    <li>
                        
                    </li>
                ))
            ) : ("search for a profile...")}
        </ul>
    </div>
  )
}

export default ProfileSearch