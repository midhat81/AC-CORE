import { Request, Response } from 'express';
import HazardReport from '../models/hazard-report.model';

// Creates a new hazard report in the database
export const createReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const newReport = new HazardReport(req.body);
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create hazard report', error });
  }
};

// Fetches all reports for the Admin Dashboard
export const getReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const reports = await HazardReport.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hazard reports', error });
  }
};