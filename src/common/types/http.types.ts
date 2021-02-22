import { Request, Response } from 'express';

export interface HttpController {
  path: string;
  router: any;
}

export interface PayloadToken {
  userId: string | number;
}

export interface DataStoredFromToken {
  userId: string | number;
}

export interface RequestWithUser extends Request {
  user?: UserFromRequest;
  res?: Response;
  session: any;
}
export interface UserFromRequest {
  userId: string | number;
}
