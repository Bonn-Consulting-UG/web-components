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
    style="width: 300px;"
      ><slot name="content"
        ><div style="padding: 5px;">
          <p>Hello</p>
          <bcg-input label="Testinput" placeholder="123"></bcg-input>
        </div>
      </slot
    ></bcg-card>
  `;

export const Default = Template.bind({});
