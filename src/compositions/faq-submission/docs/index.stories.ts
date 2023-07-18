import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces';
import '../index';

export default {
  title: 'Compositions/FaqSubmission',
  component: 'bcg-faq-submission',
  argTypes: {
    content: {},
    buttonLabel: {},
  },
};

interface ArgTypes {
  buttonLabel: string;
  content: string;
}

const DefaultTemplate: Story<ArgTypes> = () =>
  html`<bcg-faq-submission
    moduleId="3275cc46-38da-4033-a281-acedadc93db6"
  ></bcg-faq-submission> `;

const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
