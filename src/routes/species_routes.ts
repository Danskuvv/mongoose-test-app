import { Router } from 'express';
import {
  getAllSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies,
  getSpeciesByArea
} from '../controllers/species_controller';

const router = Router();

router.get('/', getAllSpecies);
router.get('/:id', getSpeciesById);
router.post('/', createSpecies);
router.put('/:id', updateSpecies);
router.delete('/:id', deleteSpecies);
router.post('/area', getSpeciesByArea);

export default router;
