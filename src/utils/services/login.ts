/* eslint-disable import/extensions */
const APIVersion = 'v1';
const baseURLwithApiVersion = `http://localhost:3001/api/${APIVersion}`;
const registerEndpoint = `${baseURLwithApiVersion}/register`;
const loginEndpoint = `${baseURLwithApiVersion}/login`;
const checkVerifyCodeEndpoint = `${baseURLwithApiVersion}/verify`;

export const sendRegisterRequest = async (newUser: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    };

    const resp = await fetch(registerEndpoint, fetchOptions);
    console.log(resp.json());
    return resp;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const checkVerifyCode = async (code: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(code)
    };

    const resp = await fetch(checkVerifyCodeEndpoint, fetchOptions);
    console.log(resp.json());
    return resp;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const sendLoginRequest = async (user: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    const resp = await fetch(loginEndpoint, fetchOptions);
    console.log(resp.json());
    return resp;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};
