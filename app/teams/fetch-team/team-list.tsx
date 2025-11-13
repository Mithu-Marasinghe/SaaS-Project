'use client';

import { useEffect, useState } from 'react';
import { GetTeams } from './fetch-team';
import { createTeam } from '../create-team/create-team';
import { useRouter } from 'next/navigation';

export default function TeamList() {
    const router = useRouter();
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [team_members, setTeamMembers] = useState<any[]>([]);

    const handleCreateTeam = async () => {
        try {
            const team = await createTeam("New Team");
            const data = await GetTeams();
            setTeams(data || [])
            console.log("Created team:", team);
        } catch (err) {
            console.error("Error creating team:", err);
        }
    }

    const routeToTeam = (teamId: string) => {
        router.push(`/teams/${teamId}`);
    };

    useEffect(() => {
        async function fetchTeams() {
        try {
            const data = await GetTeams();
            setTeams(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        }

        fetchTeams();
    }, []);

    if (loading) return <p>Loading teams...</p>;

    return (
        <div>
        <button onClick={handleCreateTeam}>Create New Team</button>
        <h2>Your Teams:</h2>
        {teams.length === 0 ? (
            <p>You don’t own any teams yet.</p>
        ) : (
            <ul>
            {teams.map(team => (
                <li key={team.id} className="mb-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded" 
                    onClick={() => routeToTeam(team.id)}>
                        {team.name}
                    </button>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}
