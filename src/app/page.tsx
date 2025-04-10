import * as React from 'react';
import { CGroupView } from '@/components/groups/chat/CGroupView';
import { supabase } from '@/utils/supabase/supabase';
import { cookies } from "next/headers";

export default async function Home() {
  const userId = (await cookies()).get("user_id")?.value;
  console.log(userId)
  
  const { data: groups } = await supabase
    .from("groups")
    .select("*")
    // .select("group_id, groups(*)")
    // .eq("user_id", userId);

  return <CGroupView groups={groups} />;
}
