import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces.js';
import { token } from '../../../components/map-overlay/testAccessToken.js';
import { testLayers } from '../../../components/map-overlay/testLayers.js';
import '../index.js';

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
html`
  <div style="width: 100%; height: 600px">
    <bcg-map-layer
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
