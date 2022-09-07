import { dedupeMixin } from '@lion/core';

export const FieldNameLowercaseMixinImplementation = (
  superclass: HTMLElement
) =>
  class extends superclass {
    get fieldName(): string {
      return (this.__fieldName || this.label || this.name || '').toLowerCase();
    }

    set fieldName(value: string) {
      this.__fieldName = value;
    }
  };

export const FieldNameLowercaseMixin = dedupeMixin(
  FieldNameLowercaseMixinImplementation
);
