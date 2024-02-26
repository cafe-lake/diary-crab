import { Router } from "express";
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../types/user";
import { Post } from "../types/post";

const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { fromSSO } = require("@aws-sdk/credential-provider-sso");
const multiparty = require("multiparty");
const base64 = require("urlsafe-base64");

const checkAuth = require("../middleware/checkAuth");

const router = Router();
const prisma = new PrismaClient();

const credentials = fromSSO({
  profile: process.env.AWS_PROFILE,
  ssoStartUrl: process.env.AWS_SSO_START_URL,
  ssoAccountId: process.env.AWS_ACCOUNT_ID,
  ssoRegion: process.env.AWS_REGION,
  ssoRoleName: process.env.AWS_SSO_ROLE_NAME,
  ssoSession: process.env.AWS_SSO_SESSION,
});

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
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

router.post("/", checkAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    let form = new multiparty.Form();
    form.parse(req, async function (err: any, fields: any, files: any) {
      if (!req.user_id) {
        throw Error;
      }
      // 画像処理
      console.log(fields);
      const base64_data = fields.img[0];
      const decode_data = base64.decode(
        base64_data.replace("data:image/png;base64,", "")
      );

      // AWS S3処理
      const target_folder = process.env.S3_STORE_FOLDER;
      const now = new Date().getTime();
      const filename = String(req.user_id) + "-" + String(now) + ".png";
      const command = new PutObjectCommand({
        Bucket: "diary-crab-pictures",
        Key: target_folder + filename,
        Body: decode_data,
        ContentType: "image/png",
        ACL: "public-read",
      });
      await s3.send(command);

      // 投稿を保存
      const new_post: Post = {
        image_url:
          "https://diary-crab-pictures.s3." +
          process.env.AWS_S3_REGION +
          ".amazonaws.com/" +
          target_folder +
          filename,
        text: fields.text[0],
        author_id: req.user_id,
      };
      await prisma.post.create({
        data: new_post,
      });
    });
  } catch {
    res.status(400).json({
      msg: "エラー",
    });
  }
  res.json();
});

module.exports = router;
