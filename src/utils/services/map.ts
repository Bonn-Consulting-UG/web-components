import { BcgMapSingleSubmission } from "../../compositions/map-single-submission/map-single-submission";
import { BcgMapSubmission } from "../../compositions/map-submission/map-submission";
import { getReverseGeocodingEndpoint } from "./config";

export class MapService {

  private mapInstance: BcgMapSubmission | BcgMapSingleSubmission;

  constructor(mapInstance: BcgMapSubmission | BcgMapSingleSubmission) {
    this.mapInstance = mapInstance;
  }

  assignGeocoder() {
    const wrapperElement = this.mapInstance.renderRoot.querySelector('.wrapper');
    if (!this.mapInstance.geocoder) {
      this.mapInstance.geocoder = this.mapInstance.renderRoot
        .querySelector('.bcg-overlay')
        ?.shadowRoot?.querySelector('.interactive-map')
        ?.shadowRoot?.querySelectorAll('.mapboxgl-ctrl-geocoder')[0];
      if (this.mapInstance.geocoder) {
        wrapperElement?.appendChild(this.mapInstance.geocoder);
      }
    }
  
    const geocoderContainer = this.mapInstance.renderRoot.querySelector(
      '.geocoder-container'
    );
  
    if (geocoderContainer && this.mapInstance.geocoder) {
      if (!geocoderContainer.hasChildNodes()) {
        geocoderContainer.appendChild(this.mapInstance.geocoder);
        (this.mapInstance.geocoder as HTMLElement).style.visibility = 'visible';
      } else if (!this.mapInstance.showOverlay) {
        wrapperElement?.appendChild(this.mapInstance.geocoder);
        (this.mapInstance.geocoder as HTMLElement).style.visibility = 'hidden';
      }
    }
  }

  removeCurrentMarker() {
    if (!this.mapInstance.currentMarker) {
      return;
    }
    this.mapInstance.currentMarker.remove();
    this.mapInstance.currentMarker = undefined;
    this.mapInstance.currentMapSubmission.points = [];
  }
  
  clearGeocoder() {
    this.mapInstance.currentMapSubmission.points = [];
    this.mapInstance.currentGeocoderInput = undefined;
    (
      this.mapInstance.geocoder.querySelector(
        '.mapboxgl-ctrl-geocoder--button'
      ) as HTMLButtonElement
    )?.click();
  }

  handleGeocoderInput(input: any) {
    this.mapInstance.currentGeocoderInput = input;
    this.removeCurrentMarker();
    this.mapInstance.currentMarker = undefined
    this.mapInstance.currentAdress = '';
    this.mapInstance.currentMapSubmission.points = [
      {
        longitude: input.result.center[0],
        latitude: input.result.center[1],
      },
    ];
  }

  async handleMarkerInput (marker: any) {
    this.mapInstance.currentMarker = marker;
    // reverse geocoding
    const resp = await fetch(
      getReverseGeocodingEndpoint(marker.getLngLat().lng, marker.getLngLat().lat, this.mapInstance.mapAccessToken)
    )
    resp.json().then(res => {
      this.mapInstance.currentAdress = res.features[0].place_name;
    });
    this.clearGeocoder();
  
    this.mapInstance.currentMapSubmission.points = [
      {
        longitude: marker.getLngLat().lng,
        latitude: marker.getLngLat().lat,
      },
    ];
  }

  resetCurrentSubmission() {
    this.clearGeocoder();
    this.removeCurrentMarker();
    this.mapInstance.currentMapSubmission = {
      description: '',
      lastName: '',
      title: '',
      email: '',
      firstName: '',
      points: [],
    };
    if (this.mapInstance instanceof BcgMapSubmission) {
      this.mapInstance.privacyChecked = false;
    }
  }
}