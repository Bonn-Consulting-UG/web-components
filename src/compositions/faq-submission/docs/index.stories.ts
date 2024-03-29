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

const FaqTemplate: Story<ArgTypes> = () =>
  html`<bcg-faq-view
    moduleId="37eb968b-a676-4171-ac79-b28569a5748a"
  ></bcg-faq-view>`;

const FAQView = FaqTemplate.bind({});

Default.args = {};

export { Default, FAQView };
