import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Decorator Button(Internal Test Component)',
  component: 'bcg-button-decorator',
  argTypes: {
    label: {},
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  label: string;
}

const Template: Story<ArgTypes> = args =>
  html` <bcg-button-decorator .label="${args.label}"></bcg-button-decorator> `;

const Test = Template.bind({});

Test.args = {
  label: 'Test',
};

export { Test };
