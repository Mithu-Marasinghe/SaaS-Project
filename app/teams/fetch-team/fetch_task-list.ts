import { createClient } from "@/lib/supabase/client";
import { ParamValue } from "next/dist/server/request/params";

export default async function getTaskList(team_id: ParamValue) {
    const supabase = createClient();

    const {data, error} = await supabase
        .from('task_list')
        .select('*')
        .eq('team_id', team_id)

    if (error) throw error;

    return data;
}