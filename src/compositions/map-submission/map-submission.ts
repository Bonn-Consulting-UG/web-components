import { html, LitElement, property, ScopedElementsMixin } from '@lion/core';
import { MaxLength, Required } from '../../utils/helpers/input-errors';
import { LionStep, LionSteps } from '@lion/steps';
import { LionTabs } from '@lion/tabs';
import { BcgModule } from '../../components/module';
import { MapSubmission } from '../../model/MapSubmission';
import {
  getSubmissionsEndpointforModule,
  mapSubmissionEndpoint,
} from '../../utils/services/config';
import { mapSubmissionStyle } from './style-map-submission';
import { MapService } from '../../utils/services/map';

export class BcgMapSubmission extends ScopedElementsMixin(BcgModule) {
  // settable properties
  @property({ type: String }) overlayHeader: string = 'Overlay';
  @property({ type: Number }) mapHeight = 600;
  @property({ type: String }) createSubmissionButtonLabel = 'Hinweis eingeben';
  @property({ type: Boolean }) showCreateSubmissionButton = true;

  // map-overlay properties
  @property({ type: String }) overlayWidth: string = '40%';
  // mapbox properties
  @property({ type: String }) mapAccessToken: string = '';
  @property({ type: Array }) initialPosition: [number, number] = [13.4, 52.51];
  @property({ type: Number }) initialZoom = 10;
  @property({ type: Array }) maxBounds = undefined;
  @property({ type: String }) pinColor = '#9747FF';

  // internal use
  @property({ type: Boolean }) showOverlay: boolean = false;
  @property({ type: Object }) currentMarker: any;
  @property({ type: Object }) currentGeocoderInput: any;
  @property({ type: Object }) currentMapSubmission: MapSubmission = {
    points: [],
  };
  @property({ type: Boolean }) privacyChecked = false;
  @property({ type: String }) notificationType = '';
  @property({ type: String }) notificationMessage = '';

  @property({ type: LitElement || undefined }) stepper: any;
  @property({ type: Number }) currentTabIndex = 0;

  sortByNewest = (a: MapSubmission, b: MapSubmission) =>
    new Date(a.createdAt ?? '').getTime() -
    new Date(b.createdAt ?? '').getTime();
  sortByOldest = (a: MapSubmission, b: MapSubmission) =>
    new Date(b.createdAt ?? '').getTime() -
    new Date(a.createdAt ?? '').getTime();
  @property({ type: String }) sortBy: 'newest' | 'oldest' = 'newest';
  @property({ type: Function }) sortByDateFunction = this.sortByNewest;

  @property({ type: Array }) submissions: any[] = [];

  geocoder: any;
  submissionForm: any;
  contactForm: any;
  mapService: MapService = new MapService(this);

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

  firstUpdated(changed: any) {
    this.fetchSubmissions().then(res => {
      this.submissions = res.results.filter(
        (submission: any) => submission.points?.length >= 1
      );
    });
    super.firstUpdated(changed);
  }

