'use client';

import { useParams } from 'next/navigation';
import { GetTeamMembers } from '../fetch-team/fetch-team-members';
import { Fragment, useEffect, useState } from 'react';
import { GetTeamInfo } from '../fetch-team/fetch-team-info';
import { GetUserInfo } from '../fetch-team/fetch-user';
import getTaskList from '../fetch-team/fetch_task-list';
import addTask from './add_task';
import removeTask from '../fetch-team/remove_task';
import markTask from '../fetch-team/mark-task';


export default function TeamPage() {

    const params = useParams();
    const teamIdStr = params.team_id;
    const [team_members, setTeamMembers] = useState<any[]>([]);
    const [teamInfo, setTeamInfo] = useState<any>(null);
    const [showInviteURL, setShowInviteURL] = useState(false);
    const [inviteLink, setInviteLink] = useState<string | null>(null);
    const [taskList, setTaskList] = useState<any[]>([]);
    const [taskName, setTaskName] = useState("New Task");


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

    async function fetchAllTeamData() {
        try {
            const data = await GetTeamMembers(teamIdStr);
            const teamData = await GetTeamInfo(teamIdStr);
            const taskData = await getTaskList(teamIdStr);

            setTeamMembers(data || []);
            setTeamInfo(teamData || []);
            setTaskList(taskData || []);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (!teamIdStr) return;
        fetchAllTeamData();
}, [teamIdStr]);

    return (
        <div>
        <p >{teamInfo?.name}</p>
        <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => handleInviteClick()}>Invite Members</button>
        {inviteLink && (
        <p>
            Invite link: <a href={inviteLink} target="_blank">{process.env.NEXT_PUBLIC_BASE_URL + inviteLink}</a>
        </p>
        )}
        <li></li>
        <li>
        <input 
            onChange={(e) => setTaskName(e.target.value)}
            placeholder='Enter Task Name'>
        </input>
        </li>
        <button className="regButton" onClick={async () => {
            await addTask(teamIdStr, taskName);
            fetchAllTeamData();
        }}>Add Task</button>
        <li></li>
        <p>Task List:</p>
        {taskList.length == 0 ? `Team ${teamInfo?.name} has no tasks` : ''}
        {taskList.map(taskValue => 
            <Fragment key={taskValue.task_id}>
                <li className="flex items-center gap-10">{taskValue.task} 
                    <button className='completeButton' onClick={() => {
                        if (taskValue.isDone) {
                            markTask(taskValue.task_id, false);
                        } else {
                            markTask(taskValue.task_id, true);
                        }
                        //TODO - change to each one so it loads faster
                        fetchAllTeamData();
                    }}>
                        {taskValue.isDone ? 'Done': 'Mark as Done'}
                    </button>
                    <button className='deleteButton' onClick={() => {
                        removeTask(taskValue.task_id);
                        fetchAllTeamData();
                    }}>Delete</button></li>
            </Fragment>
        )}

        <li></li>

        <p>Team Members: </p>
        {team_members.map(member=> (
            <li key={member.user_id}>{member.user_email} ({member.role})</li>
        ))}
        </div>
    );
}
