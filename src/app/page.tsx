import * as React from 'react';
import { CGroupChat } from '@/components/groups/CGroupChat';
import { supabase } from '@/utils/supabase';

export default async function Home() {
  const { data: groups } = await supabase.from("groups").select("*");
  const { data: messages } = await supabase.from("messages").select("*");

  return <CGroupChat groups={groups} messages={messages} />;
}
