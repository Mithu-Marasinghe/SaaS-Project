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

    if (!teamIdStr || Array.isArray(teamIdStr)) {
        return <p>Invalid team ID</p>;
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
        <p>Team Name: {teamInfo.name}</p>
        <p>Team Members: </p>
        {team_members.map(member=> (
            <li key={member.user_id}>{member.user_email}</li>
        ))}
        </div>
    );
}
