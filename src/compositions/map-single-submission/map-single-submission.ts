import { html, property, ScopedElementsMixin } from '@lion/core';
import { BcgModule } from '../../components/module';
import { getSubmissionsEndpoint } from '../../utils/services/config';
import { mapSubmissionStyle } from '../map-submission/style-map-submission';
import { MapService } from '../../utils/services/map';
import { MapSubmission } from '../../model/MapSubmission';
import { mapSingleSubmissionStyle } from './style-map-single-submission';

export class BcgMapSingleSubmission extends ScopedElementsMixin(BcgModule) {
  // settable properties
  @property({ type: Number }) mapHeight = 600;
  @property({ type: Object }) submission: any;

  // mapbox properties
  @property({ type: String }) mapAccessToken: string = '';
  @property({ type: Array }) initialPosition: [number, number] = [13.4, 52.51];
  @property({ type: Number }) initialZoom = 10;
  @property({ type: Array }) maxBounds = undefined;
  @property({ type: String }) pinColor = '#9747FF';

  @property({ type: String }) overlayWidth: string = '30%';
  @property({ type: String }) actionButtonLabel = 'Position bearbeiten';

  // internal use
  @property({ type: Object }) currentMapSubmission: MapSubmission = {
    points: [],
  };
  @property({ type: Object }) currentGeocoderInput: any;
  @property({ type: Boolean }) showOverlay: boolean = false;
  @property({ type: Object }) currentMarker: any;
  @property({ type: String }) currentAdress: string = '';
  geocoder: any;
  mapService: MapService = new MapService(this);

  static get scopedElements() {
    return {};
  }

  static get styles() {
    return [mapSingleSubmissionStyle, mapSubmissionStyle];
  }

  firstUpdated(changed: any) {
    if (!this.submission) {
      this.fetchSubmission().then(res => {
        this.submission = res;
      });
    }
    super.firstUpdated(changed);
  }

  async fetchSubmission() {
    try {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken')
            ? `Bearer ${localStorage.getItem('accessToken')}`
            : '',
        },
      };

      const resp = await fetch(
        getSubmissionsEndpoint(this.submissionId),
        fetchOptions
      );

      return resp.json();
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  updated(changed: any) {
    this.mapService.assignGeocoder();
    super.updated(changed);
  }

  async submitChangedPosition() {
    this.isLoading = true;
    try {
      const fetchOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken')
            ? `Bearer ${localStorage.getItem('accessToken')}`
            : '',
        },
        body: JSON.stringify({
          moduleId: this.submission.moduleId,
          description: this.submission.description,
          points: this.currentMapSubmission.points,
        }),
      };

      const resp = await fetch(
        getSubmissionsEndpoint(this.submissionId),
        fetchOptions
      );
      resp.json().then(() => {
        this.fetchSubmission().then(res => {
          this.closeOverlay();
          this.isLoading = false;
          this.submission = res;
        });
      });
    } catch (err) {
      this.isLoading = false;
      console.error(err);
      return err;
    }
  }

  closeOverlay() {
    this.showOverlay = false;
    this.mapService.resetCurrentSubmission();
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
      <div class="wrapper">
        <div class="map-wrapper" style="height: ${this.mapHeight}px">
          <bcg-map-overlay
            class="bcg-overlay"
            mapAccessToken=${this.mapAccessToken}
            .pinColor=${this.pinColor}
            actionButtonLabel=${this.actionButtonLabel}
            initialZoom=${this.initialZoom}
            .showActionButton=${this.isLoggedIn &&
            (this.hasModeratorRole ||
              this.submission?.authorId === this.user.sub)}
            .actionButtonCallback=${() => (this.showOverlay = true)}
            .closeButtonCallback=${() => this.closeOverlay()}
            .maxBounds=${this.maxBounds}
            .initialPosition=${this.submission
              ? [
                  this.submission?.points[0]?.longitude,
                  this.submission?.points[0]?.latitude,
                ]
              : this.initialPosition}
            .submissions=${[this.submission]}
            .overlayWidth=${this.overlayWidth}
            .showOverlay=${this.showOverlay}
            .enablePopup=${false}
            .geocoderInputCallback=${(input: any) => {
              this.mapService.handleGeocoderInput(input);
            }}
            .markerSetCallback=${(marker: any) => {
              this.mapService.handleMarkerInput(marker);
            }}
          >
            <div class="overlay-content" slot="overlay-content">
              ${this.isLoading
                ? html` <bcg-progress></bcg-progress>`
                : html`
                <h3>Standort auswählen</h3>
                <h4>Ort suchen</h4>
                <div class="geocoder-container"></div>
                <span class="place-marker-section">
                  <h4>Option 2: Pin setzen<h4>
                  <div class="pin-container">
                    ${
                      !this.currentMarker
                        ? html`
                            <lion-icon
                              draggable="true"
                              @dragstart=${() => {}}
                              class="marker-icon"
                              style="fill: ${this.pinColor}"
                              icon-id="bcg:general:marker"
                            ></lion-icon>
                          `
                        : html`<div style="width:27px"></div>`
                    }
                    <span class="pin-text">Platzieren Sie diesen Pin durch Ziehen und Ablegen an der von Ihnen gewählten Position auf der Karte</span>
                  </div>
                  <div class="current-marker-info">
                    ${
                      this.currentMarker
                        ? html` <p class="pin-info-text">
                              ${this.currentAdress}
                            </p>
                            <span class="pin-info-text"
                              >[ Lng:
                              ${this.currentMapSubmission.points[0]?.longitude?.toFixed(
                                4
                              )},
                              Lat:
                              ${this.currentMapSubmission.points[0]?.latitude?.toFixed(
                                4
                              )}
                              ]
                            </span>`
                        : ``
                    }
                  </div>
                </span>

                <bcg-button
                class="update-button"
                variant="primary"
                .disabled=${!this.currentMarker && !this.currentGeocoderInput}
                @click=${() => this.submitChangedPosition()}
                type="button">
                  Position Aktualisieren
                </bcg-button>
              `}
            </div>
          </bcg-map-overlay>
        </div>
      </div>
    `;
  }
}
