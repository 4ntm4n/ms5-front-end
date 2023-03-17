import React, { useState, useEffect } from 'react'
import { axiosReq, axiosRes } from '../api/AxiosDefaults'

function GroupDetail() {

    useEffect(() => {
        try {
        } catch (error) {
            console.log(error)
        }
    },[])
  return (
    <>
        <h1>Hello from Group Detail Page!</h1>
        <>Group Owner name</> <br />
        <>Members component</> <br />
        <>list of tasks components belonging to group</> <br />
        <>add new task to this group functionality to this specific group</> <br />
        <>add remove task to this group functionality </> <br />
        <>link to task details</>
        
    </>
  )
}

export default GroupDetail