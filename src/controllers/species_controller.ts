import { Request, Response } from 'express';
import Species from '../models/species';

export const getAllSpecies = async (req: Request, res: Response) => {
  try {
    const species = await Species.find();
    res.json(species);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getSpeciesById = async (req: Request, res: Response) => {
  try {
    const species = await Species.findById(req.params.id);
    if (!species) return res.status(404).json({ message: 'Species not found' });
    res.json(species);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: (err as Error).message });
  }
};

export const createSpecies = async (req: Request, res: Response) => {
  try {
    const species = new Species(req.body);
    await species.save();
    res.status(201).json({
      message: 'Species created',
      data: species,
    });
  } catch (err) {
    res.status(400).json({ message: 'Bad Request', error: (err as Error).message });
  }
};

export const updateSpecies = async (req: Request, res: Response) => {
  try {
    const species = await Species.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!species) return res.status(404).json({ message: 'Species not found' });
    res.json({
      message: 'Species updated',
      data: species,
    });
  } catch (err) {
    res.status(400).json({ message: 'Bad Request', error: (err as Error).message });
  }
};

export const deleteSpecies = async (req: Request, res: Response) => {
  try {
    const species = await Species.findByIdAndDelete(req.params.id);
    if (!species) return res.status(404).json({ message: 'Species not found' });
    res.json({
      message: 'Species deleted',
      data: species,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: (err as Error).message });
  }
};

export const getSpeciesByArea = async (req: Request, res: Response) => {
  try {
    const species = await Species.findByArea(req.body.polygon);
    res.json(species);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: (err as Error).message });
  }
};
