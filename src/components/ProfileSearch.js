import React, { useState, useEffect } from 'react'
import { axiosReq } from '../api/AxiosDefaults'
import ProfilePic from './ProfilePic'
import { useTasksUpdate } from '../contexts/TasksContext'


function ProfileSearch({ groupObj , groupId }) {
const [profiles, setProfiles] = useState([])
const [searchField, setSearchField] = useState(null)
const updateTasksList = useTasksUpdate()
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

const handleAddRemove = (id) => {
    console.log(id)
    setSearchField("")
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
             * Note. it will only return a the profile if the profile is not group owner, cuz group owners can't
             * remove itself from the group on the server side in this app...
            */
            const memberMatch = groupObj.members.find(member => member.owner === profile.owner);
            const groupOwner = groupObj.group_owner.owner
            
            //exclude from searchresults if profile is group owner.
            if (profile.owner === groupOwner) {
                return null; 
              }
            return  (
                <li key ={profile.id} >
                    {profile.owner}
                    {memberMatch &&  <button onClick={() => handleAddRemove(profile.id)}>remove</button>}
                    {!memberMatch && <button onClick={() => handleAddRemove(profile.id)}>add</button>}
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