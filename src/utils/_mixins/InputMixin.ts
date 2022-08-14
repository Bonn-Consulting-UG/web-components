import { dedupeMixin } from '@lion/core';

import { ThemeMixin } from 'dark-theme-utils';
import { LocalizeLabelMixin } from './LocalizeLabelMixin.js';
import { ValidationFeedbackMixin } from './ValidationFeedbackMixin.js';
import { FieldNameLowercaseMixin } from './FieldNameLowercaseMixin.js';

export const InputMixinImplementation = (superclass: HTMLAllCollection) =>
  class extends ThemeMixin(
    LocalizeLabelMixin(
      ValidationFeedbackMixin(FieldNameLowercaseMixin(superclass))
    )
  ) {
    static get styles() {
      return [...super.styles];
    }
  };

export const InputMixin = dedupeMixin(InputMixinImplementation);
