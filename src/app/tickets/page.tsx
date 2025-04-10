import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { CTickets } from "@/components/events/CTickets";

export default async function Page() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // process.env.SUPABASE_SERVICE_ROLE_KEY!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name) {
          return (await cookieStore).get(name)?.value;
        },
        set(name, value, options) {
        },
        remove(name, options) {
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  console.log(user);
  

  // if (!user) {
  //   return <div>You need to be logged in.</div>;
  // }

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
