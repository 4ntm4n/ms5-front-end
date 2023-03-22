import React, { useState, useEffect } from 'react'
import { axiosReq } from '../api/AxiosDefaults'
import ProfilePic from './ProfilePic'



function ProfileSearch() {
const [profiles, setProfiles] = useState([])
const [searchField, setSearchField] = useState(null)

const handleSearch = (e) => {
    setSearchField(e.currentTarget.value)
}

const fetchProfiles = async () => {
    try {
        const { data } = await axiosReq.get(`/profiles/?search=${searchField}`)
        console.log(data.results)
        setProfiles(data.results)
    } catch (error) {
        
    }
}

useEffect(() => {
    if (searchField) {
        fetchProfiles();
      }else{
        setProfiles(null)
      }
    
}, [searchField]);
return (
    <div>
    <input onChange={handleSearch} ></input>
    {profiles !== null && (
      <ul>
        {profiles.length ? (
          profiles.map(profile => (
            <li key={profile.id}>{profile.owner}</li>
          ))
        ) : (
          "No profiles found."
        )}
      </ul>
    )}
  </div>
  )
}

export default ProfileSearch