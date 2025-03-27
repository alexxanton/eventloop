import { CTickets } from "@/components/events/CTickets";
import { supabase } from "@/utils/supabase";

export default async function Page() {
  const { data: tickets } = await supabase.from("tickets").select("*");

  return <CTickets tickets={tickets} />;
}
