export const sortCommentsbyCreatedAt = (p1: any, p2: any) =>
  p1.createdAt < p2.createdAt ? 1 : p1.createdAt > p2.createdAt ? -1 : 0;
