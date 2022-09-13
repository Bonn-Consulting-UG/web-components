import { html, TemplateResult } from '@lion/core';
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
    <bcg-card
      ><slot name="content"
        ><p>Hello</p>
        <bcg-input label="Testinput" placeholder="123"></bcg-input></slot
    ></bcg-card>
  `;

export const Default = Template.bind({});
