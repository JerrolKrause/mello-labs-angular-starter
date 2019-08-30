import { MapObjects, MapObjectTypes } from './map.objects';

export const MapEvents = {
  /**
   * When a pushpin is clicked, show the infobox
   * @param e
   */
  pushpinClicked: (e: any) => {
    // : Microsoft.Maps.IMouseEventArgs
    // Make sure the infobox has metadata to display.
    if (e.targetType === 'pushpin') {
      const pin: Microsoft.Maps.Pushpin = e.target;
      return <Microsoft.Maps.IInfoboxOptions>{
        location: pin.getLocation(),
        title: pin.metadata.title + 'Test',
        description: pin.metadata.description,
        visible: true,
      };
    }
  },

  infoBoxEvent: (pins: Microsoft.Maps.Pushpin[], infoBox: Microsoft.Maps.Infobox) => {
    if (pins && pins.length) {
      // If metadata available, add to pin and add infobox click event
      pins.forEach(pin => {
        if (pin.metadata) {
          Microsoft.Maps.Events.addHandler(pin, 'click', (e: Microsoft.Maps.IMouseEventArgs) => {
            if (MapEvents && e) {
              infoBox.setOptions(<any>MapEvents.pushpinClicked(e));
            }
          });
        }
      });
    }
  },

  /**
   * On a map click event, add a pushpin on the clicked location
   * @param e
   * @param map
   * @param type
   */
  mapClickEvent: (e: Microsoft.Maps.IMouseEventArgs, map: Microsoft.Maps.Map, options: Map.Options) => {
    // If pushpin type is set to single, clear out all other pins
    if (options.pushPinsAddable === 'single') {
      MapObjects.removeAll(map);
    }
    // Options for pushpins
    const pinOptions: Microsoft.Maps.IPushpinOptions = {};
    // If custom icon specified
    if (options.pushPinIcon) {
      pinOptions.icon = options.pushPinIcon;
    }

    // Create new pushpin
    const pushpin = MapObjectTypes.pushpin(e.location, pinOptions);
    map.entities.add(pushpin);

    if (options.pushPinRadius) {
      MapObjects.circleDraw(map, e.location, options.pushPinRadius);
    }

    return MapObjects.entitiesGet<Microsoft.Maps.Pushpin>(map, 'Pushpin');
  },
};
