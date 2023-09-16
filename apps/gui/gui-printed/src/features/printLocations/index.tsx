import {
  Box,
  Drawer,
  Icon,
  IconButton,
  Paper,
  Spacings,
  styled,
  Toolbar,
  useTheme,
} from "@printed/design-system";
import React, { useCallback, useState } from "react";
import { PrintLocationList } from "./components/PrintLocationList";
import { PrintMap } from "./components/PrintMap";

import printLocations from "../../assets/barcelona_print_shops.json";

const drawerWidth = 240;

const ContentContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

export function PrintLocations() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const overlays = useCallback(
    (style: React.CSSProperties) => {
      return (
        <Paper
          variant="elevation"
          style={{
            background: theme.palette.background.paper,
            height: "100px",
            width: "30px",
            alignSelf: "center",
            justifySelf: "flex-start",
            margin: theme.spacing(Spacings.small),
            ...style,
          }}
        >
          <IconButton
            color="inherit"
            size="medium"
            style={{
              height: "100%",
              width: "100%",
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <Icon.ChevronLeftRounded fontSize="inherit" />
            ) : (
              <Icon.ChevronRightRounded fontSize="inherit" />
            )}
          </IconButton>
        </Paper>
      );
    },
    [isOpen, theme]
  );

  return (
    <Box width="100%" height="100%" display="flex">
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}
      >
        <Toolbar />
        <Box flex={1} overflow="scroll">
          <PrintLocationList
            locations={printLocations.map((l) => ({
              name: l.name,
              coordinates: { latitude: l.latitude, longitude: l.longitude },
            }))}
          />
        </Box>
      </Drawer>
      <ContentContainer open={isOpen}>
        <PrintMap
          overlays={overlays}
          dataSets={[
            {
              data: printLocations,
              getLocation: (d) => [d.longitude, d.latitude],
            },
          ]}
        />
      </ContentContainer>
    </Box>
  );
}
