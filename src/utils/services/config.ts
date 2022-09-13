// Base
const APIVersion = 'v1';
const baseURLwithApiVersion = `https://ifok-epart-api-dev.bonnconsulting.group/api/${APIVersion}`;

// Login/User
export const registerEndpoint = `${baseURLwithApiVersion}/register`;
export const loginEndpoint = `${baseURLwithApiVersion}/login`;
export const depleteUserEndpoint = (userID: string) =>
  `${baseURLwithApiVersion}/users/${userID}`;

export const changePasswordEndpoint = (userID: string) =>
  `${baseURLwithApiVersion}/users/${userID}/change-password`;

export const changeUserDataEndpoint = (userID: string) =>
  `${baseURLwithApiVersion}/users/${userID}`;

export const checkVerifyCodeEndpoint = (userID: string) =>
  `${baseURLwithApiVersion}/users/${userID}/verify`;

// Forms
export const contactSubmissionEndpoint = (moduleID: any) =>
  `${baseURLwithApiVersion}/modules/${moduleID}/contact-submisson`;
export const faqSubmissionEndpoint = (moduleID: any) =>
  `${baseURLwithApiVersion}/modules/${moduleID}/faq-submisson`;
export const ideaSubmissionEndpoint = (moduleID: any) =>
  `${baseURLwithApiVersion}/modules/${moduleID}/idea-submisson`;

// Modules
export const getAllModulesEndpoint = `${baseURLwithApiVersion}/modules`;
export const getModuleEndpoint = (moduleId: number) =>
  `${baseURLwithApiVersion}/modules/${moduleId}`;

// Comments
export const getCommentsEndpoint = (moduleId: number) =>
  `${baseURLwithApiVersion}/modules/${moduleId}/comments`;

export const setCommentsEndpoont = (moduleId: number) =>
  getCommentsEndpoint(moduleId);

export const getCommentEndpoint = (moduleId: number, commentID: number) =>
  `${baseURLwithApiVersion}/modules/${moduleId}/comments/${commentID}`;

export const setCommentEndpoont = (moduleId: number, commentID: number) =>
  getCommentEndpoint(moduleId, commentID);

export const getCommentReactionEndpoint = (
  moduleId: number,
  commentID: number
) =>
  `${baseURLwithApiVersion}/modules/${moduleId}/comments/${commentID}/reaction`;

export const getCommentReactionWithIdEndpoint = (
  moduleId: number,
  commentId: number,
  reactionId: number
) =>
  `${baseURLwithApiVersion}/modules/${moduleId}/comments/${commentId}/reaction/${reactionId}`;
