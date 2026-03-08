import express from 'express';
import { createReport, getReports } from '../controllers/hazard-report.controller';
import { upload } from '../middlewares/upload.middleware';

const router = express.Router();

// The upload.single('image') middleware catches the file from the frontend
router.post('/', upload.single('image'), createReport);
router.get('/', getReports);

export default router;