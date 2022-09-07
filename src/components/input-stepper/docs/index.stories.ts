import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Components/InputStepper',
  component: 'bcg-input-stepper',
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
  html` <bcg-input-stepper></bcg-input-stepper> `;

export const Default = Template.bind({});
