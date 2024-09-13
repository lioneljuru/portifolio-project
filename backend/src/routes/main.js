import { Router } from "express";
import { router as authRoutes } from './auth.js';
import { router as indexRoutes } from './index.js';
import { router as eventRoutes } from './eventRoutes.js';
import { router as rsvpRoutes } from './rsvpRoutes.js';

const router = Router();

router.use(authRoutes);
router.use(indexRoutes);
router.use(eventRoutes);
router.use(rsvpRoutes);

export default router;