import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/Card',
  component: 'bcg-card',
  argTypes: {
    content: {
      options: []
    }
  }
};

const Template: Story<ArgTypes> = () =>
  html`
    <bcg-card
      ><slot name="content"
        ><p>Hello</p>
        <bcg-input label="Testinput" placeholder="123"></bcg-input></slot
    ></bcg-card>
  `;

export const Default = Template.bind({});
