import type { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/user";

const JWT = require("jsonwebtoken");

module.exports = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  //トークン認証(トークンを持っているクライアントならプライベート記事が見れる)
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({
      errors: [
        {
          msg: "トークンが見つかりません",
        },
      ],
    });
  }

  try {
    let user = await JWT.verify(token, "SECRET_KEY");
    req.user = user;
    console.log(req);
    console.log(user.loginId);
    next();
  } catch {
    return res.status(400).json({
      errors: [
        {
          msg: "トークンが一致しません",
        },
      ],
    });
  }
};
