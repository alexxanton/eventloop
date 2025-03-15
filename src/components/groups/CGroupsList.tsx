"use client";
import { supabase } from "@/utils/supabase";
import { List } from "@mui/material";
import { CGroupButton } from "./CGroupButton";
import { CNewGroupButton } from "./CNewGroupButton";
import { useEffect, useState } from "react";

export type GroupType = {
  name: string;
  description: string;
};

export function CGroupsList() {
  const [groupsList, setGroupsList] = useState<GroupType[]>([]);

  const getGroups = async () => {
    const { data: groups } = await supabase.from("groups").select("*");
    if (groups) {
      setGroupsList([...groupsList, ...groups]);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <List disablePadding>
      <CNewGroupButton />
      {groupsList.map((group, id) => {
        return <CGroupButton group={group} key={id} />;
      })}
    </List>
  );
}
