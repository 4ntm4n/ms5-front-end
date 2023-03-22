import React, { useState, useEffect } from 'react'
import { axiosReq } from '../api/AxiosDefaults'
import ProfilePic from './ProfilePic'



function ProfileSearch({ groupObj , groupId }) {
const [profiles, setProfiles] = useState([])
const [searchField, setSearchField] = useState(null)

const handleSearch = (e) => {
    setSearchField(e.currentTarget.value)
}

const fetchProfiles = async () => {
    try {
        const { data } = await axiosReq.get(`/profiles/?search=${searchField}`)
        setProfiles(data.results)
    } catch (error) {
        
    }
}

useEffect(() => {
    if (searchField !== ""){
        fetchProfiles()
    }
    else {
        setSearchField(null)
    }
}, [searchField]);
return (
    <div>
    <input onChange={handleSearch} ></input>
    {groupObj && console.log("group passed down from group detail: ",  groupObj.members )}
    {profiles !== null && (
      <ul>
        {profiles.length ? (
          profiles.map(profile => (
            <li key={profile.id}>{profile.owner}
                <button>add</button>
            </li>
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