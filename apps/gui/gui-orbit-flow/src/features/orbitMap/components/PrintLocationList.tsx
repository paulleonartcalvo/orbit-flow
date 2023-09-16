import { List, ListItem, Spacings, useTheme } from "@orbit-flow/design-system";
// import printLocations from "../../../assets/barcelona_print_shops.json";
import { PrintLocationCard } from "./PrintLocationCard";
import { getDistance } from "geolib";
import { useEffect, useMemo, useState } from "react";
import { PrintLocationMeta } from "../../types/printLocation";

type Props<T extends PrintLocationMeta> = {
  locations: T[];
};
export function PrintLocationList<T extends PrintLocationMeta>({
  locations,
}: Props<T>) {
  const theme = useTheme();

  const [currentLocation, setCurrentLocation] = useState<
    | { allowed: boolean; lat: number; lon: number }
    | { allowed: false }
    | undefined
  >(undefined);

  // ----- Helpers -----
  const sortedPrintLocations = useMemo(() => {
    if (!currentLocation?.allowed) {
      return locations;
    }
    return locations.sort((a, b) => {
      const [distanceToA, distanceToB] = [
        getDistance(
          {
            latitude: currentLocation.lat,
            longitude: currentLocation.lon,
          },
          {
            latitude: a.coordinates.latitude,
            longitude: a.coordinates.longitude,
          }
        ),
        getDistance(
          {
            latitude: currentLocation.lat,
            longitude: currentLocation.lon,
          },
          {
            latitude: b.coordinates.latitude,
            longitude: b.coordinates.longitude,
          }
        ),
      ];

      return distanceToA - distanceToB;
    });
  }, [currentLocation, locations]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          allowed: true,
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        setCurrentLocation({ allowed: false });
      }
    );
  }, []);

  return (
    <List
      //   direction="column"
      //   gap={theme.spacing(Spacings.small)}
      sx={{
        height: "100%",
        width: "100%",
        // overflow: "scroll",
        boxSizing: "border-box",
        padding: theme.spacing(Spacings.small),
      }}
    >
      {sortedPrintLocations.map((printLocation) => {
        const distance = currentLocation?.allowed
          ? getDistance(
              {
                latitude: currentLocation.lat,
                longitude: currentLocation.lon,
              },
              {
                latitude: printLocation.coordinates.latitude,
                longitude: printLocation.coordinates.longitude,
              }
            )
          : undefined;

        return (
          <ListItem
            key={printLocation.name}
            disableGutters
            sx={{ height: "70px", boxSizing: "border-box" }}
          >
            <PrintLocationCard
              name={printLocation.name}
              address={"somewhere"}
              distance={distance}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
