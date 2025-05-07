import { List } from "@mui/material";
import { CGroupButton } from "./CGroupButton";
import { CNewGroupModal } from "./CNewGroupModal";
import { Group } from "@/utils/types/types";

export function CGroupsList({groups}: {groups: Group[] | null}) {
  return (
    <List disablePadding>
      <CNewGroupModal />
      {groups?.map((group, id) => {
        return <CGroupButton group={group} key={id} />;
      })}
    </List>
  );
}
