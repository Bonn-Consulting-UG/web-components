import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces';
import '../index';

export default {
  title: 'Components/Fieldset',
  component: 'bcg-fieldset',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () => html` <bcg-fieldset></bcg-fieldset> `;

export const Default = Template.bind({});
