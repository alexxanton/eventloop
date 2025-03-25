import { CEvent } from "@/components/events/CEvent";
import { supabase } from "@/utils/supabase";

export default async function Page({params}: {params: {id: string}}) {
  const {data: event} = await supabase
    .from("events")
    .select("*")
    .eq("id", params.id)
    .single();
  
  return <CEvent event={event} />;
}
