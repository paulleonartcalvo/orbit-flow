import { Box } from "@printed/design-system";

export function LandingPage() {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Hi there. This is the page you see when you aren't logged in and try to
      access a page that requires authentication.
    </Box>
  );
}
