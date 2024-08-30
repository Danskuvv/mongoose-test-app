import { Router } from 'express';
import {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalsByLocation,
  getAnimalsBySpecies
} from '../controllers/animals_controller';

const router = Router();

router.get('/', getAllAnimals);
router.get('/location', getAnimalsByLocation);
router.get('/:id', getAnimalById);
router.post('/', createAnimal);
router.put('/:id', updateAnimal);
router.delete('/:id', deleteAnimal);
router.get('/species/:species', getAnimalsBySpecies);


export default router;
