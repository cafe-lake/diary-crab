import type { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/user";
import { PrismaClient } from "@prisma/client";

const JWT = require("jsonwebtoken");
const prisma = new PrismaClient();

module.exports = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
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
    const data = await JWT.verify(token, "SECRET_KEY");
    const user = await prisma.user.findUnique({
      where: {
        login_id: data.loginId,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      throw Error;
    }
    req.user_id = user.id;
    console.log(req);
    console.log(user.id);
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
