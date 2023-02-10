import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces.js';
import '../index.js';

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
      submissionId="95484971-42ac-4f7d-84e6-1db45efe13cf"
    ></bcg-comments>
  `;

const Submission = SubmissionComments.bind({});

Submission.args = {};

export { Default, Submission };
