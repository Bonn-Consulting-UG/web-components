import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces';
import '../index';

import '../../../components/index';

export default {
  title: 'Compositions/ContactSubmission',
  component: 'bcg-cantact-submission',
  argTypes: {
    'Wer kann das Einreichungsformular sehen?': { control: 'boolean' },
  },
};

interface ArgTypes {
  buttonLabel: string;
  content: string;
}

const DefaultTemplate: Story<ArgTypes> = () =>
  html`<bcg-contact-submission
    moduleId="3275cc46-38da-4033-a281-acedadc93db6"
  ></bcg-contact-submission> `;

const ContactSubmission = DefaultTemplate.bind({});

ContactSubmission.args = {};

export { ContactSubmission };
