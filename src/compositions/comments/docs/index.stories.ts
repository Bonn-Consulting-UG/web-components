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
      submissionId="eee9e6ba-298e-4d75-a97a-e6c160ce68f2"
    ></bcg-comments>
  `;

const Submission = SubmissionComments.bind({});

Submission.args = {};

export { Default, Submission };
