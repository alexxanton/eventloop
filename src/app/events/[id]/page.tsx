import { CEvent } from "@/components/events/CEvent";
import { supabase } from "@/utils/supabase";

interface PageProps {
  params: { id: string };
}

export default async function Page({params}: PageProps) {
  const {data: event} = await supabase
    .from("events")
    .select("*")
    .eq("id", params.id)
    .single();
  
  return <CEvent event={event} />;
}
