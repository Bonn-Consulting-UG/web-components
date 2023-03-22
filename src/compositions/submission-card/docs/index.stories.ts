import { html } from '@lion/core';
import { MapSubmission } from '../../../model/MapSubmission.js';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Compositions/Submission Card',
  component: 'bcg-submission-card',
  argTypes: {
    content: {
      options: []
    }
  }
};

const testSubmission: MapSubmission = {
  firstName: 'Max',
  lastName: 'Mustermann',
  email: 'Mustermann@email.de',
  title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
  description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
  _count: {
    comments: 4,
    likes: 5,
    dislikes: 2
  },
  points: [
    {longitude: -70.94416, latitude: 43.46633}
  ]
}

const Template: Story<ArgTypes> = () =>
  html`
  <bcg-submission-card
  .submission=${testSubmission}
  ></bcg-submission-card>
  `;

export const Default = Template.bind({});
