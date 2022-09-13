import { Unparseable, Validator } from '@lion/form-core';

const isInterpretableValue = (mv: any) => mv && !(mv instanceof Unparseable);

export class SpamMatch extends Validator {
  static get validatorName() {
    return 'SpamMatch';
  }

  static async getMessage() {
    return `Bitte wähle sie das richtige Icon aus`;
  }

  // eslint-disable-next-line class-methods-use-this
  execute(val: any, expected: any) {
    if (isInterpretableValue(val) && isInterpretableValue(expected)) {
      return val[0] !== expected;
    }
    return false;
  }
}
