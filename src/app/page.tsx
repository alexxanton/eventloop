import * as React from 'react';
import { CGroupView } from '@/components/groups/chat/CGroupView';
// import { supabase } from '@/utils/supabase/supabase';
import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  // const userId = await createClient();
  // console.log(userId.auth.getUser())

  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }
  
  const { data: groups } = await supabase
    .from("groups")
    .select("*")
    .in("id", 
        ((await supabase
            .from("group_members")
            .select("group_id")
            .eq("user_id", user.id))
            .data ?? []).map(member => member.group_id)
    );

    console.log(groups)

  return <CGroupView groups={groups} />;
}
