'use client';

import Link from "next/link"
import { createTeam } from "./create-team/create-team"

export default function CreateTeam() {
    const handleCreateTeam = async () => {
        try {
            const team = await createTeam("New Team");
            console.log("Created team:", team);
        } catch (err) {
            console.error("Error creating team:", err);
            console.log("Error details:", JSON.stringify(err, null, 2));
        }
    }

    return <div>
        <button onClick={handleCreateTeam}>Create New Team</button>
    </div>
}