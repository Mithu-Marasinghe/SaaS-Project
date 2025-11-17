'use client';

import { useParams } from 'next/navigation';
import { GetTeamMembers } from '../fetch-team/fetch-team-members';
import { useEffect, useState } from 'react';
import { GetTeamInfo } from '../fetch-team/fetch-team-info';
import { GetUserInfo } from '../fetch-team/fetch-user';

export default function TeamPage() {
    const params = useParams();
    const teamIdStr = params.team_id;
    const [team_members, setTeamMembers] = useState<any[]>([]);
    const [teamInfo, setTeamInfo] = useState<any>(null);
    const [showInviteURL, setShowInviteURL] = useState(false);
    const [inviteLink, setInviteLink] = useState<string | null>(null);


    if (!teamIdStr || Array.isArray(teamIdStr)) {
        return <p>Invalid team ID</p>;
    }

    const handleInviteClick = async () => {
        try {
            const result = await fetch('/api/invitation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ teamId: teamIdStr }),
            });

            const data = await result.json();
            setShowInviteURL(true);
            setInviteLink(data.inviteURL);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
            async function fetchTeamMembers() {
            try {
                const data = await GetTeamMembers(teamIdStr);
                const teamData = await GetTeamInfo(teamIdStr);
                setTeamMembers(data || []);
                setTeamInfo(teamData || []);
            } catch (err) {
                console.error(err);
            };
            }
    
            fetchTeamMembers();
        }, []);

    return (
        <div>
        <h1>Team Page</h1>
        <p>Team Name: {teamInfo?.name}</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleInviteClick()}>Invite Members</button>
        {inviteLink && (
        <p>
            Invite link: <a href={inviteLink} target="_blank">{process.env.NEXT_PUBLIC_BASE_URL + inviteLink}</a>
        </p>
        )}
        <p>Team Members: </p>
        {team_members.map(member=> (
            <li key={member.user_id}>{member.user_email} ({member.role})</li>
        ))}
        </div>
    );
}
