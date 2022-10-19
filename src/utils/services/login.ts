import {
  changePasswordEndpoint,
  changeUserDataEndpoint,
  checkVerifyCodeEndpoint,
  depleteUserEndpoint,
  loginEndpoint,
  registerEndpoint,
  resetPasswordEndpoint,
} from './config';

export const sendRegisterRequest = async (newUser: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    };

    const resp = await fetch(registerEndpoint, fetchOptions);
    return resp;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const checkVerifyCode = async (userID: any, code: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    };

    const resp = await fetch(checkVerifyCodeEndpoint(userID), fetchOptions);
    return resp;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const sendLoginRequest = async (user: any) => {
  console.log(user);
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const resp = await fetch(loginEndpoint, fetchOptions);
    const respData = await resp.json();
    if (respData.accessToken && resp.status === 201) {
      await localStorage.setItem('accessToken', respData.accessToken);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }

    return resp.status;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const sendUserDataChangeRequest = async ({
  given_name,
  family_name,
  sub,
}: any) => {
  try {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ firstName: given_name, lastName: family_name }),
    };
    console.log(sub);
    const resp = await fetch(changeUserDataEndpoint(sub), fetchOptions);
    return resp.json();
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const sendPasswordChangeRequest = async ({
  newPassword,
  currentPassword,
  userId,
}: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ newPassword, currentPassword }),
    };
    console.log(userId);
    const resp = await fetch(changePasswordEndpoint, fetchOptions);
    console.log('sent');
    return resp.json();
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const sendUserDeleteRequest = async (user: any) => {
  try {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ user }),
    };

    const resp = await fetch(depleteUserEndpoint(user), fetchOptions);
    localStorage.removeItem('accessToken');
    return resp.json();
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const sendNewVerifyCodeRequest = async (userId: any) => {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const resp = await fetch(checkVerifyCodeEndpoint(userId), fetchOptions);

    return resp;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const sendPasswordResetRequest = async (data: any) => {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    };

    const resp = await fetch(changePasswordEndpoint, fetchOptions);

    return resp;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const sendPasswordChangeInitRequest = async (data: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const resp = await fetch(resetPasswordEndpoint, fetchOptions);

    return resp;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};
