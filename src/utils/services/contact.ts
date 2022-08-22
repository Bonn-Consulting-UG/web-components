/* eslint-disable import/extensions */
const APIVersion = 'v1';

const baseURLwithApiVersion =
  process.env.NODE_ENV === 'development'
    ? `https://ifok-epart-api-dev.bonnconsulting.group/api/${APIVersion}`
    : `https://ifok-epart-api-dev.bonnconsulting.group/api/${APIVersion}`;

const contactEndpoint = `${baseURLwithApiVersion}/contact`;

export const sendContactRequest = async (payload: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    const resp = await fetch(contactEndpoint, fetchOptions);
    return resp;
  } catch (err) {
    console.error(err);
    return err;
  }
};
