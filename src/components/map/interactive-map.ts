import {
  css,
  html,
  LitElement,
  property,
  PropertyValues,
  ScopedElementsMixin,
} from '@lion/core';
import { SubmissionCard } from '../../compositions/submission-card/submisson-card';
import { LayerData } from '../../model/LayerData';
import { BcgButton } from '../button/button';
import { BcgCard } from '../card/card';

import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export class BcgInteractiveMap extends ScopedElementsMixin(LitElement) {
  @property({ type: String }) mapAccessToken: string = '';
  @property({ type: Array }) initialPosition: [number, number] = [13.4, 52.51];
  @property({ type: Number }) initialZoom = 10;
  @property({ type: Array }) maxBounds = undefined;
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
          // @ts-ignore
          new mapboxgl.Popup().addClassName('popup').setHTML(`
          <bcg-card>
            <slot name="content">
              <div class="content-wrapper"">
                <div class="text-container">
                  <p class="creator-text">${submission?.firstName} ${
            submission?.lastName
          }</p>
                  <p class="creator-text">${new Date(
                    submission?.createdAt ?? ''
                  ).toLocaleDateString()}</p>
                  <p class="title-text">${submission?.title}</p>
                </div>
      
                <div class="actions-container">
                  <a
                  href=${window.origin + '/' + submission?.id}
                  target="_blank">
                    <bcg-button variant="primary">Zum Hinweis</bcg-button>
                  </a>
                  <div class="reactions-container">
                    <lion-icon
                    class="comment-icon"
                    icon-id="bcg:comments:comment"
                    ></lion-icon>
                    <span style="margin-right: 20px">${
                      submission?._count?.comments
                    }</span>
                    <bcg-idea-reaction likeCount=${
                      submission?._count?.likes
                    } dislikeCount=${
            submission?._count?.dislikes
          }></bcg-idea-reaction>
                  </div>
                </div>
              </div>
            </slot>
          </bcg-card>
          `)
        )
        .addTo(this.map);
    });
  }

  static get scopedElements() {
    return {
      'bcg-button': BcgButton,
      'bcg-card': BcgCard,
    };
  }

  static get styles() {
    return [
      SubmissionCard.styles,
      css`
        #map {
          width: 100%;
          height: 100%;
        }

        .popup {
          max-width: 500px !important;
        }

        .mapboxgl-popup-content {
          padding: 0;
        }
      `,
    ];
  }

  initMap() {
    /* @ts-ignore */
    mapboxgl.accessToken = this.mapAccessToken;

    this.map = new mapboxgl.Map({
      container: this.renderRoot.querySelector('#map') as HTMLElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.initialPosition, // starting position [lng, lat]
      maxBounds: this.maxBounds,
      zoom: this.initialZoom, // starting zoom
    });
    this.map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));
    // Add the control to the map.
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      bbox: this.maxBounds
        ? [...this.maxBounds[0], ...this.maxBounds[1]]
        : undefined,
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
          marker.on('dragend', () => this.markerSetCallback(marker));
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

      this.flyToLayer(this.map.getSource(data.id)?._data);
    });
  }

  flyToLayer(layerData: any) {
    let isVisible = false;
    let centerCoordinates: any[] = [];

    if (layerData.type === 'FeatureCollection') {
      for (let i = 0; i < layerData.features.length; i++) {
        isVisible = this.isLayerVisible(
          layerData.features[i].geometry?.coordinates,
          centerCoordinates
        );
        if (isVisible) {
          break;
        }
      }
    } else {
      isVisible = this.isLayerVisible(
        layerData.geometry?.coordinates,
        centerCoordinates
      );
    }

    if (!isVisible) {
      this.map.flyTo({
        // take value in the middle (multiple values possible if it is a feature collection)
        center:
          centerCoordinates[+(centerCoordinates.length / 2).toFixed(0) - 1],
      });
    }
  }

  // returns true if Layer is visible on the Map. Optional fills an given array with the center coordinates of the layer
  isLayerVisible(coordinates: any[], centerCoordinates?: any[]): boolean {
    const bounds = this.map.getBounds();
    let res = false;
    const flatCoordinates = this.flatCoordinates(coordinates);
    let firstCoordinate = flatCoordinates[0];
    let middleCoordinate = [];

    for (let i = 0; i < flatCoordinates.length; i++) {
      if (
        flatCoordinates[i][0] > bounds._sw.lng &&
        flatCoordinates[i][1] > bounds._sw.lat &&
        flatCoordinates[i][0] < bounds._ne.lng &&
        flatCoordinates[i][1] < bounds._ne.lat
      ) {
        res = true;
        break;
      }
      if (i === flatCoordinates.length / 2) {
        middleCoordinate = flatCoordinates[i];
        centerCoordinates?.push([
          (firstCoordinate[0] + middleCoordinate[0]) / 2,
          (firstCoordinate[1] + middleCoordinate[1]) / 2,
        ]);
      }
    }
    return res;
  }

  flatCoordinates(value: any): any {
    const res: any = [];
    const func = (value: any) => {
      if (value?.[0]?.length) {
        value.map((value: any) => func(value));
      } else {
        res.push(value);
      }
    };
    func(value);
    return res;
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
