
import { createClient } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

const supabase = createClient();

export async function POST(request: Request) {
    const {teamId}  = await request.json()

    const token = crypto.randomUUID();

    const {error} = await supabase
        .from('team_invitations')
        .insert([{ team_id: teamId, token}]);

    if (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, {status: 500});
    }

    const inviteURL = `/invite?token=${token}`;
    return NextResponse.json({inviteURL});
}