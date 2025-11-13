import { createClient } from "@/lib/supabase/client"

export async function GetTeams() {
    const supabase = createClient();
    const {data: {user}}= await supabase.auth.getUser();

    if (!user) throw new Error("User not logged in");

    const {data, error} = await supabase.from('teams').select('*').eq('owner_id', user.id);

    console.log("Teams owned by user:", data);
    return data
}