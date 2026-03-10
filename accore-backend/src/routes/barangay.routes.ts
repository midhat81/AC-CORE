import { Router } from 'express';
import { getNearestBarangay } from '../controllers/barangay.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// We use verifyToken to ensure only authenticated users can access the route.
router.get('/nearest-barangay', verifyToken, getNearestBarangay);

export default router;