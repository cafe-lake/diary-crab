import { Router } from "express";
import type { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../types/user";

const checkAuth = require("../middleware/checkAuth");

const router = Router();
const prisma = new PrismaClient();

router.get("/", checkAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user_id) {
    res.status(404).json();
  }

  const canvas_items = await prisma.canvasItem.findMany({
    orderBy: {
      display_order: "asc",
    },
    select: {
      id: true,
      label: true,
      url: true,
    },
  });
  res.json({ canvas_items: canvas_items });
});

module.exports = router;
