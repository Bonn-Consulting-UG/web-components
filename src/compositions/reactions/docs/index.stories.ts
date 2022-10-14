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
  html` <bcg-idea-reaction moduleId="3275cc46-38da-4033-a281-acedadc93db6"></bcg-idea-reaction> `;

const Default = Template.bind({});

Default.args = {};

export { Default };
