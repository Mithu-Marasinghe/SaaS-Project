import { createClient } from "../../../lib/supabase/client";

export async function createTeam(name: String) {
    const supabase = createClient();
    const {data: {user}}= await supabase.auth.getUser();

    console.log("User Id:", user?.id);

    const {data, error} = await supabase
        .from('teams')
        .insert({name, owner_id: user?.id })
        .select()
        .single();

    console.log("Error", error?.message);
    
    if (error) throw error;

    await supabase.from('team_members').insert({
        team_id: data.id,
        user_email: user?.email,
        user_id: user?.id,
        role: 'owner',
    });

    console.log("Created the teammembers table?");

    return data;
}