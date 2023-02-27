import { html, property, ScopedElementsMixin, TemplateResult } from "@lion/core";
import { LionStep, LionSteps } from "@lion/steps";
import { LionTabs } from "@lion/tabs";
import { BcgModule } from "../../components/module";
import { LayerData } from "../../model/LayerData";
import { mapSubmissionStyle } from './style-map-submission';

const mapboxgl = require('mapbox-gl');

export class BcgMapSubmission extends ScopedElementsMixin(BcgModule) {

  // settable properties
  @property({type: String}) overlayHeader: string = "Overlay";
  @property({type: Array}) layers: LayerData[] = [];

  // map-overlay properties
  @property({type: String}) actionButtonLabel = 'Open Overlay';
  @property({type: String}) overlayWidth: string = "40%";
  // mapbox properties
  @property({type: String}) accessToken: string = '';
  @property({type: Array}) initialPosition: [number, number] = [13.4, 52.51];
  @property({type: Number}) initialZoom = 10;
  @property({type: String}) pinColor = '#9747FF';

  // internal use
  @property({type: Array}) activeLayers: LayerData[] = [];
  @property({type: Array}) expandedCategories: string[] = [];
  @property({type: Boolean}) showOverlay: boolean = false;
  @property({type: Boolean}) showLayerContent: boolean = true;
  @property({type: Object}) currentMarker: any;
  @property({type: Object}) currentGeocoderInput: any;

  @property({type: Array}) submissions: any[] = [];

  geocoder: any;

  static get scopedElements() {
    return {
      'lion-tabs': LionTabs,
      'lion-steps': LionSteps,
      'lion-step': LionStep
    };
  }

