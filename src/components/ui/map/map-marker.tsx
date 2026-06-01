"use client";

import MapLibreGL, { type PopupOptions, type MarkerOptions } from "maplibre-gl";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMap } from "./map-context";

type MarkerContextValue = {
  marker: MapLibreGL.Marker;
  map: MapLibreGL.Map | null;
};

const MarkerContext = createContext<MarkerContextValue | null>(null);

function useMarkerContext() {
  const context = useContext(MarkerContext);
  if (!context) {
    throw new Error("Marker components must be used within MapMarker");
  }
  return context;
}

type MapMarkerProps = {
  longitude: number;
  latitude: number;
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
  onDragStart?: (lngLat: { lng: number; lat: number }) => void;
  onDrag?: (lngLat: { lng: number; lat: number }) => void;
  onDragEnd?: (lngLat: { lng: number; lat: number }) => void;
} & Omit<MarkerOptions, "element">;

function MapMarker({
  longitude, latitude, children, onClick, onMouseEnter, onMouseLeave,
  onDragStart, onDrag, onDragEnd, draggable = false, ...markerOptions
}: MapMarkerProps) {
  const { map } = useMap();
  const callbacksRef = useRef({ onClick, onMouseEnter, onMouseLeave, onDragStart, onDrag, onDragEnd });
  callbacksRef.current = { onClick, onMouseEnter, onMouseLeave, onDragStart, onDrag, onDragEnd };

  const marker = useMemo(() => {
    const m = new MapLibreGL.Marker({ ...markerOptions, element: document.createElement("div"), draggable }).setLngLat([longitude, latitude]);
    m.getElement()?.addEventListener("click", (e: MouseEvent) => callbacksRef.current.onClick?.(e));
    m.getElement()?.addEventListener("mouseenter", (e: MouseEvent) => callbacksRef.current.onMouseEnter?.(e));
    m.getElement()?.addEventListener("mouseleave", (e: MouseEvent) => callbacksRef.current.onMouseLeave?.(e));
    m.on("dragstart", () => { const l = m.getLngLat(); callbacksRef.current.onDragStart?.({ lng: l.lng, lat: l.lat }); });
    m.on("drag", () => { const l = m.getLngLat(); callbacksRef.current.onDrag?.({ lng: l.lng, lat: l.lat }); });
    m.on("dragend", () => { const l = m.getLngLat(); callbacksRef.current.onDragEnd?.({ lng: l.lng, lat: l.lat }); });
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map) return;
    marker.addTo(map);
    return () => { marker.remove(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) marker.setLngLat([longitude, latitude]);
  if (marker.isDraggable() !== draggable) marker.setDraggable(draggable);
  const currentOffset = marker.getOffset();
  const newOffset = markerOptions.offset ?? [0, 0];
  const [nx, ny] = Array.isArray(newOffset) ? newOffset : [newOffset.x, newOffset.y];
  if (currentOffset.x !== nx || currentOffset.y !== ny) marker.setOffset(newOffset);
  if (marker.getRotation() !== markerOptions.rotation) marker.setRotation(markerOptions.rotation ?? 0);
  if (marker.getRotationAlignment() !== markerOptions.rotationAlignment) marker.setRotationAlignment(markerOptions.rotationAlignment ?? "auto");
  if (marker.getPitchAlignment() !== markerOptions.pitchAlignment) marker.setPitchAlignment(markerOptions.pitchAlignment ?? "auto");

  return <MarkerContext.Provider value={{ marker, map }}>{children}</MarkerContext.Provider>;
}

function MarkerContent({ children, className }: { children?: ReactNode; className?: string }) {
  const { marker } = useMarkerContext();
  return createPortal(
    <div className={cn("relative cursor-pointer", className)}>{children || <div className="relative h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg" />}</div>,
    marker.getElement(),
  );
}

function PopupCloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label="Close popup"
      className="focus-visible:ring-ring hover:bg-muted text-foreground absolute top-0.5 right-0.5 z-10 inline-flex size-5 cursor-pointer items-center justify-center rounded-sm transition-colors focus:outline-none focus-visible:ring-2">
      <X className="size-3.5" />
    </button>
  );
}

function MarkerPopup({ children, className, closeButton = false, ...popupOptions }: {
  children: ReactNode; className?: string; closeButton?: boolean;
} & Omit<PopupOptions, "className" | "closeButton">) {
  const { marker, map } = useMarkerContext();
  const container = useMemo(() => document.createElement("div"), []);
  const prevOpts = useRef(popupOptions);
  const popup = useMemo(() => new MapLibreGL.Popup({ offset: 16, ...popupOptions, closeButton: false }).setMaxWidth("none").setDOMContent(container),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  useEffect(() => {
    if (!map) return;
    popup.setDOMContent(container);
    marker.setPopup(popup);
    return () => { marker.setPopup(null); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  if (popup.isOpen()) {
    if (prevOpts.current.offset !== popupOptions.offset) popup.setOffset(popupOptions.offset ?? 16);
    if (prevOpts.current.maxWidth !== popupOptions.maxWidth && popupOptions.maxWidth) popup.setMaxWidth(popupOptions.maxWidth ?? "none");
    prevOpts.current = popupOptions;
  }

  return createPortal(
    <div className={cn("bg-popover text-popover-foreground relative max-w-62 rounded-md border p-3 shadow-md", "animate-in fade-in-0 zoom-in-95 duration-200 ease-out", className)}>
      {closeButton && <PopupCloseButton onClick={() => popup.remove()} />}
      {children}
    </div>,
    container,
  );
}

function MarkerTooltip({ children, className, ...popupOptions }: {
  children: ReactNode; className?: string;
} & Omit<PopupOptions, "className" | "closeButton" | "closeOnClick">) {
  const { marker, map } = useMarkerContext();
  const container = useMemo(() => document.createElement("div"), []);
  const prevOpts = useRef(popupOptions);
  const tooltip = useMemo(() => new MapLibreGL.Popup({ offset: 16, ...popupOptions, closeOnClick: true, closeButton: false }).setMaxWidth("none"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  useEffect(() => {
    if (!map) return;
    tooltip.setDOMContent(container);
    const enter = () => { tooltip.setLngLat(marker.getLngLat()).addTo(map); };
    const leave = () => tooltip.remove();
    marker.getElement()?.addEventListener("mouseenter", enter);
    marker.getElement()?.addEventListener("mouseleave", leave);
    return () => {
      marker.getElement()?.removeEventListener("mouseenter", enter);
      marker.getElement()?.removeEventListener("mouseleave", leave);
      tooltip.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  if (tooltip.isOpen()) {
    if (prevOpts.current.offset !== popupOptions.offset) tooltip.setOffset(popupOptions.offset ?? 16);
    if (prevOpts.current.maxWidth !== popupOptions.maxWidth && popupOptions.maxWidth) tooltip.setMaxWidth(popupOptions.maxWidth ?? "none");
    prevOpts.current = popupOptions;
  }

  return createPortal(
    <div className={cn("bg-foreground text-background pointer-events-none rounded-md px-2 py-1 text-xs text-balance shadow-md", "animate-in fade-in-0 zoom-in-95 duration-200 ease-out", className)}>
      {children}
    </div>,
    container,
  );
}

export { MapMarker, MarkerContent, MarkerPopup, MarkerTooltip, PopupCloseButton };
