import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();
const checkAuth = require("../middleware/checkAuth");

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

module.exports = router;