  static get styles() {
    return [ mapSubmissionStyle ];
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

  updated() {
    const wrapperElement = this.renderRoot.querySelector('.wrapper');
    if (!this.geocoder) {
      this.geocoder = this.renderRoot.querySelector('.bcg-overlay')?.shadowRoot?.querySelector('.interactive-map')?.shadowRoot?.querySelectorAll('.mapboxgl-ctrl-geocoder')[0];
      if (this.geocoder) {
        wrapperElement?.appendChild(this.geocoder);
      }
    }

    const geocoderContainer = this.renderRoot.querySelector('.geocoder-container');
    if (geocoderContainer) {
      if (!geocoderContainer.hasChildNodes()) {
        geocoderContainer.appendChild(this.geocoder);
        (this.geocoder as HTMLElement).style.visibility = 'visible';
      } else if (!this.showOverlay) {
        wrapperElement?.appendChild(this.geocoder);
        (this.geocoder as HTMLElement).style.visibility = 'hidden';
      }
    }
  }

  handleGeocoderInput(input: any) {
    console.log(input)
    this.currentGeocoderInput = input;
    this.removeCurrentMarker();
  }

  removeCurrentMarker() {
    if (!this.currentMarker) {
      return;
    }
    this.currentMarker.remove();
    this.currentMarker = undefined;
  }

  clearGeocoder() {
    this.currentGeocoderInput = undefined;
    (this.geocoder.querySelector('.mapboxgl-ctrl-geocoder--button') as HTMLButtonElement)?.click();
  }

  render() {
    return html`
    <link href='https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css' rel='stylesheet' />
    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css">
    <div class="wrapper">
      <bcg-button variant="primary" class="submission-button" @click=${() => { 
        this.showOverlay = true; 
        this.showLayerContent = false;
      }}>Hinweis eingeben</bcg-button>
      <lion-tabs>
        <bcg-tab-button slot="tab">Karte</bcg-tab-button>
        <bcg-tab-panel slot="panel">
          <div style="width: 100%; height: 600px">
            <bcg-map-overlay
            class="bcg-overlay"
            accessToken=${this.accessToken}
            actionButtonLabel=${this.actionButtonLabel}
            .pinColor=${this.pinColor}
            .actionButtonCallback=${() => { this.showOverlay = true; this.showLayerContent = true; }}
            .closeButtonCallback=${() => { this.showOverlay = false; this.clearGeocoder(); this.removeCurrentMarker(); }}
            initialZoom=${this.initialZoom}
            .initialPosition=${this.initialPosition}
            overlayWidth=${this.overlayWidth}
            .activeLayers=${this.activeLayers}
            .showOverlay=${this.showOverlay}
            .geocoderInputCallback=${(input: any) => { this.handleGeocoderInput(input) }}
            .markerSetCallback=${(marker: any) => { this.currentMarker = marker; this.clearGeocoder() }}
            >
              <div class="overlay-content" slot="overlay-content">
                ${this.showLayerContent ? 
                  html`
                  <h2>${this.overlayHeader}</h2>
                  <bcg-checkbox-group
                  name="layers"
                  .modelValue=${this.activeLayers}
                  @model-value-changed=${(ev:any) => {
                    this.activeLayers = ev.target.modelValue;
                    this.requestUpdate();
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
                  ` : html`
                    <lion-steps style="height: 100%">

                      <lion-step initial-step class="submission-step">
                        <div class="step-content">
                          <h3>Standort auswählen</h3>
                          <h4>Option 1: Ort suchen</h4>
                          <div class="geocoder-container"></div>
                          <h4>Option 2: Pin setzen<h4>
                          <div class="pin-container">
                            ${!this.currentMarker ? html`
                              <lion-icon draggable="true" @dragstart=${() => {}} class="marker-icon" style="fill: ${this.pinColor}" icon-id="bcg:general:marker"></lion-icon>
                            ` : html`<div style="width:27px"></div>`}
                            <span class="pin-text">Platzieren Sie diesen Pin durch Ziehen und Ablegen an der von Ihnen gewählten Position auf der Karte</span>
                          </div>
                        </div>
                        <div class="step-navigation">
                          1/3
                          <button
                          .disabled=${!this.currentMarker && !this.currentGeocoderInput}
                          type="button"
                          @click=${(ev: {
                            target: { parentElement: { parentElement: { controller: { next: () => any } } } };
                          }) => ev.target.parentElement.parentElement.controller.next()}
                          >
                            >
                          </button>
                        </div>
                      </lion-step>

                      <lion-step class="submission-step">
                        <div class="step-content">
                          <h3>Ihr Hinweis</h3>
                          <bcg-input label="Titel"></bcg-input>
                          <bcg-input label="Ihr Hinweis"></bcg-input>
                        </div>
                        <div class="step-navigation">
                          <button
                          type="button"
                          @click=${(ev: {
                            target: {
                              parentElement: { parentElement: { controller: { previous: () => any } } };
                            };
                          }) => ev.target.parentElement.parentElement.controller.previous()}
                          >
                            <
                          </button>
                          2/3
                          <button
                            type="button"
                            @click=${(ev: {
                              target: { parentElement: { parentElement: { controller: { next: () => any } } } };
                            }) => ev.target.parentElement.parentElement.controller.next()}
                          >
                            >
                          </button>
                        </div>
                      </lion-step>

                      <lion-step class="submission-step">
                        <div class="step-content">
                          <h3>Über Sie</h3>
                          <bcg-input label="Vorname"></bcg-input>
                          <bcg-input label="Nachname"></bcg-input>
                          <bcg-input label="E-Mail"></bcg-input>
                          <bcg-checkbox label="Ich habe die Datenschutzerklärung gelesen, verstanden und bin damit einverstanden, dass meine Personendaten gespeichert werden."></bcg-checkbox>
                        </div>
                        <div class="step-navigation">
                          <button
                          type="button"
                          @click=${(ev: {
                            target: {
                              parentElement: { parentElement: { controller: { previous: () => any } } };
                            };
                          }) => ev.target.parentElement.parentElement.controller.previous()}
                          >
                            <
                          </button>
                          3/3
                        </div>
                      </lion-step>

                    </lion-steps>

                  `}
              </div>
            </bcg-map-overlay>
          </div>
        </bcg-tab-panel>

        <bcg-tab-button slot="tab">Liste</bcg-tab-button>
        <bcg-tab-panel slot="panel">Liste</bcg-tab-panel>

      </lion-tabs>
    </div>
    `;
  }
}
