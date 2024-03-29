import { html, LitElement, property, ScopedElementsMixin } from '@lion/core';
import { LayerData } from '../../model/LayerData';
import { mapOverlayStyle } from './style-map-overlay';

export class BcgMapOverlay extends ScopedElementsMixin(LitElement) {
  // settable properies
  @property({ type: Boolean }) showActionButton = true;
  @property({ type: String }) actionButtonLabel = 'Action Button';
  @property({ type: Function }) actionButtonCallback = () => {
    this.showOverlay = true;
  };
  @property({ type: Function }) closeButtonCallback = () => {
    this.showOverlay = false;
  };
  @property({ type: String }) overlayWidth: string = '40%';
  @property({ type: Boolean }) showOverlay = false;
  // mapbox properties
  @property({ type: String }) mapAccessToken: string = '';
  @property({ type: Array }) initialPosition: [number, number] = [13.4, 52.51];
  @property({ type: Array }) activeLayers: LayerData[] = [];
  @property({ type: Array }) submissions: any[] = [];
  @property({ type: Number }) initialZoom = 10;
  @property({ type: Array }) maxBounds: any = undefined;
  @property({ type: Boolean }) enablePopup = true;
  @property({ type: Function }) geocoderInputCallback: Function = (
    input: any
  ) => {};
  @property({ type: Function }) markerSetCallback: Function = (
    marker: any
  ) => {};
  @property({ type: String }) pinColor = '#9747FF';

  static get styles() {
    return [mapOverlayStyle];
  }

  render() {
    return html`
      <div class="map-wrapper">
        ${this.showActionButton && !this.showOverlay
          ? html`
              <bcg-button
                class="action-button"
                variant="secondary"
                @click=${() => this.actionButtonCallback()}
                >${this.actionButtonLabel}</bcg-button
              >
            `
          : ``}
        ${this.showOverlay
          ? html` <div
              class="overlay-wrapper"
              style="width: ${this.overlayWidth}"
            >
              <bcg-overlay
                .closeButtonCallback=${() => this.closeButtonCallback()}
              >
                <slot name="overlay-content"></slot>
              </bcg-overlay>
            </div>`
          : ''}

        <bcg-interactive-map
          class="interactive-map"
          mapAccessToken=${this.mapAccessToken}
          .layerData=${this.activeLayers}
          .initialPosition=${this.initialPosition}
          .initialZoom=${this.initialZoom}
          .maxBounds=${this.maxBounds}
          .geocoderInputCallback=${this.geocoderInputCallback}
          .markerSetCallback=${this.markerSetCallback}
          .submissions=${this.submissions}
          .pinColor=${this.pinColor}
          .enablePopup=${this.enablePopup}
        >
        </bcg-interactive-map>
      </div>
    `;
  }
}
