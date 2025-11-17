import { createClient } from "@/lib/supabase/client";
import { ParamValue } from "next/dist/server/request/params";

export default async function addTask(team_id: ParamValue,taskValue: string) {
    const supabase = createClient();

    const {error} = await supabase
        .from('task_list')
        .insert({'team_id': team_id, 'task': taskValue});
    return;
}