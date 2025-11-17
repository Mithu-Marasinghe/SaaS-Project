'use client'

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function invitePage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const supabase = createClient();
    const [status, setStatus] = useState('Loading...');

    useEffect(() => {
        const acceptInvite = async() => {
            if (!token) {
                return setStatus('Invalid invite');
            }
            
            //checks if there is a matching token
            const {data: invite, error} = await supabase
                .from('team_invitations')
                .select('team_id')
                .eq('token', token)
                .single();
            
            if (!invite || error) {
                setStatus('Invalid invite');
                return;
            }

            const {data: {user}} = await supabase.auth.getUser();

            if (!user) {
                setStatus('Please sign in to accept the invite');
                return;
            }
            
            //adds the new team member if there are no errors
            const {error: addError} = await supabase
                .from('team_members')
                .insert([{ team_id:invite.team_id, user_id: user.id,user_email: user.email}]);

            if (addError) {
                setStatus('You are already a member of this team');
            } else {
                setStatus('Successfully joiend the team');
            }
        };
        acceptInvite();
    }, [token]);

    return <p>{status}</p>
}