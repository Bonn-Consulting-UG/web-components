import { IsEmail, MaxLength, MinLength, Required } from '@lion/form-core';

Required.getMessage = async value => `Bitte geben Sie eine Nachricht ein`;
IsEmail.getMessage = async () => 'Muss eine gültige Email sein';

MaxLength.getMessage = async value =>
  `Hier sind maximal ${value?.params} Zeichen erlaubt`;

MinLength.getMessage = async value =>
  `Bitte geben Sie mindestens ${value?.params} Zeichen ein`;

export { Required, MaxLength, MinLength, IsEmail };
