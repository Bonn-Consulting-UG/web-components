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

const DefaultTemplate: Story<ArgTypes> = () => {
  console.log(JSON.stringify(testLayers));
  return html` <div style="width: 100%; height: 600px">
    <bcg-map-layer
      mapAccessToken=${token}
      actionButtonLabel="Fachkarten"
      initialZoom="8"
      mapHeight="600"
      layers=${JSON.stringify([
        {
          id: '12345',
          category: 'Kategorie 1',
          label: 'Layer 1',
          color: 'red',
          sourceData: {
            type: 'geojson',
            data: {
              properties: {},
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [
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
                    [-67.13734, 45.13745],
                  ],
                ],
              },
            },
          },
        },
      ])}
      overlayWidth="300px"
      overlayHeader="Fachkarten"
      .showOverlay=${showOverlay}
      .pinPosition=${[-70.94416, 43.46633]}
    >
    </bcg-map-layer>
  </div>`;
};
const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
