import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  CircularProgress,
  CssBaseline,
  MuiThemeProvider,
  Stack,
} from "@orbit-flow/design-system";
import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { NotFoundPage } from "./components/NotFoundPage";

// import printedLogo from "./assets/printed_transparent.svg";
import { OrbitAppBar } from "./components/AppBar";
import { Home } from "./features/home";

import "mapbox-gl/dist/mapbox-gl.css";
import { OrbitMap } from "./features/orbitMap";

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
          <OrbitAppBar />
          <Box flex={1} width="100%">
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/" element={<Navigate to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="map" element={<OrbitMap />} />
            </Routes>
          </Box>
        </Stack>
      )}
    </MuiThemeProvider>
  );
}

export default App;
