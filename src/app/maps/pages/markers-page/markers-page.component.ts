import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  @ViewChild('map')
  public divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;

  public currentCenter: LngLat = new LngLat(-74.08490380795395, 4.652029206169971); // Expresado en longitud y latitud

  ngAfterViewInit(): void {
    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentCenter, // longitud, latitud
      zoom: 13
    });

    this.readFromLocalStorage();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Pedro Umiri';

    // const marker = new Marker({
    //    Podríamos cambiar de color aca adentro o pasarle un elemento html
    //    color: 'blue'
    //   element: markerHtml
    // })
    //   .setLngLat( this.currentCenter )
    //   .addTo( this.map );
  }

  createMarker() {
    if ( !this.map ) return;

    const color: string = '#xxxxxx'.replace(/x/g, y =>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker( lngLat, color);
  }

  addMarker( lngLat: LngLat, color: string ) {
    // si no existe el mapa, no agrego ningún marcador
    if ( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo( this.map );

    this.markers.push({ color, marker });
    this.saveToLocalStorage();

    // Cuando se termina de mover un marcador, actualizamos el localstorage
    marker.on('dragend', () => this.saveToLocalStorage());
  }

  deleteMarker( index: number ) {
    // Eliminamos el marcador del mapa
    this.markers[index].marker.remove();

    // Eliminamos el marcador del array
    this.markers.splice( index, 1 );
  }

  flyTo( marker: Marker ) {
    this.map?.flyTo({
      zoom:14,
      center: marker.getLngLat()
    });
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString );

    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat );

      this.addMarker( coords, color );
    });
  }

}
