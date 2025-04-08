import { CTickets } from "@/components/events/CTickets";
import { supabase } from "@/utils/supabase";

export default async function Page() {
  const { data } = await supabase
    .from("tickets")
    .select("*, events!inner(*)");
  
  const tickets = data?.map(({ events, ...rest }) => ({
    ...rest,
    event: events, // Rename just for clarity
  }));

  console.log(tickets)

  return <CTickets tickets={tickets || []} />;
}
