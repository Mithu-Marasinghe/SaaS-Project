import { createClient } from "@/lib/supabase/client"
import { ParamValue } from "next/dist/server/request/params";

export async function GetTeamInfo(team_id: ParamValue) {
    const supabase = createClient();
    const {data: {user}}= await supabase.auth.getUser();

    if (!user) throw new Error("User not logged in");

    console.log("Fetching data");

    const {data, error} = await supabase.from('teams').select('*').eq('id', team_id).single();

    console.log("Team Info:", data);
    return data
}