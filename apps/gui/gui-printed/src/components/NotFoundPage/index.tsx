import { Alert, Box, Spacings, Stack, useTheme } from "@printed/design-system";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction="column" gap={theme.spacing(Spacings.small)}>
        <Alert
          severity="error"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Sorry, we couldnt find that page, click here to go home
        </Alert>
      </Stack>
    </Box>
  );
}
