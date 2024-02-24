import { Router } from "express";
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const checkAuth = require("../middleware/checkAuth");
const multiparty = require("multiparty");
const AWS = require("aws-sdk");
const base64 = require("urlsafe-base64");

const router = Router();
const s3 = new AWS.S3();
const prisma = new PrismaClient();

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

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
      const params = {
        Bucket: "diary-crab-pictures",
        Key: `/ファイル名.png`,
        Body: decode_data,
        ContentType: "image/png",
      };
      s3.upload(params, async (err: any, data: any) => {
        if (err) {
          console.log("upload失敗");
          console.log(err);
          return;
        }
        const user = await prisma.user.findFirst();
        if (!user) {
          throw Error;
        }
        await prisma.post.create({
          data: {
            image_url: data.Location,
            text: fields.text[0],
            author_id: user.id,
          },
        });
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
