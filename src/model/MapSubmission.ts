import { MapData } from "./MapData";
import { Author } from "./Author";

export interface MapSubmission {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  title?: string;
  author?: Author;
  description?: string;
  points: MapData[];
  _count?: any;
  createdAt?: string;
}