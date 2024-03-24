import { Router } from "express";
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const { body, validationResult } = require("express-validator");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

router.get("/", (req: Request, res: Response) => {
  console.log("hogehoge");
  res.send("auth is working");
});

//ユーザー新規登録
router.post(
  "/register",
  body("userName").isLength({ min: 1 }).withMessage('名前を入力してください'),
  body("loginId").isLength({ min: 6 }).withMessage('6文字以上にしてください'),
  body("password").isLength({ min: 8 }).withMessage('8文字以上にしてください'),
  async (req: Request, res: Response) => {
    const { userName, loginId, password, passwordConfirm } = req.body;

    //入力欄のバリデーションチェック。
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body);
      return res.status(400).json({ errors: errors.array() });
    }

    //DBにユーザーが存在するかのチェック。存在したらエラーを吐かせる。
    const user = await prisma.user.findFirst({
      where: {
        login_id: loginId,
      },
    });
    console.log(user);
    if (user) {
      return res.status(400).json([
        {
          msg: "すでにそのユーザーは存在します。",
        },
      ]);
    }

    //パスワードのハッシュ化(ランダムな文字列。復号するのは非常に困難)
    let hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name: userName,
        login_id: loginId,
        password: hashedPassword,
        crab_id: 1,
      },
    });

    //トークンの発行(JWT)->セッションIDみたいなもの。トークン=許可証を渡す。
    const token = await JWT.sign(
      {
        loginId,
      },
      "SECRET_KEY",
      { expiresIn: "365d" }
    );

    console.log(loginId, password);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    return res.json({
      token: token,
    });
  }
);

router.post("/login", async (req: Request, res: Response) => {
  const { loginId, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      login_id: loginId,
    },
  });

  if (!user) {
    return res.status(400).json([
      {
        path: "loginId",
        msg: "そのユーザーは存在しません",
      },
    ]);
  }

  //パスワード照合
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json([
      {
        path: "password",
        msg: "パスワードが違います",
      },
    ]);
  }

  const token = await JWT.sign(
    {
      loginId,
    },
    "SECRET_KEY",
    { expiresIn: "365d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
  });

  return res.json({
    token: token,
  });
});

module.exports = router;
