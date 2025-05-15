import { CTickets } from "@/components/events/CTickets";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect("/login")
  }

  const { data: tickets } = await supabase
    .from("tickets")
    .select("*, event:events!inner(*)")
    .eq("user_id", user.id);

  return <CTickets tickets={tickets || []} />;
}
