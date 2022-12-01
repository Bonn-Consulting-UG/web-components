import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Components/Radio Group',
  component: 'bcg-radio-group',
  argTypes: {
    content: {
      options: [],
    },
  },
};

interface ContentArgs {
  button: string;
  panel: string;
}

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  content: Array<ContentArgs>;
}

const Template: Story<ArgTypes> = () =>
  html`
    <bcg-radio-group>
      <bcg-radio .choiceValue=${'Label 1'}>
     <label  slot="label"> <bcg-icon .icon="bcg:comments:thumbsup">qws</bcg-icon>     </label> 
      <!-- <bcg-radio .choiceValue=${'Label 2'}>
        <p slot="label">Label 2</p></bcg-radio
      >
      <bcg-radio .choiceValue=${'Label 3'}>
        <p slot="label">Label 3</p></bcg-radio
      >
      <bcg-radio .choiceValue=${'Label 4'}>
        <p slot="label">Label 4</p></bcg-radio
      > -->
    </bcg-radio-group>
  `;

export const Default = Template.bind({});
