import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  public divMap?: ElementRef;

  public currentZoom: number = 10;

  public map?: Map;

  public currentCenter: LngLat = new LngLat(-74.08490380795395, 4.652029206169971); // Expresado en longitud y latitud

  ngAfterViewInit(): void {
    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentCenter, // longitud, latitud
      zoom: this.currentZoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    // Limpiamos los listeners y el mapa
    this.map?.remove();
  }

  mapListeners() {
    if ( !this.map ) throw 'Mapa no inicializado';

    this.map.on('zoom', (event) => {
      this.currentZoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (event) => {
      if ( this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', (event) => {
      this.currentCenter = this.map!.getCenter();
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }

   zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged( value: string) {
    this.currentZoom = Number(value);
    this.map?.zoomTo( this.currentZoom );
  }

}
