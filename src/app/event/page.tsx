import { CEventCalendar } from "@/components/calendars/CEventCalendar";
import { supabase } from "@/utils/supabase";

export default async function Page() {
  const { data: events } = await supabase.from("events").select("*");

  return <CEventCalendar events={events} />;
}
