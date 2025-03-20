import { List } from "@mui/material";
import { CGroupButton } from "./CGroupButton";
import { CNewGroupButton } from "./CNewGroupButton";

export type GroupType = {
  name: string;
  description: string;
};

export function CGroupsList({groups}: {groups: GroupType[] | null}) {
  return (
    <List disablePadding>
      <CNewGroupButton />
      {groups?.map((group, id) => {
        return <CGroupButton group={group} key={id} />;
      })}
    </List>
  );
}
