export const sortCommentsbyCreatedAt = (p1, p2) =>
  p1.createdAt < p2.createdAt ? 1 : p1.createdAt > p2.createdAt ? -1 : 0;
