'use client';

import { useParams } from 'next/navigation';
import { GetTeamMembers } from '../fetch-team/fetch-team-members';
import { Fragment, useEffect, useState } from 'react';
import { GetTeamInfo } from '../fetch-team/fetch-team-info';
import getTaskList from '../fetch-team/fetch_task-list';
import addTask from './add_task';
import removeTask from '../fetch-team/remove_task';
import markTask from '../fetch-team/mark-task';



export default function TeamPage() {

    const params = useParams();
    const teamIdStr = params.team_id;
    const [team_members, setTeamMembers] = useState<any[]>([]);
    const [teamInfo, setTeamInfo] = useState<any>(null);
    const [inviteLink, setInviteLink] = useState<string | null>(null);
    const [taskList, setTaskList] = useState<any[]>([]);
    const [taskName, setTaskName] = useState("New Task");
    const [loading, setLoading] = useState(true);



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
            setInviteLink(data.inviteURL);
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchMembers() {
        try {
            const memberData = await GetTeamMembers(teamIdStr);
            setTeamMembers(memberData || []);
        } catch (err) {
            console.error(err);
        }
    }

    async function fetchTeamInfo() {
        try {
            const teamData = await GetTeamInfo(teamIdStr);
            setTeamInfo(teamData || []);
        } catch (err) {
            console.error(err);
        }
    }

    async function fetchTaskInfo() {
        try {
            const taskData = await getTaskList(teamIdStr);
            setTaskList(taskData || []);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
    if (!teamIdStr) return;

    const fetchData = async () => {
        try {
            await fetchMembers();
            await fetchTeamInfo();
            await fetchTaskInfo();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
    }, [teamIdStr]);

    if (loading) return <p>Loading Team...</p>

    return (
        <div>   
            <p className='text-xl font-bold'>{teamInfo?.name}</p> <br/>
            <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => handleInviteClick()}>Invite Members</button>
            {inviteLink && (
            <p>
                Invite link: <a href={inviteLink} target="_blank"><li className='text-blue-500'>{process.env.NEXT_PUBLIC_BASE_URL + inviteLink}</li></a>
            </p>
            )}
            <li></li>
            <li>
            <input 
                onChange={(e) => setTaskName(e.target.value)}
                placeholder='Enter Task Name'>
            </input>
            </li>
            <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={async () => {
                await addTask(teamIdStr, taskName);
                fetchTaskInfo();
            }}>Add Task</button>
            <li></li>
            <p className='text-xl font-bold'>Task List:</p>
            {taskList.length == 0 ? 'This team has no tasks' : ''}
            {taskList.map(taskValue => 
                <Fragment key={taskValue.task_id}>
                    <li className="flex items-center gap-10">{taskValue.task} 
                        <button className='completeButton' onClick={() => {
                            if (taskValue.isDone) {
                                markTask(taskValue.task_id, false);
                            } else {
                                markTask(taskValue.task_id, true);
                            }
                            fetchTaskInfo();
                        }}>
                            {taskValue.isDone ? 'Done': 'Mark as Done'}
                        </button>
                        <button className='deleteButton' onClick={() => {
                            removeTask(taskValue.task_id);
                            fetchTaskInfo();
                        }}>Delete</button></li>
                </Fragment>
            )}

            <li></li>

            <p className='text-xl font-bold'>Team Members: </p>
            {team_members.map(member=> (
                <li key={member.user_id}>{member.user_email} ({member.role})</li>
            ))}
        </div>
    );
}
