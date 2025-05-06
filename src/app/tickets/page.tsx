import { CTickets } from "@/components/events/CTickets";
import { supabase } from "@/utils/supabase";

export default async function Page() {
  const { data } = await supabase
    .from("tickets")
    .select("*, events!inner(*)")
    // .eq("user_id", user.id);

  const tickets = data?.map(({ events, ...rest }) => ({
    ...rest,
    event: events, // Rename for clarity
  }));

  return <CTickets tickets={tickets || []} />;
}
