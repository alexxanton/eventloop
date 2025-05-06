"use client";
import { GroupType } from "@/utils/types/types";
import { useStore } from "@/utils/zustand";
import { Groups } from "@mui/icons-material";
import { Avatar, Box, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";

export function CGroupButton({ group }: { group: GroupType }) {
  const { currentGroup, setCurrentGroup } = useStore();
  const theme = useTheme();
  const isSelected = group?.id === currentGroup?.id;

  return (
    <ListItem disablePadding sx={{
      position: "relative",
      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          repeating-linear-gradient(
            -45deg,
            ${theme.palette.primary.main}20,
            ${theme.palette.primary.main}20 12px,
            transparent 12px,
            transparent 24px
          )
        `,
        opacity: isSelected ? 0.4 : 0.2,
        transition: "opacity 0.3s"
      },
      
    }}>
      <ListItemButton
        sx={{
          height: 70,
          px: 2,
          overflow: "hidden",
          background: `
            linear-gradient(
              145deg,
              ${isSelected ? theme.palette.primary.light + "40" : "transparent"},
              ${isSelected ? theme.palette.secondary.light + "20" : "transparent"}
            )
          `,
          borderLeft: `4px solid ${isSelected ? theme.palette.primary.main : "transparent"}`,
          "&:hover": {
            "& .content-wrap": {
              transform: "translateX(8px)"
            }
          }
        }}
        onClick={() => setCurrentGroup(group)}
      >
        <Box className="content-wrap" sx={{
          display: "flex",
          alignItems: "center",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          width: "100%"
        }}>
          <ListItemIcon sx={{ minWidth: "40px", mr: 2 }}>
            <Avatar sx={{
              bgcolor: "transparent",
              background: `
                linear-gradient(
                  45deg,
                  ${theme.palette.primary.main},
                  ${theme.palette.secondary.main}
                )
              `,
              boxShadow: 2,
              color: theme.palette.primary.contrastText,
              "& .MuiSvgIcon-root": {
                transition: "transform 0.3s"
              }
            }}>
              <Groups fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <ListItemText
            sx={{
              "& .MuiListItemText-primary": {
                fontWeight: 600,
                background: `
                  linear-gradient(
                    45deg,
                    ${theme.palette.text.primary},
                    ${isSelected ? theme.palette.primary.main : theme.palette.text.secondary}
                  )
                `,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textWrap: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              },
              "& .MuiListItemText-secondary": {
                fontSize: "0.75rem",
                opacity: 0.8,
                textWrap: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                position: "relative",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  width: "40%",
                  height: "1px",
                  background: theme.palette.divider
                }
              }
            }}
            primary={group?.name}
            secondary={group?.description}
          />
        </Box>
      </ListItemButton>
    </ListItem>
  );
}
