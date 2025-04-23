import * as React from 'react';
import { CGroupView } from '@/components/groups/chat/CGroupView';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect("/login")
  }
  
  const { data: groups } = await supabase
    .from("groups")
    .select("*, group_members!inner(user_id)")
    .eq("group_members.user_id", user.id)

  console.log(groups)

  return <CGroupView groups={groups} />;
}
