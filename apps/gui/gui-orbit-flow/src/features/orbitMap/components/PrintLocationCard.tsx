import {
  Box,
  Card,
  //   Paper,
  Spacings,
  Stack,
  Typography,
  useTheme,
} from "@orbit-flow/design-system";
import { useIntl } from "react-intl";

type Props = {
  name: string;
  address: string;
  distance?: number;
};
export function PrintLocationCard({ name, address, distance }: Props) {
  const intl = useIntl();
  const theme = useTheme();
  return (
    <Card
      elevation={2}
      style={{
        borderRadius: "4px",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Stack
        width="100%"
        height="100%"
        padding={theme.spacing(Spacings.small)}
        boxSizing="border-box"
        overflow="hidden"
      >
        <Typography
          flexGrow="1"
          variant="subtitle2"
          noWrap
          component={Box}
          overflow="hidden"
        >
          {name}
        </Typography>

        <Stack
          direction="row"
          flexGrow={1}
          overflow="hidden"
          color="text.secondary"
          gap={theme.spacing(Spacings.small)}
        >
          <Typography variant="caption" noWrap>
            {address}
          </Typography>
          {distance !== undefined && (
            <Typography variant="caption" noWrap>
              {intl.formatNumber(distance / 1000, {
                style: "unit",
                compactDisplay: "short",
                unit: "kilometer",
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
                // roundingPriority: "auto",
                // roundingIncrement: 0.1,
                // roundingMode: "ceil",
              })}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
