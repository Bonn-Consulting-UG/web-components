import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces';
import { token } from '../../../components/map-overlay/testAccessToken';
import { testLayers } from '../../../components/map-overlay/testLayers';
import '../index';

export default {
  title: 'Compositions/MaSingleSubmission',
  component: 'bcg-map-single-submission',
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
      <bcg-map-single-submission
        .submissionId=${'ea50bf99-4009-4455-8fb2-a8a85e626a1a'}
        mapAccessToken=${token}
        mapHeight="600"
        .maxBounds=${undefined}
        initialZoom="8"
        .initialPosition=${[-70.94416, 43.46633]}
        .pinColor=${'red'}
      ></bcg-map-single-submission>
    </div>
  `;

const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
