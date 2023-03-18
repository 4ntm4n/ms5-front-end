import React from 'react'
import { Card } from 'react-bootstrap'
function Task({ task }) {
    /* completed
: 
false
created_at
: 
"03 Mar 2023"
description
: 
"some description"
group_name
: 
"sfsdf"
id
: 
5
in_progress
: 
false
owner
: 
null
owner_name
: 
null
owner_profile_image
: 
null
owning_group
: 
8
title
: 
"some werwe"
updated_at
: 
"03 Mar 2023"*/
    const {
        id,
        title,
        description,
        owner_name,
        owner_profile_image,
        in_progress,
        completed,
        owning_group,

    } = task

  return (
        <Card border="warning" >
            
            <Card.Title>{title}</Card.Title>
            <Card.Body>
                <h5>task id {id}</h5>
                {description}
            </Card.Body>
            {in_progress? (<p>{owner_name}</p>): (<p>take ownership</p>)}
            
            <span>mark as complete</span>
            <span></span>
        </Card>
  )
}

export default Task