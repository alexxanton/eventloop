import { supabase } from "@/utils/supabase";
import { List } from "@mui/material";
import { CGroupButton } from "./CGroupButton";
import { CNewGroupButton } from "./CNewGroupButton";

export async function CGroupsList() {
  const { data: groups } = await supabase.from("groups").select("*");

  return (
    <>
      <CNewGroupButton />
      <List disablePadding>
        {groups?.map((item, id) => {
          return <CGroupButton group={item} key={id} />;
        })}
      </List>
    </>
  );
}
