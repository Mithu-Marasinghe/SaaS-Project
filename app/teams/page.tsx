'use client';

import Link from "next/link"
import { createTeam } from "./create-team/create-team"
import { GetTeams } from "./fetch-team/fetch-team";
import TeamList from "./fetch-team/team-list";

export default function CreateTeam() {
    return <div>
        <TeamList />
    </div>
}