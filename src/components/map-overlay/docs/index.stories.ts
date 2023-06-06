import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces.js';
import '../index.js';
import { token } from '../testAccessToken.js';

export default {
  title: 'Components/MapOverlay',
  component: 'bcg-map-overlay',
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

const DefaultTemplate: Story<ArgTypes> = () =>
  html`
      <div style="width: 800px; height: 600px">
        <bcg-map-overlay
          mapAccessToken=${token}
          actionButtonLabel="Open Overlay"
          initialZoom="8"
          .initialPosition=${[-70.94416, 43.46633]}
          overlayWidth="45%"
          overlayHeader="Fachkarten"
          .showOverlay=${showOverlay}
          >
          <div slot="overlay-content" style="text-align: center" >Overlay Content</div>
        </bcg-map-overlay>
      </div>`;

const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
