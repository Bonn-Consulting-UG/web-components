import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces';
import { token } from '../../../components/map-overlay/testAccessToken';
import { testLayers } from '../../../components/map-overlay/testLayers';
import '../index';

export default {
  title: 'Compositions/MapLayer',
  component: 'bcg-map-layer',
  argTypes: {
    content: {},
    buttonLabel: {},
  },
};

interface ArgTypes {
  buttonLabel: string;
  content: string;
}

let showOverlay = true;
// test maxBounds: [[-73.9876, 40.7661], [-73.9397, 40.8002]]

const DefaultTemplate: Story<ArgTypes> = () =>
  html` <div style="width: 100%; height: 600px">
    <bcg-map-layer
      .submissionId=${'ea50bf99-4009-4455-8fb2-a8a85e626a1a'}
      mapAccessToken=${token}
      actionButtonLabel="Fachkarten"
      initialZoom="8"
      mapHeight="600"
      .layers=${testLayers}
      .initialPosition=${[-70.94416, 43.46633]}
      overlayWidth="300px"
      overlayHeader="Fachkarten"
      .showOverlay=${showOverlay}
    >
    </bcg-map-layer>
  </div>`;

const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
