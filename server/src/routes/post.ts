import { Router } from "express";
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

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
router.post("/", (req: Request, res: Response) => {
  try {
    let form = new multiparty.Form();
    form.parse(req, async function (err: any, fields: any, files: any) {
      const base64_data = fields.img[0];
      const decode_data = base64.decode(
        base64_data.replace("data:image/png;base64,", "")
      );
      const target_folder = process.env.S3_STORE_FOLDER;
      const user = await prisma.user.findFirst();
      if (!user) {
        throw Error;
      }
      const now = new Date().getTime();
      const filename = String(user.id) + "-" + String(now);
      const command = new PutObjectCommand({
        Bucket: "diary-crab-pictures",
        Key: target_folder + filename,
        Body: decode_data,
        ContentType: "image/png",
      });
      await s3.send(command);
      await prisma.post.create({
        data: {
          image_url:
            "https://diary-crab-pictures.s3." +
            process.env.AWS_S3_REGION +
            ".amazonaws.com/" +
            target_folder +
            filename,
          text: fields.text[0],
          author_id: user.id,
        },
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
