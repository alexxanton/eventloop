import { CEventPage } from "@/components/events/CEventPage";
import { supabase } from "@/utils/supabase/supabase";

export default async function Page({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  const {data: event} = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();
  
  return <CEventPage event={event} />;
}
