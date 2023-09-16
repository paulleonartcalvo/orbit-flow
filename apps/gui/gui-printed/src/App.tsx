import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  CircularProgress,
  CssBaseline,
  MuiThemeProvider,
  Stack,
} from "@printed/design-system";
import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "./components/AuthenticationGuard";
import { NotFoundPage } from "./components/NotFoundPage";

// import printedLogo from "./assets/printed_transparent.svg";
import { PrintedAppBar } from "./components/PrintedAppBar";
import { Home } from "./features/home";

import { PrintLocations } from "./features/printLocations";

import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const { isLoading } = useAuth0();

  const loadingPage = useMemo(
    () => (
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    ),
    []
  );

  return (
    <MuiThemeProvider>
      <CssBaseline />
      {isLoading && loadingPage}
      {!isLoading && (
        <Stack sx={{ width: "100%", height: "100%" }}>
          <PrintedAppBar />
          <Box flex={1} width="100%">
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/" element={<Navigate to="home" />} />
              <Route path="home" element={<Home />} />
              <Route
                path="print"
                element={<AuthenticationGuard component={PrintLocations} />}
              />
            </Routes>
            {/* {!isAuthenticated && <LandingPage />}
            {isAuthenticated && (
              <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/" element={<Navigate to="home" />} />
                <Route
                  path="home"
                  element={<AuthenticationGuard component={Home} />}
                />
                <Route
                  path="print"
                  element={<AuthenticationGuard component={PrintLocations} />}
                />
              </Routes>
            )} */}
          </Box>
        </Stack>
      )}
    </MuiThemeProvider>
  );
}

export default App;
