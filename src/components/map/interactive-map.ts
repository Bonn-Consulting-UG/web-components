
import { css, html, LitElement, property, PropertyValues, ScopedElementsMixin } from '@lion/core';
import { LayerData } from '../../model/LayerData';
import { BcgButton } from '../button/button';

const mapboxgl = require('mapbox-gl');

export class BcgInteractiveMap extends ScopedElementsMixin(LitElement) {

  @property({type: String}) accessToken: string = '';
  @property({type: Array}) initialPosition: [number, number] = [13.4, 52.51];
  @property({type: Number}) initialZoom = 10;
  @property({type: Array}) layerData?: LayerData[];

  map: any;

  firstUpdated() {
    this.initMap();
  }

  updated(changedProperties: PropertyValues<this>) {
    if (!changedProperties.get('layerData')) {
      return
    }

    const prevLayers = changedProperties.get('layerData');
    //console.log(this.layerData)
    let removedLayers = prevLayers?.filter((prevLayer: LayerData) => !this.layerData?.includes(prevLayer));

    removedLayers?.map((layer: LayerData) => {
      this.map.removeLayer(layer.id + '-outline');
      this.map.removeLayer(layer.id);
      this.map.removeSource(layer.id);
    })

    if (this.map.isStyleLoaded()) {
      this.addMapLayer();
    } else {
      this.map.on('load',() => {
        this.addMapLayer();
      })
    }
  }

  static get scopedElements() {
    return { 'bcg-button': BcgButton };
  }

  static get styles() {
    return css`
      #map {
        width: 100%;
        height: 100%;
      }
    `
  }

  initMap() {
    mapboxgl.accessToken = this.accessToken;
    this.map = new mapboxgl.Map({
      container: this.renderRoot.querySelector('#map') as HTMLElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.initialPosition, // starting position [lng, lat]
      zoom: this.initialZoom, // starting zoom
      });
    this.map.addControl(new mapboxgl.NavigationControl({showCompass: false}));
  }

  addMapLayer() {
    //console.log(this.layerData)
    this.layerData?.map(data => {
      if (this.map.getSource(data.id)) {
        return;
      }
      this.map.addSource(data.id, data.sourceData)
      this.map.addLayer({
        'id': data.id,
        'type': 'fill',
        'source': data.id, // reference the data source
        'layout': {},
        'paint': {
          'fill-color': data.color ?? '#0080ff', // take layer-color or blue per default
          'fill-opacity': 0.5
        }
        })
        // Add a black outline around the polygon.
        this.map.addLayer({
          'id': data.id + '-outline',
          'type': 'line',
          'source': data.id,
          'layout': {},
          'paint': {
            'line-color': '#000',
            'line-width': 3
          }
        });
    })
  }

  render() {
    return html`
      <link href='https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css' rel='stylesheet' />
      <div id='map'></div>
     `;
  }
}
