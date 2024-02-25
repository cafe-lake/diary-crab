import type { Request } from "express";

export interface User {
  user_name: String;
  login_id: String;
  password: String;
  password_check: String;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}
