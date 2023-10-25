import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces';
import '../index';

export default {
  title: 'Components/Switch',
  component: 'bcg-switch',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () => html`
  <bcg-switch
    label="Label"
    help-text="Help text"
    @checked-changed=${(ev: any) => console.log(ev.target.checked)}
  >
  </bcg-switch>
`;

export const Default = Template.bind({});
