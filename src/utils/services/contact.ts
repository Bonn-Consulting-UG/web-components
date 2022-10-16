import { contactSubmissionEndpoint } from './config';

export const sendContactRequest = async (payload: any, moduleId: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    const resp = await fetch(contactSubmissionEndpoint(moduleId), fetchOptions);
    return resp;
  } catch (err) {
    console.error(err);
    return err;
  }
};
