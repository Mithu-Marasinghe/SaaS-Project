import { createClient } from "@/lib/supabase/client";

export default async function GetUser() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    return data.user;
}