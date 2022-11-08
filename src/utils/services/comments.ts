import {
  getCommentsEndpointforModule,
  setCommentsEndpoint,
  reactionEndPoint,
  reportCommentEndpoint,
  reactionDelteEndPoint,
  approveCommentEndpoint,
  censorCommentEndpoint,
} from './config';

export const getAllCommentsForModule = async (moduleID: any) => {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken')
          ? `Bearer ${localStorage.getItem('accessToken')}`
          : '',
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

export const getAllSubmissionsForAModule = async (submissionId: any) => {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken')
          ? `Bearer ${localStorage.getItem('accessToken')}`
          : '',
      },
    };

    const resp = await fetch(
      getCommentsEndpointforModule(submissionId),
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
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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

export const removeReaction = async (reactionId: any) => {
  try {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };

    const resp = await fetch(reactionDelteEndPoint(reactionId), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const reportComment = async (commentId: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({
        reason: '',
      }),
    };

    const resp = await fetch(reportCommentEndpoint(commentId), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const approveComment = async (commentId: any) => {
  try {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };

    const resp = await fetch(approveCommentEndpoint(commentId), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const censorComment = async (commentId: any) => {
  try {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };

    const resp = await fetch(censorCommentEndpoint(commentId), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const addCommentToComment = async (
  commentId: any,
  commentConent: any
) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({
        title: '',
        content: commentConent,
        parentCommentId: commentId,
      }),
    };

    const resp = await fetch(setCommentsEndpoint, fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};
