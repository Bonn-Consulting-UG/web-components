import { html, LitElement, property, ScopedElementsMixin } from '@lion/core';
import { Required } from '@lion/form-core';
import { LionStep, LionSteps } from '@lion/steps';
import { LionTabs } from '@lion/tabs';
import { BcgModule } from '../../components/module';
import { LayerData } from '../../model/LayerData';
import { MapSubmission } from '../../model/MapSubmission';
import {
  getReverseGeocodingEndpoint,
  getSubmissionsEndpointforModule,
  mapSubmissionEndpoint,
} from '../../utils/services/config';
import { mapSubmissionStyle } from './style-map-submission';

export class BcgMapSubmission extends ScopedElementsMixin(BcgModule) {
  // settable properties
  @property({ type: String }) overlayHeader: string = 'Overlay';
  @property({ type: Array }) layers: LayerData[] = [];
  @property({ type: Number }) mapHeight = 600;
  @property({ type: String }) createSubmissionButtonLabel = 'Hinweis eingeben';
  @property({ type: Boolean }) showCreateSubmissionButton = true;
  @property({ type: Boolean }) showOverlayButton = true;

  // map-overlay properties
  @property({ type: String }) actionButtonLabel = 'Open Overlay';
  @property({ type: String }) overlayWidth: string = '40%';
  // mapbox properties
  @property({ type: String }) mapAccessToken: string = '';
  @property({ type: Array }) initialPosition: [number, number] = [13.4, 52.51];
  @property({ type: Number }) initialZoom = 10;
  @property({ type: Array }) maxBounds = undefined;
  @property({ type: String }) pinColor = '#9747FF';

  // internal use
  @property({ type: Array }) activeLayers: LayerData[] = [];
  @property({ type: Array }) expandedCategories: string[] = [];
  @property({ type: Boolean }) showOverlay: boolean = false;
  @property({ type: Boolean }) showLayerContent: boolean = true;
  @property({ type: Object }) currentMarker: any;
  @property({ type: Object }) currentGeocoderInput: any;
  @property({ type: Object }) currentMapSubmission: MapSubmission = { points: [] };
  @property({ type: Boolean }) privacyChecked = false;
  @property({ type: String }) notificationType = '';
  @property({ type: String }) notificationMessage = '';

  @property({ type: LitElement || undefined }) stepper: any;
  @property({ type: Number }) currentTabIndex = 0;

  sortByNewest = (a: MapSubmission, b: MapSubmission) => 
    new Date(a.createdAt ?? '').getTime() - new Date(b.createdAt ?? '').getTime();
  sortByOldest = (a: MapSubmission, b: MapSubmission) => 
    new Date(b.createdAt ?? '').getTime() - new Date(a.createdAt ?? '').getTime();
  @property({ type: String }) sortBy: 'newest' | 'oldest' = 'newest';
  @property({ type: Function }) sortByDateFunction = this.sortByNewest;


  @property({ type: Array }) submissions: any[] = [];

  geocoder: any;
  submissionForm: any;
  contactForm: any;

  @property({ type: String }) currentAdress: string = '';

  static get scopedElements() {
    return {
      'lion-tabs': LionTabs,
      'lion-steps': LionSteps,
      'lion-step': LionStep,
    };
  }

  static get styles() {
    return [mapSubmissionStyle];
  }

  get categories() {
    return [...new Set(this.layers.map(layer => layer.category))];
  }

  firstUpdated(changed: any) {
    this.showCreateSubmissionButton = this.canCreateSubmissions;
    if (this.canViewSubmissions) {
      this.fetchSubmissions().then(res => {
        this.submissions = res.results.filter(
          (submission: any) => submission.points?.length >= 1
        );
      });
    }
    super.firstUpdated(changed);
  }

  switchCategoryExpandedState = (category: string) => {
    if (this.expandedCategories.includes(category)) {
      this.expandedCategories.splice(
        this.expandedCategories.indexOf(category),
        1
      );
    } else {
      this.expandedCategories.push(category);
    }
    this.expandedCategories = [...this.expandedCategories];
  };

