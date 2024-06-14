import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent {

  @Input() lngLat?: [number, number];

  @ViewChild('map')
  public divMap?: ElementRef;

  public currentZoom: number = 15;

  ngAfterViewInit() {
    if ( !this.divMap?.nativeElement ) throw "Map Div not found";
    if ( !this.lngLat ) throw "LngLat cant't be null";

    const map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat, // longitud, latitud
      zoom: this.currentZoom,
      interactive: false
    });

    new Marker()
      .setLngLat( this.lngLat )
      .addTo( map );
  }

}
