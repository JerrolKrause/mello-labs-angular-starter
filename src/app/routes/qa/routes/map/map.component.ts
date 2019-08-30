import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map-route',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  public locations: Map.Location[] | undefined;
  public radius = 1;

  constructor(private http: HttpClient, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get('assets/mock-data/map-data.json').subscribe((data: any) => {
      const locations: any[] = data;
      this.locations = locations.map(location => {
        return <Map.Location>{
          metadata: {
            title: location.display_address,
            description: location.city + ' ' + location.zip_code,
          },
          latitude: location.display_lat,
          longitude: location.display_lng,
          // icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png' // Custom pin level icon
        };
      });
      this.ref.markForCheck();
    });
  }

  public viewChanged(viewProps: Map.ViewProps) {
    console.log(viewProps);
  }

  public addedPushPin(location: Microsoft.Maps.Location[]) {
    console.log(location);
  }
}
