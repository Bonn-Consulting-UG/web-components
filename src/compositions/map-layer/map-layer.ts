import { html, property, ScopedElementsMixin } from '@lion/core';
import { BcgModule } from '../../components/module';
import { LayerData } from '../../model/LayerData';
import { mapLayerStyle } from './style-map-layer';

export class BcgMapLayer extends ScopedElementsMixin(BcgModule) {

  @property({ type: String }) overlayHeader: string = 'Overlay';
  @property({ type: Boolean }) showOverlayButton = true;
  @property({ type: Boolean }) showOverlay: boolean = false;
  @property({ type: Number }) mapHeight = 600;
  @property({ type: Array }) layers: LayerData[] = [];
  @property({ type: Array }) activeLayers: LayerData[] = [];
  // map-overlay properties
  @property({ type: String }) actionButtonLabel = 'Open Overlay';
  @property({ type: String }) overlayWidth: string = '40%';
  // mapbox properties
  @property({ type: String }) mapAccessToken: string = '';
  @property({ type: Array }) initialPosition: [number, number] = [13.4, 52.51];
  @property({ type: Number }) initialZoom = 10;
  @property({ type: Array }) maxBounds = undefined;
  @property({ type: String }) pinColor = '#9747FF';

  static get styles() {
    return [mapLayerStyle];
  }

  closeOverlay() {
    this.showOverlay = false;
  }

  render() {
    return html`
    <div style="width: 100%; height: ${this.mapHeight}px">
        <bcg-map-overlay
          class="bcg-overlay"
          mapAccessToken=${this.mapAccessToken}
          .showActionButton=${this.showOverlayButton}
          actionButtonLabel=${this.actionButtonLabel}
          .pinColor=${this.pinColor}
          .actionButtonCallback=${() => {
            this.showOverlay = true;
          }}
          .closeButtonCallback=${() => this.closeOverlay()}
          initialZoom=${this.initialZoom}
          .maxBounds=${this.maxBounds}
          .initialPosition=${this.initialPosition}
          overlayWidth=${this.overlayWidth}
          .activeLayers=${this.activeLayers}
          .showOverlay=${this.showOverlay}
        >
          <div class="overlay-content" slot="overlay-content">
            <h2>${this.overlayHeader}</h2>
            <bcg-selectable-layers
            .layers=${this.layers}
            .activeLayersChanged=${(activeLayers: LayerData[]) => {
              this.activeLayers = activeLayers;
            }}
            ></bcg-selectable-layers>
          </div>
        </bcg-map-overlay>
    </div>
    `;
  }
}
