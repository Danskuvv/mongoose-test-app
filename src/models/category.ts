import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  category_name: string;
}

const CategorySchema: Schema = new Schema({
  category_name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  }
});

export default mongoose.model<ICategory>('Category', CategorySchema);
