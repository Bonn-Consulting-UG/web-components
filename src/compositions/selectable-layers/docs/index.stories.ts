import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces.js';
import { testLayers } from '../../../components/map-overlay/testLayers.js';
import '../index.js';
import { LayerData } from '../../../model/LayerData.js';

export default {
  title: 'Compositions/SelectableLayers',
  component: 'bcg-selectable-layers',
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
  <bcg-selectable-layers
  .layers=${testLayers}
  .activeLayersChanged=${(activeLayers: LayerData[]) => console.log(activeLayers)}
  ></bcg-selectable-layers>
`;

const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
