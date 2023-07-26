import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces';
import '../index';

export default {
  title: 'Components/Interactive Map',
  component: 'bcg-interactive-map',
  argTypes: {
    content: {
      options: [],
    },
    pinPosition: {
      description: "[lng, lat] ; Use this property for view with one single pin (events etc.)"
    }
  },
};

const token =
  'pk.eyJ1IjoiY2hhbXBlbHRhIiwiYSI6ImNsZHN4M3hybzB3cWgzb3BmZTR5dTR4NGUifQ.1GA4l71P0Kl9a58_3ciLXg';

const Template: Story<ArgTypes> = () =>
  html` <div style="width: 800px; height: 600px;">
    <bcg-interactive-map
      mapAccessToken=${token}
      overlayButtonLabel="Fachkarten"
    ></bcg-interactive-map>
  </div>`;

export const Default = Template.bind({});

const TemplateWithPin: Story<ArgTypes> = () =>
  html` <div style="width: 800px; height: 600px;">
    <bcg-interactive-map
      mapAccessToken=${token}
      .pinPosition=${[-70.94416, 43.46633]}
    ></bcg-interactive-map>
  </div>`;

  export const WithPin = TemplateWithPin.bind({});
