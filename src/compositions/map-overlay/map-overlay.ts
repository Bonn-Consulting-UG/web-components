import { html, property, ScopedElementsMixin } from "@lion/core";
import { BcgModule } from "../../components/module";
import { LayerData } from "../../model/LayerData";
import { mapOverlayStyle } from './style-map-overlay';

export class BcgMapOverlay extends ScopedElementsMixin(BcgModule) {

  // settable properies
  @property({type: String}) overlayButtonLabel = 'Open Overlay';
  @property({type: Array}) layers: LayerData[] = [];
  @property({type: String}) overlayHeader: string = "Overlay";
  @property({type: String}) overlayWidth: string = "40%";
  // mapbox properties
  @property({type: String}) accessToken: string = '';
  @property({type: Array}) initialPosition: [number, number] = [13.4, 52.51];
  @property({type: Number}) initialZoom = 10;

  // internal use
  @property({type: Boolean}) showOverlay = false;
  @property({type: Array}) activeLayers: LayerData[] = [];
  @property({type: Array}) expandedCategories: string[] = [];

  static get styles() {
    return [ mapOverlayStyle ];
  }

  get categories() {
    return [...new Set(this.layers.map(layer => layer.category))];
  }

  switchCategoryExpandedState = (category: string) => {
    if (this.expandedCategories.includes(category)) {
      this.expandedCategories.splice(this.expandedCategories.indexOf(category), 1);
    } else {
      this.expandedCategories.push(category);
    }
    this.expandedCategories = [...this.expandedCategories];
  }

  render() {
    return html`
    <div class="map-wrapper">

      <bcg-interactive-map
      accessToken=${this.accessToken}
      .layerData=${this.activeLayers}
      .initialPosition=${this.initialPosition}
      .initialZoom=${this.initialZoom}
      >
      </bcg-interactive-map>

      <bcg-button class="overlay-button" variant="secondary" @click=${() => {this.showOverlay = true}}>${this.overlayButtonLabel}</bcg-button>

      ${this.showOverlay ? html`
      <div class="overlay-wrapper" style="width: ${this.overlayWidth}">
        <bcg-overlay .closeButtonCallback=${() => {this.showOverlay = false}}>
          <div class="overlay-content">
            <h2>${this.overlayHeader}</h2>
            <bcg-checkbox-group
            name="layers"
            .modelValue=${this.activeLayers}
            @model-value-changed=${(ev:any) => {
              this.activeLayers = ev.target.modelValue;
            }}>
            ${this.categories.map(category => {
              return html`
                <h4 class="category-label" @click=${() => this.switchCategoryExpandedState(category)}>
                ${category}
                <lion-icon 
                class="expand-icon"
                icon-id=${this.expandedCategories.includes(category)
                  ? 'bcg:general:collapse'
                  : 'bcg:general:expand'
                }></lion-icon>
                </h4>
                ${this.layers.filter(layer => layer.category === category && this.expandedCategories.includes(category)).map(layer => html`
                    <bcg-checkbox
                      class="layer-option"
                      .choiceValue=${layer}>
                      <span slot="label" style="position: relative">
                        <lion-icon class="layer-icon" icon-id="bcg:general:layer" style="fill: ${layer.color ?? '#0080ff'}"></lion-icon>
                        <span class="layer-label">${layer.label}</span>
                      </span>
                    </bcg-checkbox>
                `)}
                <div class="separator"></div>
              `
            })}
            </bcg-checkbox-group>
          </div>
        </bcg-overlay>
      </div>` : ''}
    </div>
    `;
  }
}
