import { createClient } from "@/lib/supabase/client"

export async function GetTeams() {
    const supabase = createClient();
    const {data: {user}}= await supabase.auth.getUser();

    if (!user) throw new Error("User not logged in");

    const {data, error} = await supabase
        .from('team_members')
        .select('teams(*)')
        .eq('user_id', user.id);

    console.log("User is in these teams:", data);
    return data
}