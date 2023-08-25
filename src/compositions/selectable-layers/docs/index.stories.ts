import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces';
import { testLayers } from '../../../components/map-overlay/testLayers';
import '../index';
import { LayerData } from '../../../model/LayerData';

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

const DefaultTemplate: Story<ArgTypes> = () => {
  console.log(123);
  return html`
    <bcg-selectable-layers
      .layers=${testLayers}
      .activeLayersChanged=${(activeLayers: LayerData[]) =>
        console.log(activeLayers)}
    ></bcg-selectable-layers>
  `;
};

const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
