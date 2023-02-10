import { html, LitElement, property } from '@lion/core';
import mapboxgl from 'mapbox-gl';

export class BcgInteractiveMap extends LitElement {
  
  @property({type: String}) selected = '';

  constructor() {
    super();
    console.log(mapboxgl)
    //new m.Map();
    //m.accessToken = 'pk.eyJ1IjoiY2hhbXBlbHRhIiwiYSI6ImNsZHN4M3hybzB3cWgzb3BmZTR5dTR4NGUifQ.1GA4l71P0Kl9a58_3ciLXg';
  }

  async fetchMap() {
    //const resp = await fetch('https://api.mapbox.com/isochrone/v1/mapbox/cycling/-74.05079326242313%2C40.77896963473364?contours_minutes=10&contours_colors=54278f&polygons=true&denoise=1&access_token=pk.eyJ1IjoiY2hhbXBlbHRhIiwiYSI6ImNsZHN4M3hybzB3cWgzb3BmZTR5dTR4NGUifQ.1GA4l71P0Kl9a58_3ciLXg');
    //mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbXBlbHRhIiwiYSI6ImNsZHN4M3hybzB3cWgzb3BmZTR5dTR4NGUifQ.1GA4l71P0Kl9a58_3ciLXg';
    /*const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      });*/
    //console.log(resp)
  }

  render() {
    return html`
      <div id='map' style='width: 400px; height: 300px;'></div>
      <div>Interactive Map component works!</div>
     `;
  }
}
