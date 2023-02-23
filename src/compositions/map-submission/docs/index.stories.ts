import { html } from '@lion/core';
import { LayerData } from '../../../model/LayerData.js';
import { Story } from '../../../model/story-interfaces.js';
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

const testLayers: LayerData[] = [
  {
    id: '12345',
    category: "Kategorie 1",
    label: "Layer 1",
    sourceData: {
      type: 'geojson',
      data: {
        properties: {},
        'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          // These coordinates outline Maine.
          'coordinates': [
          [
          [-67.13734, 45.13745],
          [-66.96466, 44.8097],
          [-68.03252, 44.3252],
          [-69.06, 43.98],
          [-70.11617, 43.68405],
          [-70.64573, 43.09008],
          [-70.75102, 43.08003],
          [-70.79761, 43.21973],
          [-70.98176, 43.36789],
          [-70.94416, 43.46633],
          [-71.08482, 45.30524],
          [-70.66002, 45.46022],
          [-70.30495, 45.91479],
          [-70.00014, 46.69317],
          [-69.23708, 47.44777],
          [-68.90478, 47.18479],
          [-68.2343, 47.35462],
          [-67.79035, 47.06624],
          [-67.79141, 45.70258],
          [-67.13734, 45.13745]
          ]
          ]
        }
      }
    }
  }
]

const token = 'pk.eyJ1IjoiY2hhbXBlbHRhIiwiYSI6ImNsZHN4M3hybzB3cWgzb3BmZTR5dTR4NGUifQ.1GA4l71P0Kl9a58_3ciLXg';

const DefaultTemplate: Story<ArgTypes> = () =>
  html`
    <bcg-map-submission
    accessToken=${token}
    overlayButtonLabel="Fachkarten"
    initialZoom="8"
    .initialPosition=${[13.5, 52.5]}
    overlayWidth="45%"
    overlayHeader="Fachkarten"
    .layers=${testLayers}
    ></bcg-map-submission>
  `;

const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
