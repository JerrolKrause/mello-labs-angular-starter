import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  AfterViewInit,
  ViewEncapsulation,
  OnChanges,
} from '@angular/core';
import { Map, Marker } from 'mapbox-gl';
import { MapObjectsService } from '../services/map-objects.service';

const scriptSrc = 'https://api.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.js';
const apiKey = 'pk.eyJ1Ijoicm9ndXNlciIsImEiOiJjanB1YzFrMmwwZjZnNDNxbGkwY28wdnI5In0.Xe4QgRnvsvP3WAncobSxqg';

@Component({
  selector: 'app-map-mapbox',
  templateUrl: './map-mapbox.component.html',
  styleUrls: ['../../../../../node_modules/mapbox-gl/dist/mapbox-gl.css', './map-mapbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MapObjectsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapMapboxComponent implements OnInit, AfterViewInit, OnChanges {
  /** Any locations such as pushpins or circles */
  @Input() locations: Map.Location[];
  /** Mapbox Api key */
  @Input() apiKey = apiKey;

  @Input() zoom = 16;

  @Input() heatmap = true;

  /** Has script loaded  */
  public isLoaded = false;
  /** Map reference */
  public map: Map;

  /** Randomly generated uniqueID for the div that holds the map. Allows for multiple map per page  */
  public uniqueId = 'map-box' + Math.floor(Math.random() * 1000000);

  private isRotating = true;
  /** Holds a reference to any created markers. Used to remove */
  private markers: Marker[];

  constructor(private mapObjects: MapObjectsService) {}

  ngOnInit() {}

  ngOnChanges(model: any) {
    // If locations change
    if (model.locations && this.isLoaded) {
      this.isRotating = false;
      if (this.heatmap) {
        this.heatMapAdd();
      } else {
        this.locationsAdd();
      }
    }

    // If heatmap toggle changes
    if (model.heatmap) {
      if (this.heatmap) {
        this.heatMapAdd();
      } else {
        this.heatMapRemove();
      }
    }
  }

  ngAfterViewInit() {
    this.scriptsLoad();
  }

  /**
   * Check if map js is loaded, if not, load it then initialize the map in this component
   */
  public scriptsLoad() {
    if ((<any>window).mapboxgl) {
      this.mapInit(); // Bing already loaded, init map
      this.isLoaded = true;
    } else {
      // Dynamically load bing js
      const script = document.createElement('script');
      script.type = 'text/javascript';
      // Callback query param will fire after bing maps successfully loads
      script.src = scriptSrc;
      script.onload = () => {
        this.mapInit();
        this.isLoaded = true;
      }; // After load, init chart
      document.head.appendChild(script);
    }
  }

  /**
   * Create the map and set intial view and properties
   */
  private mapInit() {
    if (!this.map && document.getElementById(this.uniqueId)) {
      (<any>window).mapboxgl.accessToken = this.apiKey;
      // Get user's lat long to set initial position
      navigator.geolocation.getCurrentPosition(
        val => {
          // Confirm that lat and long were passed
          this.mapCreate([val.coords.longitude, val.coords.latitude]);
        },
        error => {
          console.log(error);
          this.mapCreate([-115.172813, 36.114647]);
        },
      );
    }
  }

  /**
   * Create the map after getting user coords
   * @param coords
   */
  private mapCreate(coords: [number, number]) {
    // Create new map
    this.map = new (<any>window).mapboxgl.Map({
      container: this.uniqueId,
      style: 'mapbox://styles/mapbox/streets-v9', // basic-v9
      zoom: this.zoom,
      center: coords,
      // For rotation
      // zoom: 15.5,
      pitch: 65,
      // center: [-114.9775958, 36.0080202],
    });

    // When the map finishes loading
    this.map.on('load', () => {
      this.rotateTo(0);
      // If heatmap is true and locations are supplied
      if (this.heatmap && this.locations) {
        this.mapObjects.heatMapAdd(this.map, this.locations);
      }

      // If heatmap not specified, add locations
      if (!this.heatmap) {
        this.locationsAdd();
      }

      // If no locations supplied on map create, plot the user's current location
      if (!this.locations) {
        // Create location
        const myLocation: Map.Location = {
          latitude: coords[1],
          longitude: coords[0],
        };
        this.locations = [myLocation];
        this.locationsAdd();
      }

      // Add 3d buildings and remove label layers to enhance the map
      const layers = this.map.getStyle().layers;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && (<any>layers)[i].layout['text-field']) {
          // remove text labels
          this.map.removeLayer(layers[i].id);
        }
      }

      // Add 3D layer
      this.map.addLayer({
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        // minzoom: 15,
        paint: {
          'fill-extrusion-color': '#aaa',
          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']],
          'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height']],
          'fill-extrusion-opacity': 0.6,
        },
      });
      // End 3d layer
    });
  }

  /**
   * Add the heatmap
   */
  private heatMapAdd() {
    // Remove any markers/locations on the map
    this.locationsRemove();
    // Remove any preexisting heatmap
    this.heatMapRemove();
    // Add existing heatmap
    this.mapObjects.heatMapAdd(this.map, this.locations);
    // Create map makers but do NOT add them to the map
    this.markers = this.mapObjects.markersCreate(this.locations);
    // Pass map markers to fit bounds to recenter the map on the heatmap
    this.mapObjects.mapFitBounds(this.map, this.markers);
  }

  /**
   * Remove existing heatmap
   */
  private heatMapRemove() {
    this.mapObjects.heatMapRemove(this.map);
  }

  /**
   * Add locations to the map
   */
  private locationsAdd() {
    // If locations passed, add markers
    if (this.locations && this.locations.length) {
      // Remove any existing markers
      this.locationsRemove();
      // Create markers
      this.markers = this.mapObjects.markersCreate(this.locations);
      // Add markers to map
      this.mapObjects.markersAdd(this.map, this.markers);
      // Recenter and zoom map to fit markers
      this.mapObjects.mapFitBounds(this.map, this.markers);
    } else {
      this.locationsRemove();
    }
  }

  /** Remove all created markers */
  private locationsRemove() {
    if (this.markers && this.markers.length) {
      this.markers.forEach(marker => marker.remove());
    }
  }

  /**
   * Slowly rotate the map
   * https://www.mapbox.com/mapbox-gl-js/example/animate-camera-around-point/
   */
  private rotateTo = (timestamp: number) => {
    // clamp the rotation between 0 -360 degrees
    // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
    this.map.rotateTo((timestamp / 300) % 360, { duration: 0 });
    if (this.isRotating) {
      // Request the next frame of the animation.
      requestAnimationFrame(this.rotateTo);
    }
  }

}
