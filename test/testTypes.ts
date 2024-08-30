import { IAnimal } from '../src/models/animals';
import { ICategory } from '../src/models/category';
import { ISpecies } from '../src/models/species';

type TestAnimal = IAnimal & {
  _id: string;
};

type TestSpecies = ISpecies & {
  _id: string;
};

type TestCategory = ICategory & {
  _id: string;
};

export { TestAnimal, TestSpecies, TestCategory };
