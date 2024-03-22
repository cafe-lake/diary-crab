import { Router } from "express";
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../types/user";
import { Post } from "../types/post";

import { fromContainerMetadata } from "@aws-sdk/credential-providers";

const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { fromSSO } = require("@aws-sdk/credential-provider-sso");
const multiparty = require("multiparty");
const base64 = require("urlsafe-base64");

const checkAuth = require("../middleware/checkAuth");

const router = Router();
const prisma = new PrismaClient();

const credentials = () => {
  switch (process.env.NODE_ENV) {
    case "local":
      return fromSSO({
        profile: process.env.AWS_PROFILE,
        ssoStartUrl: process.env.AWS_SSO_START_URL,
        ssoAccountId: process.env.AWS_ACCOUNT_ID,
        ssoRegion: process.env.AWS_REGION,
        ssoRoleName: process.env.AWS_SSO_ROLE_NAME,
        ssoSession: process.env.AWS_SSO_SESSION,
      });
    case "develop":
      return null;
  }
};

const s3 = new S3Client({
  region: "ap-northeast-1",
  credentials: credentials,
});

router.get("/public", (req: Request, res: Response) => {
  res.json();
});

// router.get(
//   "/private",
//   (req, res, next) => {
//     const userVaild = false;
//     // const userVaild = true;

//     if (!userVaild) {
//       res.status(400).json({
//         msg: "権限がありません",
//       });
//     } else {
//       next();
//     }
//   },
//   (req, res) => {
//     res.json(privatePosts);
//   }
// );
router.get("/private", checkAuth, (req: Request, res: Response) => {
  res.json();
});

router.get("/", checkAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user_id) {
    res.status(404).json();
  }
  const current_page = Number(req.query.current_page);
  const posts = await prisma.post.findMany({
    skip: 2 * current_page - 2,
    take: 2,
    where: {
      author_id: req.user_id,
    },
    orderBy: {
      created_at: "asc",
    },
    select: {
      image_url: true,
      text: true,
    },
  });
  res.json({ posts: posts });
});

router.post("/", checkAuth, (req: AuthenticatedRequest, res: Response) => {
  let form = new multiparty.Form();
  form.parse(req, async function (err: any, fields: any, files: any) {
    if (!req.user_id) {
      throw Error;
    }
    // 画像処理
    const base64_data = fields.img[0];
    const decode_data = base64.decode(
      base64_data.replace("data:image/png;base64,", "")
    );

    // AWS S3処理
    const now = new Date().getTime();
    const filename = String(req.user_id) + "-" + String(now) + ".png";
    const command = new PutObjectCommand({
      Bucket: process.env.DIARYCRABS3_NAME,
      Key: "posts/" + filename,
      Body: decode_data,
      ContentType: "image/png",
      ACL: "public-read",
    });

    try {
      await s3.send(command);
    } catch (error) {
      res.status(500).json({ error: String(error) });
      return;
    }

    // 投稿を保存
    const new_post: Post = {
      image_url:
        "https://" +
        process.env.DIARYCRABS3_NAME +
        ".s3.ap-northeast-1.amazonaws.com/posts/" +
        filename,
      text: fields.text[0],
      author_id: req.user_id,
    };
    await prisma.post.create({
      data: new_post,
    });
    res.json();
  });
});

module.exports = router;
