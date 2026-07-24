import express from 'express';
import auth from '../middleware/auth.js';

import {
  addVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
  setDefaultVehicle,
} from '../controllers/garageController.js';

const router = express.Router();

router.post('/', auth, addVehicle);
router.get('/', auth, getVehicles);
router.put('/:id', auth, updateVehicle);
router.delete('/:id', auth, deleteVehicle);
router.patch('/:id/default', auth, setDefaultVehicle);

export default router;
