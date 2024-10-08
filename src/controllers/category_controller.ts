import { Request, Response } from 'express';
import Category from '../models/category';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({
      message: 'Category retrieved successfully',
      data: category,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: (err as Error).message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({
      message: 'Category created',
      data: category,
    });
  } catch (err) {
    res.status(400).json({ message: 'Bad Request', error: (err as Error).message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({
      message: 'Category updated successfully',
      data: category,
    });
  } catch (err) {
    res.status(400).json({ message: 'Bad Request', error: (err as Error).message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({
      message: 'Category deleted',
      data: category,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: (err as Error).message });
  }
};
