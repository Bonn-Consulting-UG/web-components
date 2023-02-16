import { html, LitElement, property } from '@lion/core';
import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxgl = require('mapbox-gl');

export class BcgInteractiveMap extends LitElement {
  @property({ type: String }) selected = '';

  firstUpdated() {
    this.fetchMap();
  }

  async fetchMap() {
    //const resp = await fetch('https://api.mapbox.com/isochrone/v1/mapbox/cycling/-74.05079326242313%2C40.77896963473364?contours_minutes=10&contours_colors=54278f&polygons=true&denoise=1&access_token=pk.eyJ1IjoiY2hhbXBlbHRhIiwiYSI6ImNsZHN4M3hybzB3cWgzb3BmZTR5dTR4NGUifQ.1GA4l71P0Kl9a58_3ciLXg');
    const map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiY2hhbXBlbHRhIiwiYSI6ImNsZHN4M3hybzB3cWgzb3BmZTR5dTR4NGUifQ.1GA4l71P0Kl9a58_3ciLXg',
      container: this.renderRoot.querySelector('#map') as HTMLElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

  render() {
    return html`
      <div id="map" style="width: 400px; height: 300px;"></div>
      <div>Interactive Map component works!</div>
    `;
  }
}
