export interface LayerData {
  id: string,
  category: string,
  label: string,
  color?: string,
  sourceData: mapboxgl.GeoJSONSourceRaw
}