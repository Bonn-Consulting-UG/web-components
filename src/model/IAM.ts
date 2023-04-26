export interface iAmResponse {
  requestId: string;
  results: Permission[];
}

interface Permission {
  resource: iAmResource;
  actions: any;
}

interface iAmResource {
  Id: string;
  kind: string;
}