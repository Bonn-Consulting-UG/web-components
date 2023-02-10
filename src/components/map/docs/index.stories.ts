import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/Interactive Map',
  component: 'bcg-interactive-map',
  argTypes: {
    content: {
      options: []
    }
  }
};

const Template: Story<ArgTypes> = () =>
  html` <bcg-interactive-map></bcg-interactive-map> `;

export const Default = Template.bind({});
