"use client";

import MapLibreGL from "maplibre-gl";
import { createContext, useContext } from "react";

/** Map viewport state */
export type MapViewport = {
  /** Center coordinates [longitude, latitude] */
  center: [number, number];
  /** Zoom level */
  zoom: number;
  /** Bearing (rotation) in degrees */
  bearing: number;
  /** Pitch (tilt) in degrees */
  pitch: number;
};

export type MapRef = MapLibreGL.Map;

export type MapContextValue = {
  map: MapLibreGL.Map | null;
  isLoaded: boolean;
};

export const MapContext = createContext<MapContextValue | null>(null);

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a Map component");
  }
  return context;
}
