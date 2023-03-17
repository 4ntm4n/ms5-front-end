import React from 'react'
import ProfilePic from './ProfilePic'

function GroupMembers({group}) {
    return (
        <div>
            {/* map through the members and extract non group owners */}
            <p>members</p>
            {group.members.map((member) =>
                !member.is_owner && (
                    <ProfilePic key={group.id + member.id} member={member} size={50} />
                )
            )}
        </div>
    )
}

export default GroupMembers