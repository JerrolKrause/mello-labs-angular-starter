// Create factories for bing map entities to remove tight coupling to 'new' keyword
export const MapObjectTypes = {
  map: (divId: string, options?: Map.Options) => new Microsoft.Maps.Map(<any>document.getElementById(divId), <any>options),
  infoBox: (location: Microsoft.Maps.Location, options?: Microsoft.Maps.IInfoboxOptions) => new Microsoft.Maps.Infobox(location, options),
  pushpin: (location: Microsoft.Maps.Location, options?: Microsoft.Maps.IPushpinOptions) => new Microsoft.Maps.Pushpin(location, options),
  location: (latitude: number, longitude: number) => new Microsoft.Maps.Location(latitude, longitude),
  heatMapLayer: (locations: (Microsoft.Maps.Location | Microsoft.Maps.Pushpin)[], options: Microsoft.Maps.IHeatMapLayerOptions) =>
    new Microsoft.Maps.HeatMapLayer(locations, options),
  polygon: (rings: Microsoft.Maps.Location[] | Microsoft.Maps.Location[][], options: Microsoft.Maps.IPolygonOptions) =>
    new Microsoft.Maps.Polygon(rings, options),
  color: (a: number, b: number, c: number, d: number) => new Microsoft.Maps.Color(a, b, c, d),
};

export const MapObjects = {
  /**
   * Add pushpins to the map
   * @param map
   * @param locations
   * @param options
   */
  pushPinAdd: (map: Microsoft.Maps.Map, locations: Map.Location[], options: Map.Options) => {
    if (locations && locations.length) {
      // Create new pushpin instances and add to map
      const pins = locations.map(loc => {
        // Options for pushpins
        const pinOptions: Microsoft.Maps.IPushpinOptions = {};
        // If custom icon specified, default to pin specific icon otherwise fallback to global icon
        if (loc.icon || options.pushPinIcon) {
          pinOptions.icon = loc.icon || options.pushPinIcon;
        }
        const pin: Microsoft.Maps.Pushpin = MapObjectTypes.pushpin(<any>loc, pinOptions);

        if (loc.metadata) {
          pin.metadata = { ...loc.metadata };
        }

        return pin;
      });
      map.entities.add(pins);
      return pins;
    }
  },

  /** Clear entities such as pushpins and circles off the map */
  removeAll: (map: Microsoft.Maps.Map) => {
    map.entities.clear();
  },

  /**
   * Draw a circle around a point
   * @param origin
   * @param radius
   * @param disUnit
   */
  circleDraw: (map: Microsoft.Maps.Map, origin: any, radius: string, disUnit: string = 'mile') => {
    let RadPerDeg = 0;
    let earthRadius = 0;

    RadPerDeg = Math.PI / 180;

    // get the earth radius based on unit
    disUnit.toLowerCase() === 'mile' ? (earthRadius = 3959) : (earthRadius = 6371);

    const lat = origin.latitude * RadPerDeg;
    const lon = origin.longitude * RadPerDeg;
    const locs = [];
    const AngDist = parseFloat(radius) / earthRadius;
    for (let x = 0; x <= 360; x++) {
      // making a 360-sided polygon
      let pLatitude, pLongitude;
      const brng = x * RadPerDeg;
      pLatitude = Math.asin(Math.sin(lat) * Math.cos(AngDist) + Math.cos(lat) * Math.sin(AngDist) * Math.cos(brng)); // still in radians
      pLongitude =
        lon + Math.atan2(Math.sin(brng) * Math.sin(AngDist) * Math.cos(lat), Math.cos(AngDist) - Math.sin(lat) * Math.sin(pLatitude));
      pLatitude = pLatitude / RadPerDeg;
      pLongitude = pLongitude / RadPerDeg;
      locs.push(MapObjectTypes.location(pLatitude, pLongitude));
    }

    // create the cirlce object
    const circle = MapObjectTypes.polygon(locs, {
      visible: true,
      strokeThickness: 4,
      strokeColor: MapObjectTypes.color(75, 0, 0, 255),
      fillColor: MapObjectTypes.color(50, 0, 255, 0),
    });

    // Add to map
    map.entities.add(circle);
    // Return for collection
    return circle;
  },

  /**
   * Refresh the circles currently on the map
   * @param map
   * @param options
   * @param entities
   */
  circlesRefresh: (map: Microsoft.Maps.Map, options: Map.Options) => {
    // Remove all circles from map
    MapObjects.entitiesGet<Microsoft.Maps.Polygon>(map, 'Polygon').forEach(entry => map.entities.remove(entry));

    // Get location of pushpin and add circle to map
    MapObjects.entitiesGet<Microsoft.Maps.Pushpin>(map, 'Pushpin').forEach(entity => {
      const location = entity.getLocation();
      if (options) {
        MapObjects.circleDraw(map, location, <any>options.pushPinRadius);
      }
    });
  },

  /**
   * Creates a heatmap layer based on location entities
   * @param map
   * @param locations
   */
  heatMapCreate: (map: Microsoft.Maps.Map, locations: Map.Location[]) => {
    // Turn lat/long into location entities
    const locationsPoints = locations.map(loc => MapObjectTypes.location(loc.latitude, loc.longitude));
    const zoom = map.getZoom();

    // Get a radius based on zoom level
    // TODO: Generate this programatically
    const radiuses = [0, 0, 0, 0, 0, 0, 0, 0, 300, 900, 2000, 3500, 7000, 10500, 15500, 30500, 60000, 90000, 120000, 120000, 120000];
    const radius = radiuses[21 - zoom];

    // Get intensity based on zoom level
    // TODO: Generate this programatically
    let intensity = 0.75;
    if (21 - zoom > 14) {
      intensity = 0.05;
    } else if (21 - zoom > 13) {
      intensity = 0.2;
    } else if (21 - zoom > 11) {
      intensity = 0.5;
    }

    // Create heatmap layer
    const heatMap = MapObjectTypes.heatMapLayer(locationsPoints, {
      intensity: intensity, // 0.5,
      radius: radius, // 10000
      unit: 'meters',
      /**
       * TODO: Allow heatmap to be customizable
      colorGradient: {
          '0': 'Black',
          '0.4': 'Purple',
          '0.6': 'Red',
          '0.8': 'Yellow',
          '1': 'White'
      },
      aggregateLocationWeights: true
     */
    });
    map.layers.insert(heatMap);
    return heatMap;
  },

  /**
   * Extract a collection of entities from the map based on type. Will be properly typed
   * @param map
   * @param type
   */
  entitiesGet: <t>(map: Microsoft.Maps.Map, type: 'Polygon' | 'Pushpin'): t[] => {
    return <any>map.entities.getPrimitives().filter(entry => entry.entity.id.split('_')[0] === type);
  },
};
