import { Request, Response } from 'express';
import Barangay from '../models/barangay.model';

export const getNearestBarangay = async (req: Request, res: Response): Promise<void> => {
  try {
    const { longitude, latitude } = req.query;

    if (!longitude || !latitude) {
      res.status(400).json({ message: 'Longitude and latitude are required.' });
      return;
    }

    const nearestBarangay = await Barangay.findOne({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude as string), parseFloat(latitude as string)]
          },
          // Limit the search to 3000 meters (3 kilometers)
          $maxDistance: 3000 
        }
      }
    });

    if (!nearestBarangay) {
      // This now triggers if the user is outside Angeles City
      res.status(404).json({ message: 'Location is outside the Angeles City service area.' });
      return;
    }

    res.status(200).json({ data: nearestBarangay });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating nearest location', error });
  }
};