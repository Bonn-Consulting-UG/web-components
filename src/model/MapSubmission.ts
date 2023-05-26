import { MapData } from "./MapData";

export interface MapSubmission {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  title?: string;
  description?: string;
  points: MapData[];
  _count?: any;
  createdAt?: string;
}