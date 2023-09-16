import { Box, CircularProgress } from "@printed/design-system";

export function LoadingPage() {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
}
