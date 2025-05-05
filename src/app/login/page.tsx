import { CAccount } from "@/components/account/CAccount";
import { CLogin } from "@/components/account/CLogin";
import { createClient } from '@/utils/supabase/server';

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser()

  return user ? <CAccount user={user} /> : <CLogin />;
}
