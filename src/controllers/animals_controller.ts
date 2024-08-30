import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Animal from '../models/animals';

export const getAllAnimals = async (req: Request, res: Response) => {
  try {
    const animals = await Animal.aggregate([
      {
        $lookup: {
          from: "species",
          localField: "species",
          foreignField: "_id",
          as: "speciesData"
        }
      },
      {
        $unwind: "$speciesData"
      },
      {
        $lookup: {
          from: "categories",
          localField: "speciesData.category",
          foreignField: "_id",
          as: "categoryData"
        }
      },
      {
        $unwind: "$categoryData"
      },
      {
        $project: {
          _id: 1,
          animal_name: 1,
          birthdate: 1,
          location: 1,
          species: {
            _id: "$speciesData._id",
            species_name: "$speciesData.species_name",
            category: {
              _id: "$categoryData._id",
              category_name: "$categoryData.category_name"
            }
          }
        }
      }
    ]);
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getAnimalById = async (req: Request, res: Response) => {
  try {
    const animal = await Animal.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: "species",
          localField: "species",
          foreignField: "_id",
          as: "speciesData"
        }
      },
      {
        $unwind: "$speciesData"
      },
      {
        $lookup: {
          from: "categories",
          localField: "speciesData.category",
          foreignField: "_id",
          as: "categoryData"
        }
      },
      {
        $unwind: "$categoryData"
      },
      {
        $project: {
          _id: 1,
          animal_name: 1,
          birthdate: 1,
          location: 1,
          species: {
            _id: "$speciesData._id",
            species_name: "$speciesData.species_name",
            category: {
              _id: "$categoryData._id",
              category_name: "$categoryData.category_name"
            }
          }
        }
      }
    ]);
    res.json(animal[0]);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const createAnimal = async (req: Request, res: Response) => {
  try {
    console.log('Request Body:', req.body); // Log the request body
    const animal = new Animal(req.body);
    await animal.save();
    console.log('Created Animal:', animal); // Log the created animal
    res.status(201).json({
      message: 'Animal created',
      data: animal,
    });
  } catch (err) {
    console.error('Error:', err); // Log the error
    res.status(400).json({ error: (err as Error).message });
  }
};

export const updateAnimal = async (req: Request, res: Response) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!animal) return res.status(404).json({ error: 'Animal not found' });
    res.json(animal);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteAnimal = async (req: Request, res: Response) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Animal not found' });
    res.json({ message: 'Animal deleted' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getAnimalsByLocation = async (req: Request, res: Response) => {
  try {
    const { coordinates } = req.body;
    const animals = await Animal.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates },
          distanceField: "dist.calculated",
          spherical: true
        }
      },
      {
        $lookup: {
          from: "species",
          localField: "species",
          foreignField: "_id",
          as: "speciesData"
        }
      },
      {
        $unwind: "$speciesData"
      },
      {
        $lookup: {
          from: "categories",
          localField: "speciesData.category",
          foreignField: "_id",
          as: "categoryData"
        }
      },
      {
        $unwind: "$categoryData"
      },
      {
        $project: {
          _id: 1,
          animal_name: 1,
          birthdate: 1,
          location: 1,
          species: {
            _id: "$speciesData._id",
            species_name: "$speciesData.species_name",
            category: {
              _id: "$categoryData._id",
              category_name: "$categoryData.category_name"
            }
          }
        }
      }
    ]);
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getAnimalsBySpecies = async (req: Request, res: Response) => {
  try {
    const animals = await Animal.aggregate([
      { $match: { species: new mongoose.Types.ObjectId(req.params.species) } },
      {
        $lookup: {
          from: "species",
          localField: "species",
          foreignField: "_id",
          as: "speciesData"
        }
      },
      {
        $unwind: "$speciesData"
      },
      {
        $lookup: {
          from: "categories",
          localField: "speciesData.category",
          foreignField: "_id",
          as: "categoryData"
        }
      },
      {
        $unwind: "$categoryData"
      },
      {
        $project: {
          _id: 1,
          animal_name: 1,
          birthdate: 1,
          location: 1,
          species: {
            _id: "$speciesData._id",
            species_name: "$speciesData.species_name",
            category: {
              _id: "$categoryData._id",
              category_name: "$categoryData.category_name"
            }
          }
        }
      }
    ]);
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
