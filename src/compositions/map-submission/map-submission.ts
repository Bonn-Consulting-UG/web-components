import { html, property, ScopedElementsMixin } from "@lion/core";
import { Required } from "@lion/form-core";
import { LionStep, LionSteps } from "@lion/steps";
import { LionTabs } from "@lion/tabs";
import { BcgModule } from "../../components/module";
import { LayerData } from "../../model/LayerData";
import { getCommentsEndpointforModule, getSubmissionsEndpointforModule, mapSubmissionEndpoint } from "../../utils/services/config";
import { mapSubmissionStyle } from './style-map-submission';

interface MapRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  title?: string;
  description?: string;
  points: MapData[];
};

interface MapData {
  longitude?: number;
  latitude?: number;
}

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
  @property({type: Object}) currentMapSubmission: MapRequest = { points: []};
  @property({type: Boolean}) privacyChecked = false;
  @property({type: String}) notificationType = '';
  @property({type: String}) notificationMessage = '';

  @property({type: Array}) submissions: any[] = [];

  geocoder: any;
  isLoading = false;


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

  firstUpdated() {
    this.fetchSubmissions().then(res => {
      this.submissions = res.results.filter((submission: any) => submission.points?.length >= 1);
    });
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
    this.currentGeocoderInput = input;
    this.removeCurrentMarker();
    this.currentMapSubmission.points = [{ 
      longitude: input.result.center[0], 
      latitude: input.result.center[1]
    }];
  }

  handleMarkerInput(marker: any) {
    this.currentMarker = marker;
    this.clearGeocoder();
    this.currentMapSubmission.points = [{ 
      longitude: marker.getLngLat().lng, 
      latitude: marker.getLngLat().lat
    }];
  } 

  removeCurrentMarker() {
    if (!this.currentMarker) {
      return;
    }
    this.currentMarker.remove();
    this.currentMarker = undefined;
    this.currentMapSubmission.points = [];
  }

  clearGeocoder() {
    this.currentGeocoderInput = undefined;
    this.currentMapSubmission.points = [];
    (this.geocoder.querySelector('.mapboxgl-ctrl-geocoder--button') as HTMLButtonElement)?.click();
  }

  async fetchSubmissions() {
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
        getSubmissionsEndpointforModule(this.moduleId),
        fetchOptions
      );
      return resp.json();
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async submitSubmission() {
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken')
            ? `Bearer ${localStorage.getItem('accessToken')}`
            : '',
        },
        body: this.isLoggedIn
          ? JSON.stringify({
              description: this.currentMapSubmission.description,
              title: this.currentMapSubmission.title,
              points: this.currentMapSubmission.points,
              moduleId: this.moduleId,
            })
          : JSON.stringify({
              ...this.currentMapSubmission,
              moduleId: this.moduleId,
            }),
      };
      this.isLoading = true;

      const resp = await fetch(mapSubmissionEndpoint('1'), fetchOptions);

      if (resp.status === 201) {
        this.resetCurrentSubmission();
        this.fetchSubmissions().then(res => {
          this.submissions = res.results.filter((submission: any) => submission.points?.length >= 1);
        });
        this.isLoading = false;
      }

      this.notificationType = 'success';
      this.notificationMessage = 'Vielen Dank für Ihren Hinweis!';
    } catch (err) {
      this.resetCurrentSubmission();
      this.notificationType = 'error';
      this.notificationMessage = 'Fehler ist aufgetreten';
      this.isLoading = false;
    }
  }

  resetCurrentSubmission() {
    this.clearGeocoder();
    this.removeCurrentMarker();
    this.currentMapSubmission = {
      description: '',
      lastName: '',
      title: '',
      email: '',
      firstName: '',
      points: []
    };
    this.privacyChecked = false;
  }

  resetStepper() {
    const stepper = (this.renderRoot.querySelector('.stepper') as any);
    stepper?._goTo(0, stepper.__current);
  }

  closeOverlay() {
    this.showOverlay = false;
    this.resetCurrentSubmission();
    (this.renderRoot.querySelector('.submission-form') as any)?.reset();
    (this.renderRoot.querySelector('.contact-form') as any)?.reset();
    this.resetStepper();
  }

  render() {
    // TODO: Remove
    this.isLoggedIn = false;
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
            .closeButtonCallback=${() => this.closeOverlay()}
            initialZoom=${this.initialZoom}
            .initialPosition=${this.initialPosition}
            overlayWidth=${this.overlayWidth}
            .activeLayers=${this.activeLayers}
            .submissions=${this.submissions}
            .showOverlay=${this.showOverlay}
            .geocoderInputCallback=${(input: any) => { this.handleGeocoderInput(input) }}
            .markerSetCallback=${(marker: any) => { this.handleMarkerInput(marker) }}
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
                    <lion-steps style="height: 100%" class="stepper">

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
                          ${this.isLoggedIn ? '1/2' : '1/3'}
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
                      <bcg-form style="height: 100%" class="submission-form" @submit=${(ev: any) => {
                          if (!ev.target.hasFeedbackFor.includes('error')) {
                            ev.target.parentElement.controller.next();
                          }
                        }}>
                        <form @submit=${(e: any) => e.preventDefault()}>
                            <div class="step-content">
                              <h3>Ihr Hinweis</h3>
                              <bcg-input
                              label="Titel"
                              placeholder=""
                              name="title"
                              .validators=${[new Required()]}
                              .modelValue="${this.currentMapSubmission.title}"
                              @model-value-changed=${({ target }: any) => {
                                this.currentMapSubmission.title = target.value;
                                this.currentMapSubmission = {...this.currentMapSubmission};
                              }}
                              ></bcg-input>
                              <bcg-input
                              label="Ihr Hinweis"
                              placeholder=""
                              name="description"
                              .validators=${[new Required()]}
                              .modelValue="${this.currentMapSubmission.description}"
                              @model-value-changed=${({ target }: any) => {
                                this.currentMapSubmission.description = target.value;
                                this.currentMapSubmission = {...this.currentMapSubmission};
                              }}
                              ></bcg-input>
                            </div>
                            <div class="step-navigation">
                              <button
                              type="button"
                              @click=${(ev: {
                                target: {
                                  parentElement: { parentElement: { parentElement: { parentElement: { controller: { previous: () => any } } } } };
                                };
                              }) => ev.target.parentElement.parentElement.parentElement.parentElement.controller.previous()}
                              >
                                <
                              </button>
                              ${this.isLoggedIn ? '2/2' : '2/3'}
                              <button
                                type="button"
                                @click=${(ev: {
                                  target: { parentElement: { parentElement: { parentElement: { submit: (ev:any) => any } } } };
                                }) => {
                                  ev.target.parentElement.parentElement.parentElement.submit(ev);
                                }}
                              >
                                >
                              </button>
                            </div>
                          </form>
                        </bcg-form>
                      </lion-step>

                      ${!this.isLoggedIn ? html`
                      <lion-step class="submission-step">
                        <bcg-form class="contact-form" @submit=${(ev: any) => {
                          if (!ev.target.hasFeedbackFor.includes('error')) {
                            ev.target.parentElement.controller.next();
                            this.submitSubmission();
                          }
                        }}>
                          <form @submit=${(e: any) => e.preventDefault()}>
                            <div class="step-content">
                              <h3>Über Sie</h3>
                              <bcg-input
                              label="Vorname"
                              placeholder=""
                              name="firstName"
                              .validators=${[new Required()]}
                              .modelValue="${this.currentMapSubmission.firstName}"
                              @model-value-changed=${({ target }: any) => {
                                this.currentMapSubmission.firstName = target.value;
                                this.currentMapSubmission = {...this.currentMapSubmission};
                              }}
                              ></bcg-input>
                              <bcg-input
                              label="Nachname"
                              placeholder=""
                              name="lastName"
                              .validators=${[new Required()]}
                              .modelValue="${this.currentMapSubmission.lastName}"
                              @model-value-changed=${({ target }: any) => {
                                this.currentMapSubmission.lastName = target.value;
                                this.currentMapSubmission = {...this.currentMapSubmission};
                              }}
                              ></bcg-input>
                              <bcg-input-email
                              label="E-Mail"
                              placeholder=""
                              name="email"
                              .validators=${[new Required()]}
                              .modelValue="${this.currentMapSubmission.email}"
                              @model-value-changed=${({ target }: any) => {
                                this.currentMapSubmission.email = target.value;
                                this.currentMapSubmission = {...this.currentMapSubmission};
                              }}
                              ></bcg-input-email>
                              <bcg-checkbox
                              name="privacy"
                              .validators=${[new Required()]}
                              .checked=${this.privacyChecked}
                              @model-value-changed=${({ target }: any) => {
                                this.privacyChecked = target.checked;
                              }}
                              label="Ich habe die Datenschutzerklärung gelesen, verstanden und bin damit einverstanden, dass meine Personendaten gespeichert werden."></bcg-checkbox>
                            </div>
                            <div class="step-navigation">
                              <button
                              type="button"
                              @click=${(ev: {
                                target: {
                                  parentElement: { parentElement: { parentElement: { parentElement: { controller: { previous: () => any } } } } };
                                };
                              }) => ev.target.parentElement.parentElement.parentElement.parentElement.controller.previous()}
                              >
                                <
                              </button>
                              3/3
                              <button
                              type="button"
                              @click=${(ev: {
                                target: { parentElement: { parentElement: { parentElement: { submit: (ev:any) => any } } } };
                              }) => {
                                ev.target.parentElement.parentElement.parentElement.submit(ev);
                              }}
                            >
                              >
                            </button>
                            </div>
                          </form>
                        </bcg-form>
                      </lion-step>
                      ` : ''}

                      <lion-step class="submission-step">
                      ${this.isLoading
                      ? html` <bcg-progress></bcg-progress>`
                      : html`
                        ${this.notificationType === 'success' ? html`<span>Success!</span>` : html`<span>Fehler!</span>`}
                        <h1>${this.notificationMessage}</h1>
                        <bcg-button variant="secondary" @click=${() => this.closeOverlay()}>Schließen</bcg-button>
                      `
                      }
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
