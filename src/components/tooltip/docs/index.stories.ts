import { html } from '@lion/core';
import '../index.js';
import '../../textarea/index.js';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';

export default {
  title: 'Components/Tooltip',
  component: 'bcg-tooltip',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () => html` <bcg-tooltip has-arrow>
  <button slot="invoker" class="demo-tooltip-invoker">Hover me</button>
  <div slot="content">This is a tooltip</div>
</bcg-tooltip>`;

export const Default = Template.bind({});
