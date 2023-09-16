import { DeckGL, DeckGLRef } from "@deck.gl/react/typed";
import { WebMercatorViewport, MapViewState } from "@deck.gl/core/typed";
import { ScatterplotLayer } from "@deck.gl/layers/typed";
import MapGL, { MapRef } from "react-map-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@printed/design-system";
import { getBounds } from "geolib";

type Dataset<T> = {
  data: T[];
  getLocation?: (d: T) => [number, number];
};

type Props<T> = {
  dataSets?: Dataset<T>[];
  overlays?: (style: React.CSSProperties) => React.ReactNode;
};

export function PrintMap<T>({ dataSets, overlays }: Props<T>) {
  const [viewState, setViewState] = useState<MapViewState>({
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  });

  const deckRef = useRef<DeckGLRef>(null);
  const mapRef = useRef<MapRef>(null);

  const geoExtent = useMemo(
    () =>
      dataSets
        ? getBounds(
            dataSets.flatMap((ds) =>
              ds.data.flatMap((d) => {
                const coords = ds.getLocation?.(d);

                if (!coords) {
                  return [];
                }

                return { latitude: coords[1], longitude: coords[0] };
              })
            )
          )
        : undefined,
    [dataSets]
  );

  const renderedOverlays = useMemo(
    () => overlays?.({ pointerEvents: "all" }),
    [overlays]
  );

  const layers = useMemo(
    () =>
      dataSets?.flatMap((ds) => {
        const locationGetter = ds.getLocation;
        if (!locationGetter) {
          return [];
        }

        return new ScatterplotLayer({
          data: ds.data,
          radiusUnits: "meters",
          getRadius: 800,
          radiusMinPixels: 2,
          radiusMaxPixels: 5,
          stroked: true,
          getLineColor: [0, 0, 0],
          getLineWidth: 2,
          lineWidthUnits: "pixels",
          getFillColor: [0, 230, 230],
          getPosition: locationGetter,
        });
      }),
    [dataSets]
  );

  useEffect(() => {
    if (geoExtent) {
      const viewport = new WebMercatorViewport().fitBounds([
        [geoExtent.maxLng, geoExtent.minLat],
        [geoExtent.minLng, geoExtent.maxLat],
      ]);

      console.log(viewport);
      setViewState({
        latitude: viewport.latitude,
        longitude: viewport.longitude,
        zoom: viewport.zoom,
      });
    }
  }, [geoExtent]);

  return (
    <Box style={{ width: "100%", height: "100%", position: "relative" }}>
      <DeckGL
        ref={deckRef}
        layers={layers}
        viewState={viewState}
        onViewStateChange={(vs) => setViewState(vs.viewState as MapViewState)}
        controller={true}
      >
        <Box
          position="absolute"
          height="100%"
          width="100%"
          display="flex"
          left={0}
          top={0}
          // zIndex={100}
          onClick={(e) => e.stopPropagation()}
          sx={{ pointerEvents: "none" }}
        >
          {renderedOverlays}
        </Box>
        <MapGL
          projection={{ name: "mercator" }}
          ref={mapRef}
          trackResize
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          mapboxAccessToken="pk.eyJ1IjoicGF1bGxjIiwiYSI6ImNsa2MwbW1qdDBrYmEzZWxzNjdsYW1xZHIifQ.UWBPD7tLale1QNeDM3dP0w"
        />
      </DeckGL>
    </Box>
  );
}
