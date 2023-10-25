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
      submissionId="69ee348e-33e7-4148-8313-359f1f18ea9b"
    ></bcg-comments>
  `;

const Submission = SubmissionComments.bind({});

Submission.args = {};

export { Default, Submission };
