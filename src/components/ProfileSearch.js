import React, { useState, useEffect } from 'react'
import { axiosReq } from '../api/AxiosDefaults'
import ProfilePic from './ProfilePic'



function ProfileSearch() {
const [profiles, setProfiles] = useState([])
const [searchField, setSearchField] = useState("")

const handleSearch = (e) => {
    setSearchField(e.currentTarget.value)
}

const fetchProfiles = async () => {
    try {
        const { data } = await axiosReq.get(`/profiles/?search=${searchField}`)
        console.log(data.results)
    } catch (error) {
        
    }
}

useEffect(() => {
    fetchProfiles()
}, [searchField]);
return (
    <div>
        <input onChange={(e) => handleSearch(e)} ></input>
        <ul>
            {profiles.length? (
                profiles.map( profile => (
                    <li key={profile.id}>
                        {profile}
                    </li>
                ))
            ) : ("search for a profile...")}
        </ul>
    </div>
  )
}

export default ProfileSearch