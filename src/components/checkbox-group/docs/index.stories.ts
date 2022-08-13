import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Components/CheckboxGroup',
  component: 'bcg-checkbox-group',
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
    <bcg-checkbox-group>
      <bcg-checkbox
        label="Ich akzeptiere die 
        Datenschutzerklärung"
        .choiceValue=${'Ich akzeptiere die Datenschutzerklärung'}
      ></bcg-checkbox>
    </bcg-checkbox-group>
  `;

export const Default = Template.bind({});
