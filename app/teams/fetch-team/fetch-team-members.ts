import { createClient } from "@/lib/supabase/client"
import { ParamValue } from "next/dist/server/request/params";

export async function GetTeamMembers(team_id: ParamValue) {
    const supabase = createClient();
    const {data: {user}}= await supabase.auth.getUser();

    if (!user) throw new Error("User not logged in");

    console.log("Fetching data");

    const {data, error} = await supabase.from('team_members').select('*').eq('team_id', team_id);

    console.log("Members in team:", data);
    return data
}