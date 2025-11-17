
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const supabase =  await createClient();
    const {teamId}  = await request.json()

    const token = crypto.randomUUID();

    // const {error} = await supabase
    //     .from('team_invitations')
    //     .insert([{ team_id: teamId, token}]);

    const {error} = await supabase.from('team_invitations').insert([{ team_id: teamId, token}])

    if (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, {status: 500});
    }

    const inviteURL = `/invite?token=${token}`;
    return NextResponse.json({inviteURL});
}