  updated(changed: any) {
    this.stepper = this.renderRoot.querySelector('.stepper') as any;
    this.mapService.assignGeocoder();
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
        body:
          this.isLoggedIn || (!this.isLoggedIn && this.isHiddenUserAllowed)
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
        this.mapService.resetCurrentSubmission();
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
      this.mapService.resetCurrentSubmission();
      this.notificationType = 'error';
      this.notificationMessage = 'Fehler ist aufgetreten';
      this.isLoading = false;
    }
  }

  resetStepper() {
    this.stepper?._goTo(0, this.stepper.__current);
  }

  closeOverlay() {
    this.showOverlay = false;
    this.mapService.resetCurrentSubmission();
    this.submissionForm?.reset();
    this.contactForm?.reset();
    this.resetStepper();
  }

  switchSortState() {
    this.sortByDateFunction =
      this.sortByDateFunction === this.sortByNewest
        ? this.sortByOldest
        : this.sortByNewest;
    this.sortBy = this.sortBy === 'newest' ? 'oldest' : 'newest';
  }

  rebindForms() {
    // null form objects to trigger a reassignment
    this.submissionForm = undefined;
    this.contactForm = undefined;
    this.geocoder = undefined;
    this.updated([]);
  }

  render() {
    const renderRequiredStringForInputs = !this.submissionWriters.includes(
      'ANONYMOUS'
    )
      ? ' *'
      : null;

    const hiddenUserValidator = !this.submissionWriters.includes('ANONYMOUS')
      ? [new Required()]
      : [];

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
        ${this.showCreateSubmissionButton
          ? this.createSubmissionHtml(html`<bcg-button
              variant="primary"
              class="submission-button"
              @click=${() => {
                this.showOverlay = true;
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
            </bcg-button> `)
          : ``}

        <lion-tabs class="tabs" .selectedIndex=${this.currentTabIndex}>
          <bcg-tab-button
            @click=${() => {
              this.currentTabIndex = 0;
              // necessary rebinding caused by rerender
              this.rebindForms();
            }}
            class="tab-button"
            slot="tab"
          >
            <div>
              <lion-icon
                class="button-icon"
                icon-id="bcg:general:map"
              ></lion-icon>
              Karte
            </div>
          </bcg-tab-button>
          <bcg-tab-panel slot="panel">
            ${this.currentTabIndex === 0
              ? html`
                  <div class="map-wrapper" style="height: ${this.mapHeight}px">
                    <bcg-map-overlay
                      class="bcg-overlay"
                      mapAccessToken=${this.mapAccessToken}
                      .showActionButton=${false}
                      .pinColor=${this.pinColor}
                      .closeButtonCallback=${() => this.closeOverlay()}
                      initialZoom=${this.initialZoom}
                      .maxBounds=${this.maxBounds}
                      .initialPosition=${this.initialPosition}
                      overlayWidth=${this.overlayWidth}
                      .submissions=${this.submissions}
                      .showOverlay=${this.showOverlay}
                      .geocoderInputCallback=${(input: any) => {
                        this.mapService.handleGeocoderInput(input);
                      }}
                      .markerSetCallback=${(marker: any) => {
                        this.mapService.handleMarkerInput(marker);
                      }}
                    >
                      <div class="overlay-content" slot="overlay-content">
                        ${html`
                    <lion-steps style="height: 100%" class="stepper">

                      <lion-step initial-step class="submission-step" >
                        <div class="step-content">
                          <h3>Standort auswählen</h3>
                          <h4><span class="option-1-label">Option 1: </span>Ort suchen</h4>
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
                        </div>
                        <div class="step-navigation">
                          ${
                            this.isLoggedIn ||
                            (!this.isLoggedIn && this.isHiddenUserAllowed)
                              ? '1/2'
                              : '1/3'
                          }
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
                              this.isLoggedIn ||
                              (!this.isLoggedIn && this.isHiddenUserAllowed)
                                ? await this.submitSubmission()
                                : null;
                              this.stepper?.next();
                            }
                          }}>
                            <form @submit=${(e: any) => e.preventDefault()}>
                              <h3>Ihr Hinweis</h3>
                              <bcg-textarea
                              class="input-area"
                              label="Titel"
                              placeholder=""
                              name="title"
                              .validators=${[
                                new Required(),
                                new MaxLength(105),
                              ]}
                              .modelValue="${this.currentMapSubmission.title}"
                              @model-value-changed=${({ target }: any) => {
                                this.currentMapSubmission.title = target.value;
                                this.currentMapSubmission = {
                                  ...this.currentMapSubmission,
                                };
                              }}
                              ></bcg-textarea>
                              <bcg-textarea
                              class="input-area"
                              label="Ihr Hinweis"
                              placeholder=""
                              name="description"
                              .validators=${[
                                new Required(),
                                new MaxLength(2000),
                              ]}
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
                              ></bcg-textarea>
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

                          ${
                            this.isLoggedIn ||
                            (!this.isLoggedIn && this.isHiddenUserAllowed)
                              ? '2/2'
                              : '2/3'
                          }
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
                        !this.isLoggedIn && !this.isHiddenUserAllowed
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
                                        this.submitSubmission();
                                        this.stepper?.next();
                                      }
                                    }}
                                  >
                                    <form
                                      @submit=${(e: any) => e.preventDefault()}
                                    >
                                      <h3>Über Sie</h3>
                                      <bcg-input
                                        label="Vorname${renderRequiredStringForInputs}"
                                        placeholder=""
                                        name="firstName"
                                        .validators=${hiddenUserValidator}
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
                                        label="Nachname${renderRequiredStringForInputs}"
                                        placeholder=""
                                        name="lastName"
                                        .validators=${hiddenUserValidator}
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
                                        label="E-Mail${renderRequiredStringForInputs}"
                                        placeholder=""
                                        name="email"
                                        .validators=${hiddenUserValidator}
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
                                      >
                                        <label slot="label">
                                          Ich habe die
                                          <a
                                            href="${window.origin}/Datenschutz"
                                            target="blank"
                                            >Datenschutzerklärung</a
                                          >
                                          gelesen, verstanden und bin damit
                                          einverstanden, dass meine
                                          Personendaten gespeichert werden.
                                        </label>
                                      </bcg-checkbox>
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
                                      this.contactForm.submit();
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
                `
              : ''}
          </bcg-tab-panel>

          <bcg-tab-button
            class="tab-button"
            @click=${() => {
              this.closeOverlay();
              this.currentTabIndex = 1;
            }}
            slot="tab"
          >
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
            <bcg-button
              variant="secondary"
              @click=${() => this.switchSortState()}
              class="sort-button"
            >
              <div style="margin-right: 5px">
                ${this.sortBy === 'newest' ? 'Neuste zuerst' : 'Älteste zuerst'}
              </div>
              <lion-icon
                class="expand-icon"
                icon-id=${this.sortBy === 'newest'
                  ? 'bcg:general:expand'
                  : 'bcg:general:collapse'}
              ></lion-icon>
            </bcg-button>

            <div class="list-grid">
              ${this.submissions.sort(this.sortByDateFunction).map(
                submission => html` <div style="padding: 5px;">
                  <bcg-submission-card
                    .submission=${submission}
                  ></bcg-submission-card>
                </div>`
              )}
            </div>
          </bcg-tab-panel>
        </lion-tabs>
      </div>
    `;
  }
}
