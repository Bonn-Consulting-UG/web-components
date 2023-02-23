import { html, property, ScopedElementsMixin } from "@lion/core";
import { BcgModule } from "../../components/module";
import { LayerData } from "../../model/LayerData";
import { mapSubmissionStyle } from './style-map-submission';

export class BcgMapSubmission extends ScopedElementsMixin(BcgModule) {

  // settable properties

  // map-overlay properties
  @property({type: String}) overlayButtonLabel = 'Open Overlay';
  @property({type: Array}) layers: LayerData[] = [];
  @property({type: String}) overlayHeader: string = "Overlay";
  @property({type: String}) overlayWidth: string = "40%";
  // mapbox properties
  @property({type: String}) accessToken: string = '';
  @property({type: Array}) initialPosition: [number, number] = [13.4, 52.51];
  @property({type: Number}) initialZoom = 10;

  // internal use


  static get styles() {
    return [ mapSubmissionStyle ];
  }
  render() {
    return html`
      <div>Map Submission</div>
    `;
  }
}
