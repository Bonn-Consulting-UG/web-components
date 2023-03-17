import {
  css,
  html,
  LitElement,
  property,
  PropertyValues,
  ScopedElementsMixin,
} from '@lion/core';
import { MapMouseEvent } from 'mapbox-gl';
import { LayerData } from '../../model/LayerData';
import { BcgButton } from '../button/button';

const mapboxgl = require('mapbox-gl');
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

export class BcgInteractiveMap extends ScopedElementsMixin(LitElement) {
  @property({ type: String }) accessToken: string = '';
  @property({ type: Array }) initialPosition: [number, number] = [13.4, 52.51];
  @property({ type: Number }) initialZoom = 10;
  @property({ type: Array }) layerData?: LayerData[];
  @property({ type: Array }) submissions: any[] = [];
  @property({ type: Function }) geocoderInputCallback: Function = (
    input: any
  ) => {};
  @property({ type: Function }) markerSetCallback: Function = (
    marker: any
  ) => {};
  @property({ type: String }) pinColor = '#9747FF';

  map: any;
  isSettingMarker = false;

  firstUpdated() {
    this.initMap();
  }

  updated(changedProperties: PropertyValues<this>) {
    this.updateLayers(changedProperties.get('layerData'));
    this.updateSubmissions(changedProperties.get('submissions'));
    super.updated(changedProperties);
  }

  updateLayers(prevLayers?: LayerData[]) {
    if (!prevLayers) {
      return;
    }
    let removedLayers = prevLayers?.filter(
      (prevLayer: LayerData) => !this.layerData?.includes(prevLayer)
    );

    removedLayers?.map((layer: LayerData) => {
      this.map.removeLayer(layer.id + '-outline');
      this.map.removeLayer(layer.id);
      this.map.removeSource(layer.id);
    });

    if (this.map.isStyleLoaded()) {
      this.addMapLayer();
    } else {
      this.map.on('load', () => {
        this.addMapLayer();
      });
    }
  }

  updateSubmissions(prevSubmissions?: any[]) {
    if (!prevSubmissions) {
      return;
    }
    const newSubmissions = this.submissions.filter(
      (sub: any) => !prevSubmissions.includes(sub)
    );
    newSubmissions.map(submission => {
      new mapboxgl.Marker()
        .setLngLat([
          submission.points[0].longitude,
          submission.points[0].latitude,
        ])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
        <div>
          <h1>${submission.title}</h1>
          <p>${submission.description}</p>
        </div>
        `)
        )
        .addTo(this.map);
    });
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
    `;
  }

  initMap() {
    mapboxgl.accessToken = this.accessToken;
    this.map = new mapboxgl.Map({
      container: this.renderRoot.querySelector('#map') as HTMLElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.initialPosition, // starting position [lng, lat]
      zoom: this.initialZoom, // starting zoom
    });
    this.map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));
    // Add the control to the map.
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    this.map.addControl(geocoder);
    if (this.map.on) {
      this.map.on('mouseover', (e: any) => {
        if (this.isSettingMarker) {
          const marker = new mapboxgl.Marker({
            color: this.pinColor,
            draggable: true,
          })
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(this.map);
          this.markerSetCallback(marker);
          this.isSettingMarker = false;
        }
      });
    }
    // hide geocoder input
    (
      this.renderRoot.querySelector('.mapboxgl-ctrl-geocoder') as HTMLElement
    ).style.visibility = 'hidden';
    geocoder.on('result', (input: any) => this.geocoderInputCallback(input));
  }

  addMapLayer() {
    this.layerData?.map(data => {
      if (this.map.getSource(data.id)) {
        return;
      }
      this.map.addSource(data.id, data.sourceData);
      this.map.addLayer({
        id: data.id,
        type: 'fill',
        source: data.id, // reference the data source
        layout: {},
        paint: {
          'fill-color': data.color ?? '#0080ff', // take layer-color or blue per default
          'fill-opacity': 0.5,
        },
      });
      // Add a black outline around the polygon.
      this.map.addLayer({
        id: data.id + '-outline',
        type: 'line',
        source: data.id,
        layout: {},
        paint: {
          'line-color': '#000',
          'line-width': 3,
        },
      });
    });
  }

  render() {
    return html`
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css"
        type="text/css"
      />
      <div
        @drop=${(e: any) => {
          e.preventDefault();
          this.isSettingMarker = true;
        }}
        @dragover=${(e: any) => e.preventDefault()}
        id="map"
        style="width: 100%; height: 100%;"
      ></div>
    `;
  }
}
