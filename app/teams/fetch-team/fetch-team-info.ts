import { createClient } from "@/lib/supabase/client"

export async function GetTeamInfo(team_id: string) {
    const supabase = createClient();
    const {data: {user}}= await supabase.auth.getUser();

    if (!user) throw new Error("User not logged in");

    console.log("Fetching data");

    const {data, error} = await supabase.from('teams').select('*').eq('id', team_id).single();

    console.log("Team Info:", data);
    return data
}