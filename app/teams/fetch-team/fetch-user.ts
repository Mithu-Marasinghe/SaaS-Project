import { createClient } from "@/lib/supabase/client"
import { ParamValue } from "next/dist/server/request/params";

export async function GetUserInfo(user_id: ParamValue) {
    const supabase = createClient();
    console.log("Fetching data");

    const {data, error} = await supabase.from('auth.users').select('*').eq('id', user_id).single();

    console.log("User info:", data);
    return data
}