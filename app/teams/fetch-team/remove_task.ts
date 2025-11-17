import { createClient } from "@/lib/supabase/client";

export default async function removeTask(task_id: string) {
    const supabase = createClient();
    const {error} = await supabase
        .from('task_list')
        .delete()
        .eq('task_id', task_id);
    return;
}