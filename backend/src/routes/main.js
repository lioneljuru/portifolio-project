import { Router } from "express";
import { router as authRoutes } from './auth.js';
import { router as indexRoutes } from './index.js';
//import { router as eventRoutes } from './event.js';

const router = Router();

router.use(authRoutes);
router.use(indexRoutes);
//router.use(eventRoutes);

export default router;