  updated(changed: any) {
    this.stepper = this.renderRoot.querySelector('.stepper') as any; 
    const wrapperElement = this.renderRoot.querySelector('.wrapper');
    if (!this.geocoder) {
      this.geocoder = this.renderRoot
        .querySelector('.bcg-overlay')
        ?.shadowRoot?.querySelector('.interactive-map')
        ?.shadowRoot?.querySelectorAll('.mapboxgl-ctrl-geocoder')[0];
      if (this.geocoder) {
        wrapperElement?.appendChild(this.geocoder);
      }
    }

    const geocoderContainer = this.renderRoot.querySelector(
      '.geocoder-container'
    );
    if (geocoderContainer) {
      if (!geocoderContainer.hasChildNodes()) {
        geocoderContainer.appendChild(this.geocoder);
        (this.geocoder as HTMLElement).style.visibility = 'visible';
      } else if (!this.showOverlay) {
        wrapperElement?.appendChild(this.geocoder);
        (this.geocoder as HTMLElement).style.visibility = 'hidden';
      }
    }
    this.stepper = !this.stepper
      ? (this.renderRoot.querySelector('.stepper') as any)
      : this.stepper;
    this.submissionForm = !this.submissionForm
      ? (this.renderRoot.querySelector('.submission-form') as any)
      : this.submissionForm;
    this.contactForm = !this.contactForm
      ? (this.renderRoot.querySelector('.contact-form') as any)
      : this.contactForm;

    super.updated(changed);
  }

  handleGeocoderInput(input: any) {
    this.currentGeocoderInput = input;
    this.removeCurrentMarker();
    this.currentMapSubmission.points = [
      {
        longitude: input.result.center[0],
        latitude: input.result.center[1],
      },
    ];
  }

