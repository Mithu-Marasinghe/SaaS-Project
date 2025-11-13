'use client';

import Link from "next/link"
import { createTeam } from "./fetch-team/create-team"
import { GetTeams } from "./fetch-team/fetch-team";
import TeamList from "./team-list";

export default function CreateTeam() {
    return <div>
        <TeamList />
    </div>
}