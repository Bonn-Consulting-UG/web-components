import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces.js';
import { token } from '../../../components/map-overlay/testAccessToken.js';
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

// test maxBounds: [[-73.9876, 40.7661], [-73.9397, 40.8002]]

const DefaultTemplate: Story<ArgTypes> = () =>
  html`
    <div style="width: 100%; height: 800px">
      <bcg-map-submission
        mapAccessToken=${token}
        moduleId="3275cc46-38da-4033-a281-acedadc93db6"
        mapHeight="600"
        .maxBounds=${undefined}
        overlayButtonLabel="Fachkarten"
        actionButtonLabel="Fachkarten"
        initialZoom="8"
        .initialPosition=${[-70.94416, 43.46633]}
        overlayWidth="300px"
        overlayHeader="Fachkarten"
        .pinColor=${'red'}
      ></bcg-map-submission>
    </div>
  `;

const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
