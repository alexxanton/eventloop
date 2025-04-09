import * as React from 'react';
import { CGroupView } from '@/components/groups/chat/CGroupView';
import { supabase } from '@/utils/supabase';

export default async function Home() {
  const { data: groups } = await supabase
    .from("groups")
    .select("*, group_members!inner(*)");
    console.log(groups)

  return <CGroupView groups={groups} />;
}
