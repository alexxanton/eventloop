"use client";
import { supabase } from "@/utils/supabase";
import { List } from "@mui/material";
import { CGroupButton } from "./CGroupButton";
import { CNewGroupButton } from "./CNewGroupButton";
import { useEffect, useState } from "react";

export function CGroupsList() {
  const [groupsList, setGroupsList] = useState<any[]>([]);

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
      {groupsList.map((item, id) => {
        return <CGroupButton group={item} key={id} />;
      })}
    </List>
  );
}
