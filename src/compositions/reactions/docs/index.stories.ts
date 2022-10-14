import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Compositions/Reaction',
  component: 'bcg-reaction',
  argTypes: {
    content: {},
    buttonLabel: {}
  }
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  buttonLabel: string;
  content: string;
}
const Template: Story<ArgTypes> = () =>
  html` <bcg-idea-reaction moduleId="2b3006fd-8e18-41ad-a763-6b63482cbcdf"></bcg-idea-reaction> `;

const Default = Template.bind({});

Default.args = {};

export { Default };
