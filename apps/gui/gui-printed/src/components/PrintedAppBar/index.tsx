import {
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  Typography,
  Avatar,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
} from "@printed/design-system";
import { useMemo, useState } from "react";
import { ProfileMenu } from "../ProfileMenu";

import printedLogo from "../../assets/printed_transparent.svg";
import { useNavigate } from "react-router-dom";

export function PrintedAppBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [profileMenuAnchorElement, setProfileMenuAnchorElement] =
    useState<HTMLElement | null>(null);

  // ----- Helpers -----
  const pages: { id: string; label: string }[] = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "print", label: "Print" },
    ],
    []
  );
  // ----- Handlers -----
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setProfileMenuAnchorElement(null);
  };

  return (
    <AppBar
      color="default"
      position="static"
      component="nav"
      sx={{ userSelect: "none", zIndex: theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton size="large">
          <Icon.MenuRounded />
        </IconButton>
        <img src={printedLogo} color="red" height="64" />
        <Stack
          direction="row"
          flex="1"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex={1}
          >
            <Typography variant="h6" noWrap component="div">
              Printed
            </Typography>
          </Box>
          <List
            sx={{
              flex: 0,
              display: "flex",
            }}
          >
            {pages.map((page) => (
              <ListItem key={page.id} disablePadding>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  onClick={() => navigate("/" + page.id)}
                >
                  <ListItemText primary={page.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>

        <IconButton onClick={handleClick}>
          <Avatar alt="Remy Sharp" />
        </IconButton>
        <ProfileMenu
          anchorElement={profileMenuAnchorElement}
          onClose={handleClose}
        />
      </Toolbar>
    </AppBar>
  );
}
