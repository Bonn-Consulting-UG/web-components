import {
  getCommentsEndpointforModule,
  setCommentsEndpoint,
  reactionEndPoint,
  reportCommentEndpoint,
} from './config';

export const getAllCommentsForModule = async (moduleID: any) => {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const resp = await fetch(
      getCommentsEndpointforModule(moduleID),
      fetchOptions
    );
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const addCommentToModule = async (moduleID: any, commentConent: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
      },
      body: JSON.stringify({
        title: '',
        content: commentConent,
        moduleId: moduleID,
      }),
    };

    const resp = await fetch(setCommentsEndpoint, fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const addReaction = async (
  type: any,
  commentId: any,
  moduleId?: any
) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
      },
      body: JSON.stringify({
        ...type,
        commentId: moduleId ? '' : commentId,
        moduleId,
      }),
    };

    const resp = await fetch(reactionEndPoint, fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const reportComment = async () => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(''),
    };

    const resp = await fetch(reportCommentEndpoint, fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};
