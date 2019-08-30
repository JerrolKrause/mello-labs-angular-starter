export const MapView = {
  /**
   * Resize the viewport to contain all the push pins
   * @param map
   * @param locations
   */
  viewPortUpdate: (map: Microsoft.Maps.Map, locations: Map.Location[]) => {
    // Get the viewport dimensions
    const bestView = Microsoft.Maps.LocationRect.fromLocations(<any>locations);
    // Now resize
    map.setView({ bounds: bestView });
  },
  /**
   * Get the view properties of the current map
   * @param map
   */
  viewPropsUpdate: (map: Microsoft.Maps.Map) => {
    const props: any = map.getBounds(); // getBounds not properly typed
    return <Map.ViewProps>{
      zoom: map.getZoom(),
      center: props.center,
      bounds: props.bounds,
    };
  },

  /**
   * When the view of the map changes such as scrolling or zooming
   * map: Microsoft.Maps.Map, viewPropsCurrent: Map.ViewProps, heatMapLayer: Microsoft.Maps.HeatMapLayer
   */
  viewChange: (map: Microsoft.Maps.Map, viewPropsCurrent: Map.ViewProps) => {
    // Get the latest view properties
    let viewPropsNew = MapView.viewPropsUpdate(map);

    // If the view change event was a zoom
    if (viewPropsCurrent.zoom !== viewPropsNew.zoom) {
      // Update viewprops to indicate a zoom was performed
      viewPropsNew = {
        ...viewPropsNew,
        didZoom: true,
      };
    }

    // If the view change event was a scroll
    if (
      viewPropsNew &&
      viewPropsNew.center &&
      viewPropsCurrent.center &&
      (viewPropsCurrent.center.latitude !== viewPropsNew.center.latitude ||
        viewPropsCurrent.center.longitude !== viewPropsNew.center.longitude)
    ) {
      // Update viewprops to indicate a scroll was performed
      viewPropsNew = {
        ...viewPropsNew,
        didScroll: true,
      };
    }

    return viewPropsNew;
  },
};