  async handleMarkerInput(marker: any) {
    this.currentMarker = marker;
    // reverse geocoding
    const resp = await fetch(
      getReverseGeocodingEndpoint(marker.getLngLat().lng, marker.getLngLat().lat, this.mapAccessToken)
    )
    resp.json().then(res => {
      this.currentAdress = res.features[0].place_name;
    });
    this.clearGeocoder();

    this.currentMapSubmission.points = [
      {
        longitude: marker.getLngLat().lng,
        latitude: marker.getLngLat().lat,
      },
    ];
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
    (
      this.geocoder.querySelector(
        '.mapboxgl-ctrl-geocoder--button'
      ) as HTMLButtonElement
    )?.click();
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

      const resp = await fetch(mapSubmissionEndpoint(''), fetchOptions);

      if (resp.status === 201) {
        this.resetCurrentSubmission();
        this.fetchSubmissions().then(res => {
          this.submissions = res.results.filter(
            (submission: any) => submission.points?.length >= 1
          );
        });
        this.isLoading = false;
      }

      this.notificationType = 'success';
      this.notificationMessage = 'Vielen Dank für Ihren Hinweis!';
    } catch (err) {
      console.log(err);

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
      points: [],
    };
    this.privacyChecked = false;
  }

  resetStepper() {
    this.stepper?._goTo(0, this.stepper.__current);
  }

  closeOverlay() {
    this.showOverlay = false;
    this.resetCurrentSubmission();
    this.submissionForm?.reset();
    this.contactForm?.reset();
    this.resetStepper();
  }


  switchSortState() {
    this.sortByDateFunction = this.sortByDateFunction === this.sortByNewest ? this.sortByOldest : this.sortByNewest;
    this.sortBy = this.sortBy === 'newest' ? 'oldest' : 'newest';
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
        ${this.showCreateSubmissionButton ? html`
          <bcg-button
            variant="primary"
            class="submission-button"
            @click=${() => {
              this.showOverlay = true;
              this.showLayerContent = false;
              this.currentTabIndex = 0;
            }}
          >
            <div>
              <lion-icon
                class="button-icon"
                icon-id="bcg:general:edit"
              ></lion-icon>
              ${this.createSubmissionButtonLabel}
            </div>
          </bcg-button>
        ` : !this.isLoggedIn ? html
          `<div class="submission-permission-hint">Sie müssen angemeldet sein, um sich beteiligen zu können</div>` 
          : ``}

        ${this.currentTabIndex === 1 && this.canViewSubmissions ? html`
          <bcg-button variant="secondary" @click=${() => this.switchSortState()} class="sort-button">
          <div style="margin-right: 5px">${this.sortBy === 'newest' ? 'Neuste zuerst' : 'Älteste zuerst'}</div>
          <lion-icon
          class="expand-icon"
          icon-id=${this.sortBy === 'newest'
            ? 'bcg:general:expand'
            : 'bcg:general:collapse'}
          ></lion-icon>
          </bcg-button>`
        : ``}

        <lion-tabs class="tabs" .selectedIndex=${this.currentTabIndex}>
          <bcg-tab-button @click=${() => this.currentTabIndex = 0} class="tab-button" slot="tab">
            <div>
              <lion-icon
                class="button-icon"
                icon-id="bcg:general:map"
              ></lion-icon>
              Karte
            </div>
          </bcg-tab-button>
          <bcg-tab-panel slot="panel">
            <div style="width: 100%; height: ${this.mapHeight}px">
              <bcg-map-overlay
                class="bcg-overlay"
                mapAccessToken=${this.mapAccessToken}
                .showActionButton=${this.showOverlayButton}
                actionButtonLabel=${this.actionButtonLabel}
                .pinColor=${this.pinColor}
                .actionButtonCallback=${() => {
                  this.showOverlay = true;
                  this.showLayerContent = true;
                }}
                .closeButtonCallback=${() => this.closeOverlay()}
                initialZoom=${this.initialZoom}
                .maxBounds=${this.maxBounds}
                .initialPosition=${this.initialPosition}
                overlayWidth=${this.overlayWidth}
                .activeLayers=${this.activeLayers}
                .submissions=${this.submissions}
                .showOverlay=${this.showOverlay}
                .geocoderInputCallback=${(input: any) => {
                  this.handleGeocoderInput(input);
                }}
                .markerSetCallback=${(marker: any) => {
                  this.handleMarkerInput(marker);
                }}
              >
                <div class="overlay-content" slot="overlay-content">
                  ${this.showLayerContent
                    ? html`
                        <h2>${this.overlayHeader}</h2>
                        <bcg-checkbox-group
                          name="layers"
                          .modelValue=${this.activeLayers}
                          @model-value-changed=${(ev: any) => {
                            this.activeLayers = ev.target.modelValue;
                            this.requestUpdate();
                          }}
                        >
                          ${this.categories.map(category => {
                            return html`
                              <h4
                                class="category-label"
                                @click=${() =>
                                  this.switchCategoryExpandedState(category)}
                              >
                                ${category}
                                <lion-icon
                                  class="expand-icon"
                                  icon-id=${this.expandedCategories.includes(
                                    category
                                  )
                                    ? 'bcg:general:collapse'
                                    : 'bcg:general:expand'}
                                ></lion-icon>
                              </h4>
                              ${this.layers
                                .filter(
                                  layer =>
                                    layer.category === category &&
                                    this.expandedCategories.includes(category)
                                )
                                .map(
                                  layer => html`
                                    <bcg-checkbox
                                      class="layer-option"
                                      .choiceValue=${layer}
                                    >
                                      <span
                                        slot="label"
                                        style="position: relative"
                                      >
                                        <lion-icon
                                          class="layer-icon"
                                          icon-id="bcg:general:layer"
                                          style="fill: ${layer.color
                                            ? layer.color
                                            : '#0080ff'}"
                                        ></lion-icon>
                                        <span class="layer-label"
                                          >${layer.label}</span
                                        >
                                      </span>
                                    </bcg-checkbox>
                                  `
                                )}
                              <div class="separator"></div>
                            `;
                          })}
                        </bcg-checkbox-group>
                      `
                    : html`
                    <lion-steps style="height: 100%" class="stepper">

                      <lion-step initial-step class="submission-step" >
                        <div class="step-content">
                          <h3>Standort auswählen</h3>
                          <h4>Option 1: Ort suchen</h4>
                          <div class="geocoder-container"></div>
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
                            ${this.currentMarker ? html`
                            <p class="pin-info-text">${this.currentAdress}</p>
                            <span class="pin-info-text">[ Lng: ${this.currentMapSubmission.points[0]?.longitude?.toFixed(4)}, Lat: ${this.currentMapSubmission.points[0]?.latitude?.toFixed(4)} ]
                            </span>` : ``}
                          </div>
                        </div>
                        <div class="step-navigation">
                          ${this.isLoggedIn ? '1/2' : '1/3'}
                          <bcg-button
                          variant="primary"
                          .disabled=${
                            !this.currentMarker && !this.currentGeocoderInput
                          }
                          @click=${() => this.stepper?.next()}
                          type="button">
                            >
                          </bcg-button>
                        </div>
                      </lion-step>

                      <lion-step class="submission-step">
                        <div class="step-content">
                          <bcg-form style="height: 100%" class="submission-form" @submit=${async (
                            ev: any
                          ) => {
                            if (
                              !this.submissionForm.hasFeedbackFor.includes(
                                'error'
                              )
                            ) {
                              this.isLoggedIn
                                ? await this.submitSubmission()
                                : null;
                              this.stepper?.next();
                            }
                          }}>
                            <form @submit=${(e: any) => e.preventDefault()}>
                              <h3>Ihr Hinweis</h3>
                              <bcg-input
                              label="Titel"
                              placeholder=""
                              name="title"
                              .validators=${[new Required()]}
                              .modelValue="${this.currentMapSubmission.title}"
                              @model-value-changed=${({ target }: any) => {
                                this.currentMapSubmission.title = target.value;
                                this.currentMapSubmission = {
                                  ...this.currentMapSubmission,
                                };
                              }}
                              ></bcg-input>
                              <bcg-input
                              label="Ihr Hinweis"
                              placeholder=""
                              name="description"
                              .validators=${[new Required()]}
                              .modelValue="${
                                this.currentMapSubmission.description
                              }"
                              @model-value-changed=${({ target }: any) => {
                                this.currentMapSubmission.description =
                                  target.value;
                                this.currentMapSubmission = {
                                  ...this.currentMapSubmission,
                                };
                              }}
                              ></bcg-input>
                            </form>
                          </bcg-form>
                        </div>
                        <div class="step-navigation">
                        <bcg-button
                      variant="secondary"
                      .disabled=${
                        !this.currentMarker && !this.currentGeocoderInput
                      }
                      @click=${() => this.stepper?.previous()}
                      type="button">
                        <
                      </bcg-button>

                          ${this.isLoggedIn ? '2/2' : '2/3'}
                          <bcg-button
                      variant="primary"
                      .disabled=${
                        !this.currentMarker && !this.currentGeocoderInput
                      }
                      @click=${() => this.submissionForm?.submit()}
                      type="button">
                        >
                      </bcg-button>
                            
                          </bcg-button>
                        </div>
                      </lion-step>

                      ${
                        !this.isLoggedIn
                          ? html`
                              <lion-step class="submission-step">
                                <div class="step-content">
                                  <bcg-form
                                    class="contact-form"
                                    @submit=${(ev: any) => {
                                      if (
                                        !this.contactForm?.hasFeedbackFor.includes(
                                          'error'
                                        )
                                      ) {
                                      }
                                    }}
                                  >
                                    <form
                                      @submit=${(e: any) => e.preventDefault()}
                                    >
                                      <h3>Über Sie</h3>
                                      <bcg-input
                                        label="Vorname"
                                        placeholder=""
                                        name="firstName"
                                        .validators=${[new Required()]}
                                        .modelValue="${this.currentMapSubmission
                                          .firstName}"
                                        @model-value-changed=${({
                                          target,
                                        }: any) => {
                                          this.currentMapSubmission.firstName =
                                            target.value;
                                          this.currentMapSubmission = {
                                            ...this.currentMapSubmission,
                                          };
                                        }}
                                      ></bcg-input>
                                      <bcg-input
                                        label="Nachname"
                                        placeholder=""
                                        name="lastName"
                                        .validators=${[new Required()]}
                                        .modelValue="${this.currentMapSubmission
                                          .lastName}"
                                        @model-value-changed=${({
                                          target,
                                        }: any) => {
                                          this.currentMapSubmission.lastName =
                                            target.value;
                                          this.currentMapSubmission = {
                                            ...this.currentMapSubmission,
                                          };
                                        }}
                                      ></bcg-input>
                                      <bcg-input-email
                                        label="E-Mail"
                                        placeholder=""
                                        name="email"
                                        .validators=${[new Required()]}
                                        .modelValue="${this.currentMapSubmission
                                          .email}"
                                        @model-value-changed=${({
                                          target,
                                        }: any) => {
                                          this.currentMapSubmission.email =
                                            target.value;
                                          this.currentMapSubmission = {
                                            ...this.currentMapSubmission,
                                          };
                                        }}
                                      ></bcg-input-email>
                                      <bcg-checkbox
                                        name="privacy"
                                        .validators=${[new Required()]}
                                        .checked=${this.privacyChecked}
                                        @model-value-changed=${({
                                          target,
                                        }: any) => {
                                          this.privacyChecked = target.checked;
                                        }}
                                        label="Ich habe die Datenschutzerklärung gelesen, verstanden und bin damit einverstanden, dass meine Personendaten gespeichert werden."
                                      ></bcg-checkbox>
                                    </form>
                                  </bcg-form>
                                </div>
                                <div class="step-navigation">
                                  <bcg-button
                                    variant="secondary"
                                    .disabled=${!this.currentMarker &&
                                    !this.currentGeocoderInput}
                                    @click=${() => this.stepper?.previous()}
                                    type="button"
                                  >
                                    <
                                  </bcg-button>
                                  3/3

                                  <bcg-button-submit
                                    @click=${() => {
                                      this.submitSubmission();
                                      this.stepper?.next();
                                    }}
                                    variant="primary"
                                    .disabled=${!this.currentMarker &&
                                    !this.currentGeocoderInput}
                                    type="button"
                                  >
                                    >
                                  </bcg-button-submit>
                                </div>
                              </lion-step>
                            `
                          : ''
                      }

                      <lion-step class="submission-step">
                      ${
                        this.isLoading
                          ? html` <bcg-progress></bcg-progress>`
                          : html`
                              ${this.notificationType === 'success'
                                ? html`<span>Success!</span>`
                                : html`<span>Fehler!</span>`}
                              <h1>${this.notificationMessage}</h1>
                              <bcg-button
                                variant="secondary"
                                @click=${() => this.closeOverlay()}
                                >Schließen</bcg-button
                              >
                            `
                      }
                      </lion-step>

                    </lion-steps>

                  `}
                </div>
              </bcg-map-overlay>
            </div>
          </bcg-tab-panel>

          <bcg-tab-button class="tab-button" @click=${() => this.currentTabIndex = 1} slot="tab">
            <div>
              <lion-icon
                class="button-icon"
                style="margin-right: 0.4em"
                icon-id="bcg:general:list"
              ></lion-icon>
              Liste
            </div>
          </bcg-tab-button>
          <bcg-tab-panel slot="panel">
            <div class="list-grid">
              ${this.canViewSubmissions ? this.submissions.sort(this.sortByDateFunction).map(submission => html`
              <div style="padding: 5px;">
                <bcg-submission-card
                .submission=${submission}
                ></bcg-submission-card>
              </div>`) : `Sie haben keine Berechtigung um Hinweise zu sehen`}
            </div>
          </bcg-tab-panel>
        </lion-tabs>
      </div>
    `;
  }
}
