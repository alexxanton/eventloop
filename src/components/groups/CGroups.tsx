import { supabase } from "@/utils/supabase";
import { Box, Button, List, Toolbar } from "@mui/material";
import { CGroupButton } from "./CGroupButton";

export async function CGroups() {
  const { data: groups } = await supabase.from("groups").select("*");

  return (
    <>
      <Toolbar />
      <List disablePadding>
        {groups?.map((item, id) => {
          return <CGroupButton props={item} key={id} />;
        })}
      </List>
    </>
  );
}
