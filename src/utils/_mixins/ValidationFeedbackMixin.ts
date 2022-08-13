import { dedupeMixin } from '@lion/core';
import { LitElement } from '@lion/core';

import { DefaultSuccess } from '@lion/form-core';
import '@lion/validation-feedback/define';

export const ValidationFeedbackMixinImplementation = (superclass: LitElement) =>
  class extends superclass {
    static get validationTypes() {
      return ['error', 'warning', 'success', 'info'];
    }

    constructor() {
      super();
      this.defaultValidators.push(new DefaultSuccess());
    }

    get slots() {
      return {
        ...super.slots,
        feedback: () => {
          const feedbackEl = this.createScopedElement(
            'simba-validation-feedback'
          );
          return feedbackEl;
        },
      };
    }
  };

export const ValidationFeedbackMixin = dedupeMixin(
  ValidationFeedbackMixinImplementation
);
