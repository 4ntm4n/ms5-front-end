import React from 'react'
import ProfilePic from './ProfilePic'

function GroupMembers({group, size=50}) {
    return (
        <div>
            {/* map through the members and extract non group owners */}
            {group.members.map((member) =>
                !member.is_owner && (
                    <ProfilePic key={group.id + member.id} member={member} size={size} />
                )
            )}
        </div>
    )
}

export default GroupMembers