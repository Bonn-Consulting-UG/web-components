import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces.js';
import { token } from '../../map-overlay/testAccessToken.js';
import { testLayers } from '../../map-overlay/testLayers.js';
import '../index.js';

export default {
  title: 'Compositions/MapSubmission',
  component: 'bcg-map-submission',
  argTypes: {
    content: {},
    buttonLabel: {},
  },
};

interface ArgTypes {
  buttonLabel: string;
  content: string;
}

const DefaultTemplate: Story<ArgTypes> = () =>
  html`
    <div style="width: 1000px; height: 800px">
      <bcg-map-submission
      accessToken=${token}
      moduleId="3275cc46-38da-4033-a281-acedadc93db6"
      overlayButtonLabel="Fachkarten"
      initialZoom="8"
      .initialPosition=${[-70.94416, 43.46633]}
      overlayWidth="30%"
      overlayHeader="Fachkarten"
      .layers=${testLayers}
      ></bcg-map-submission>
    </div>
  `;

const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
