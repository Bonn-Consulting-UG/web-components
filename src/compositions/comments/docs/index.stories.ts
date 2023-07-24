import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces';
import '../index';

export default {
  title: 'Compositions/Comments',
  component: 'bcg-comments',
};

interface ArgTypes {
  buttonLabel: string;
  content: string;
}
const TemplateComments: Story<ArgTypes> = () =>
  html`
    <bcg-comments
      moduleId="3275cc46-38da-4033-a281-acedadc93db6"
    ></bcg-comments>
  `;

const Default = TemplateComments.bind({});

Default.args = {};

const SubmissionComments: Story<ArgTypes> = () =>
  html`
    <bcg-comments
      submissionId="ea50bf99-4009-4455-8fb2-a8a85e626a1a"
    ></bcg-comments>
  `;

const Submission = SubmissionComments.bind({});

Submission.args = {};

export { Default, Submission };
