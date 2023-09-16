export interface PrintLocation {
  name: string;
  description?: string;
  address?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export type PrintLocationMeta = Pick<
  PrintLocation,
  "name" | "description" | "address" | "coordinates"
>;
