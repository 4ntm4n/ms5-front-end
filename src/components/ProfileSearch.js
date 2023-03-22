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
    {/* {groupObj && console.log("group passed down from group detail: ",  groupObj )} */}
    {profiles !== null && (
      <ul>
        {profiles.length ? (
          profiles.map(profile => {
            /* 
             *
             *
             * the nested "find" method. saves the first match it finds of the members array
             * with each itteration of the profiles map that we are inside right now.
             * if the profile.owner matches any  member.owner, it means that the profile, is already
             * in the members list of the group. and we add a remove button, else we render an add button. 
             * Note. it will only return a profile of profile is not group owner, cuz the group owner can not
             * remove itself from the group on the server side in this app...
            */
            const memberMatch = groupObj.members.map(member => member.owner.id === profile.owner.id);
            const groupOwner = groupObj.group_owner.owner
            console.log(groupOwner)
            if (groupOwner === profile.owner)
                return null
            
            return  (
                <li key ={profile.id} >
                    {profile.owner}
                    {memberMatch ? <button>remove</button> : <button>add</button>}
                </li>
                
            )
        })
        ) : (
          "No profiles found."
        )}
      </ul>
    )}
  </div>
  )
}

export default ProfileSearch