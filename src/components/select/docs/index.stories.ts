import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/Select',
  component: 'bcg-select',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () => html`
  <bcg-select>

  <select slot="input">
    <option  selected hidden value>Sort By</option>
      <option  value="Neuste">Neuste</option>
      <option value="Beliebteste">Beliebteste</option>
      <option value="Ältest">Ältest</option>
    </select>

    </slot></bcg-select
  >
`;

export const Default = Template.bind({});
