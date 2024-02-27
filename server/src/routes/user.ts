import { Router } from "express";
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../types/user";

const checkAuth = require("../middleware/checkAuth");

const router = Router();
const prisma = new PrismaClient();

router.get(
  "/my-info",
  checkAuth,
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user_id) {
      res.status(404).json();
    }
    const user = await prisma.user.findUnique({
      where: {
        id: req.user_id,
      },
      select: {
        id: true,
        name: true,
        profile_img_url: true,
      },
    });
    res.json({ user: user });
  }
);

module.exports = router;
