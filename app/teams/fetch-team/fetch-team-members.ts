import { createClient } from "@/lib/supabase/client"

export async function GetTeamMembers(team_id: string) {
    const supabase = createClient();
    const {data: {user}}= await supabase.auth.getUser();

    if (!user) throw new Error("User not logged in");

    console.log("Fetching data");

    const {data, error} = await supabase.from('team_members').select('user_id').eq('team_id', team_id);

    console.log("Members in team:", data);
    return data
}