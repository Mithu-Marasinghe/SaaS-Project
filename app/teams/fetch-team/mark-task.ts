import { createClient } from "@/lib/supabase/client";
import { ParamValue } from "next/dist/server/request/params";

export default async function markTask(task_id: ParamValue, isDone: boolean) {
    const supabase = createClient();
    
    const {error} = await supabase
        .from('task_list')
        .update({'isDone': isDone})
        .eq('task_id', task_id)
    
    if (error) throw error;

    return;
}   